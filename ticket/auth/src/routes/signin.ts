import express,{Request,Response} from 'express';
import {body} from 'express-validator'
import { BadRequestError } from '@subhodevroytickets/common';
import { validateRequest } from '@subhodevroytickets/common';
import { User } from '../models/user';
import {Password} from '../services/password'
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/api/users/signin',[
  body('email')
  .trim()
  .notEmpty()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .notEmpty()
  .withMessage('You must apply a password')
], validateRequest,async(req:Request, res:Response) => {
  const {email,password} =req.body;
 const existingUser=await User.findOne({email});
if(!existingUser){
  throw new BadRequestError("Invalid credentials");
}
const passwordsMatch=await Password.compare(existingUser.password,password);
if(!passwordsMatch){
  throw new BadRequestError("Invalid credentials");
}
const userJwt = jwt.sign(
  {
    id: existingUser.id,
    email: existingUser.email
  },
  process.env.JWT_KEY!
);

// Store it on session object
req.session = {
  jwt: userJwt
};
//console.log(user);
//console.log(user.id);
res.status(201).send(existingUser);
});

export { router as signinRouter };
