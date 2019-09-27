/* eslint-disable camelcase */
import Helper from '../middleware/Helper';
import db from '../src/models';

class UserService {
  static async signUpUser(newUser) {
    const hashedpassword = Helper.hashPassword(newUser.password);
    newUser.password = hashedpassword;

    const user = await db.User.create(newUser);

    const { id, email, handle } = user;
    const payLoad = { id, email, handle }; // when loggin in a user
    const token = Helper.getToken(payLoad);
    return {
      status: 'success',
      statuscode: 201,
      data: {
        id,
        email,
        handle,
        token,
      },
      message: 'New user created successfully',
    };
  }

  static async logInUser(userCredentials) {
    const { email, password } = userCredentials;
    const foundUser = await db.User.findOne({
      where: { email }
    });

    if (!foundUser) {
      return {
        status: 'error',
        statuscode: 401,
        error: 'This email is not registered here'
      };
    }

    const hash = foundUser.password;
    if (Helper.comparePassword(password, hash) === true) {
      const {
        id, handle
      } = foundUser;
      const payLoad = {
        id,
        email,
        handle,
      };
      const token = Helper.getToken(payLoad);
      return {
        status: 'success',
        statuscode: 200,
        data: {
          userId: id,
          email,
          handle,
          token
        },
        message: 'User log in successful'
      };
    }
    return {
      status: 'error',
      statuscode: 401,
      error: 'Authentication failed, invalid login details'
    };
  }

  static async uploadImage(req, res) {
    const foundUser = await db.User.findOne({
      where: { handle: req.handle }
    });

    if (!foundUser) {
      return res.status(404).send({
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'Handle is not available on the platform',
      });
    }

    const filename = req.files.image.name;
    const fileObj = req.files.image;
    fileObj.mv(`${__dirname}/../upload/${filename}`, (err) => {
      if (err) {
        return res.status(500).send({
          statuscode: 500,
          status: 'error',
          error: err
        });
      }
    });
    await db.User.update(
      { image: filename },
      { where: { handle: req.handle } }
    );
    return {
      statuscode: 202,
      status: 'success',
      message: 'Image uploaded successfully'
    };
  }

  static async addUserDetails(req, res) {
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
    await db.User.update(
      { bio: req.body.bio, website: req.body.website, location: req.body.location },
      { where: { handle: req.handle } }
    );
    return {
      statuscode: 202,
      status: 'success',
      message: 'User details added'
    };
  }

  // Get own user's details
  // eslint-disable-next-line consistent-return
  static async getAuthenticatedUser(req, res) {
    const userCredentials = await db.User.findOne({
      where: { handle: req.handle }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    if (!userCredentials) {
      res.status(404).send({
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'Handle is not available on the platform',
      });
    } else {
      const likes = await db.Like.findAll({
        where: { userHandle: req.handle }, attributes: { exclude: 'handle' }
      });
      const notifications = await db.Notification.findAll({
        where: { recipient: req.handle }, attributes: { exclude: 'userHandle, handle' }
      });
      return {
        status: 'success',
        statuscode: 200,
        data: {
          userCredentials,
          likes,
          notifications
        },
        message: 'User credentials retrieved successfully'
      };
    }
  }

  static async getUserDetails(req, res) {
    const gottenUser = await db.User.findOne({
      where: { handle: req.params.handle }
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
      where: { userHandle: req.params.handle }, attributes: { exclude: 'handle' }
    });
    const userHandle = req.params.handle;

    return {
      status: 'success',
      statuscode: 200,
      data: {
        gottenUser,
        foundScreams
      },
      message: `${userHandle} details retrieved successfully`
    };
  }

  static async markNotificationsRead(req) {
    await db.Notification.update(
      { read: true },
      { where: { id: req.params.id, recipient: req.handle } }
    );
    return {
      statuscode: 202,
      status: 'success',
      message: 'Notification marked read'
    };
  }
}

export default UserService;
