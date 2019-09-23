import { Router } from 'express';
import ScreamController from '../controllers/ScreamController';
import ScreamValidation from '../middleware/ScreamValidator';
import Auth from '../middleware/Auth';

const { createScreamCheck } = ScreamValidation;
const {
  createScream, getAllScreams, getScream, deleteScream, likeScream, unLikeScream
} = ScreamController;
const { getUser } = Auth;

const screamRouter = Router();

screamRouter.post('/', getUser, createScreamCheck, createScream);
screamRouter.get('/', getUser, getAllScreams);
screamRouter.get('/:id', getUser, getScream);
screamRouter.delete('/:id', getUser, deleteScream);
screamRouter.get('/:screamId/like', getUser, likeScream);
screamRouter.get('/:screamId/unlike', getUser, unLikeScream);

export default screamRouter;
