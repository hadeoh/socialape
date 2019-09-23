import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidation from '../middleware/UserValidator';
import Auth from '../middleware/Auth';

const {
  signUpCheck, loginCheck, uploadImageCheck, userDetailsCheck
} = UserValidation;
const {
  signUpUser, logInUser, uploadImage, addUserDetails,
  getAuthenticatedUser, getUserDetails, markNotificationsRead
} = UserController;
const { getUser } = Auth;

const userRouter = Router();

userRouter.post('/signup', signUpCheck, signUpUser);
userRouter.post('/login', loginCheck, logInUser);
userRouter.put('/user/image', getUser, uploadImageCheck, uploadImage);
userRouter.put('/user/details', getUser, userDetailsCheck, addUserDetails);
userRouter.get('/user/details', getUser, getAuthenticatedUser);
userRouter.get('/user/details/:handle', getUserDetails);
userRouter.put('/user/notifications/:id', getUser, markNotificationsRead);

export default userRouter;
