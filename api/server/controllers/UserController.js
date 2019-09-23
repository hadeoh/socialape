import UserService from '../services/UserService';

class UserController {
  static async signUpUser(req, res, next) {
    try {
      const response = await UserService.signUpUser(req.body);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async logInUser(req, res, next) {
    try {
      const response = await UserService.logInUser(req.body);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const response = await UserService.uploadImage(req, res);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async addUserDetails(req, res, next) {
    try {
      const response = await UserService.addUserDetails(req, res);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getAuthenticatedUser(req, res, next) {
    try {
      const response = await UserService.getAuthenticatedUser(req, res);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getUserDetails(req, res, next) {
    try {
      const response = await UserService.getUserDetails(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async markNotificationsRead(req, res, next) {
    try {
      const response = await UserService.markNotificationsRead(req, res);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;
