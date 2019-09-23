import { Router } from 'express';
import CommentController from '../controllers/CommentController';
import CommentValidation from '../middleware/CommentValidator';
import Auth from '../middleware/Auth';

const { commentOnScreamCheck } = CommentValidation;
const { commentOnScream } = CommentController;
const { getUser } = Auth;

const commentRouter = Router();

commentRouter.post('/:screamId/comment', getUser, commentOnScreamCheck, commentOnScream);

export default commentRouter;
