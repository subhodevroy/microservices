const express=require('express')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const axios=require('axios')
const app=express()
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId={}
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id]||[]);
    })
app.post('/posts/:id/comments',async(req,res)=>{
       const commentID=randomBytes(4).toString('hex');
       const {content}=req.body;
       const comments=commentsByPostId[req.params.id]||[];
       comments.push({id:commentID,content:content,status:'pending'});
       commentsByPostId[req.params.id]=comments;
       await axios.post('http://event-bus-srv:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentID,
            content:content,
            status:'pending',
            postId:req.params.id
        }
       })
       res.status(201).send(comments);
})
app.post('/events',async(req,res)=>{
    console.log('Received Event',req.body.type)
    const{type,data}=req.body;
    if(type==='CommentModerated'){
        const {postId,id,status,content}=data;
        const comments=commentsByPostId[postId];
        const comment=comments.find(comment=>{
            return comment.id===id;
        })
        comment.status=status;
        await axios.post('http://event-bus-srv:4005/events',{
        type:'CommentUpdated',
        data:{
            id:id,
            content:content,
            status:status,
            postId:postId
        }
       })
    }
    res.send([])
}
)
app.listen(4001,()=>{
    console.log("Listening 4001--Comments");
})