import db from '../src/models';

class ScreamService {
  static async createScream(req, res) {
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

    req.body.userHandle = req.handle;
    req.body.likeCount = 0;
    req.body.commentCount = 0;
    req.body.userImage = gottenUser.image;

    const scream = await db.Scream.create(req.body);

    return {
      status: 'success',
      statuscode: 201,
      data: {
        scream,
        message: 'New scream created successfully'
      }
    };
  }

  static async getAllScreams(req, res) {
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
      attributes: { exclude: 'handle' }
    });
    if (foundScreams.length > 0) {
      return {
        status: 'success',
        statuscode: 200,
        data: {
          foundScreams,
          message: 'All screams retrieved successfully'
        }
      };
    }
    return {
      status: 'error',
      statuscode: 404,
      error: 'Not found',
      message: 'There are no screams at the moment'
    };
  }

  static async getScream(req, res) {
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
      where: { userHandle: req.handle }, attributes: { exclude: 'handle' }
    });

    if (!foundScreams) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'You do not have any scream at the moment'
      };
    }

    const foundScream = await db.Scream.findOne({
      where: { id: req.params.id }, attributes: { exclude: 'handle' }
    });

    if (foundScream) {
      return {
        status: 'success',
        statuscode: 200,
        data: {
          message: 'That particular scream was found',
          foundScream
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

  static async deleteScream(req, res) {
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
      where: { userHandle: req.handle }, attributes: { exclude: 'handle, image' }
    });

    if (!foundScreams) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'You do not have any scream at the moment'
      };
    }

    const foundScream = await db.Scream.findOne({
      where: { userHandle: req.handle, id: req.params.id }, attributes: { exclude: 'handle, image' }
    });

    if (foundScream) {
      await db.Scream.destroy({
        where: { userHandle: req.handle, id: req.params.id }, attributes: { exclude: 'handle, image' }
      });
      return {
        status: 'success',
        statuscode: 200,
        message: 'That particular scream was successfully deleted'
      };
    }
    return {
      status: 'error',
      statuscode: 404,
      error: 'Not found',
      message: "You don't have such a scream"
    };
  }

  static async likeScream(req, res) {
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
        message: 'There is no scream at the moment'
      };
    }

    const foundScream = await db.Scream.findOne({
      where: { id: req.params.screamId }, attributes: { exclude: 'handle, image' }
    });

    if (foundScream) {
      const likes = await db.Like.findOne({
        where: { userHandle: req.handle, screamId: req.params.screamId }, attributes: { exclude: 'handle, image' }
      });
      if (!likes) {
        req.body.screamId = req.params.screamId;
        req.body.userHandle = req.handle;
        await db.Like.create(req.body);
        await db.Scream.update(
          { likeCount: parseInt(foundScream.likeCount, 10) + 1 },
          { where: { id: req.params.screamId } }
        );
        const newFoundScream = await db.Scream.findOne({
          where: { id: req.params.screamId }, attributes: { exclude: 'handle, image' }
        });

        await db.Notification.create({
          recipient: foundScream.userHandle,
          sender: req.handle,
          read: false,
          screamId: req.params.screamId,
          type: 'like',
        });

        return {
          status: 'success',
          statuscode: 200,
          data: {
            newFoundScream,
            message: 'The scream was liked successfully'
          }
        };
      }
      return {
        status: 'error',
        statuscode: 400,
        message: 'Scream already liked'
      };
    }
    return {
      status: 'error',
      statuscode: 404,
      error: 'Not found',
      message: 'There is no such  scream'
    };
  }

  static async unLikeScream(req, res) {
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
        message: 'There is no scream at the moment'
      };
    }

    const foundScream = await db.Scream.findOne({
      where: { id: req.params.screamId }, attributes: { exclude: 'handle, image' }
    });

    if (foundScream) {
      const likes = await db.Like.findOne({
        where: { userHandle: req.handle, screamId: req.params.screamId }, attributes: { exclude: 'handle, image' }
      });
      if (!likes) {
        return {
          status: 'error',
          statuscode: 400,
          message: 'Scream not liked'
        };
      }
      await db.Like.destroy({
        where: { userHandle: req.handle, screamId: req.params.screamId }, attributes: { exclude: 'handle, image' }
      });
      await db.Scream.update(
        { likeCount: parseInt(foundScream.likeCount, 10) - 1 },
        { where: { id: req.params.screamId } }
      );
      const newFoundScream = await db.Scream.findOne({
        where: { id: req.params.screamId }, attributes: { exclude: 'handle, image' }
      });

      ScreamService.deleteNotification(req);

      return {
        status: 'success',
        statuscode: 200,
        data: {
          newFoundScream,
          message: 'The scream was unliked successfully'
        }
      };
    }
    return {
      status: 'error',
      statuscode: 404,
      error: 'Not found',
      message: 'There is no such  scream'
    };
  }


  static async deleteNotification(req) {
    await db.Notification.destroy({
      where: { sender: req.handle, screamId: req.params.screamId }, attributes: { exclude: 'handle, image' }
    });
  }
}

export default ScreamService;
