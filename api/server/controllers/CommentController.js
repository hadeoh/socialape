import CommentService from '../services/CommentService';

class CommentController {
  static async commentOnScream(req, res, next) {
    try {
      const response = await CommentService.commentOnScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default CommentController;
