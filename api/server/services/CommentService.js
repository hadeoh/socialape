import db from '../src/models';

class CommentService {
  static async commentOnScream(req, res) {
    const gottenUser = await db.User.findOne({
      where: { handle: req.handle }
    });

    if (!gottenUser) {
      return res.status(404).send({
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'Handle is not available on the platform',
      });
    }

    const foundScreams = await db.Scream.findAll({
      attributes: { exclude: 'handle, image' }
    });

    if (!foundScreams) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'There are no screams at the moment'
      };
    }

    const foundScream = await db.Scream.findOne({
      where: { id: req.params.screamId }, attributes: { exclude: 'handle, image' }
    });
    if (foundScream) {
      req.body.userHandle = req.handle;
      req.body.screamId = req.params.screamId;
      req.body.userImage = gottenUser.image;
      const screamComment = await db.Comment.create(req.body);
      await db.Scream.update(
        { commentCount: parseInt(foundScream.commentCount, 10) + 1 },
        { where: { id: req.params.screamId } }
      );

      await db.Notification.create({
        recipient: foundScream.userHandle,
        sender: req.handle,
        read: false,
        screamId: req.params.screamId,
        type: 'comment',
      });
      return {
        status: 'success',
        statuscode: 201,
        data: {
          screamComment,
          message: 'Your comment has been uploaded successfully'
        }
      };
    }
    return {
      status: 'error',
      statuscode: 404,
      error: 'Not found',
      message: "You don't have such a scream"
    };
  }
}

export default CommentService;
