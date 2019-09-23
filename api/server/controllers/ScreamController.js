import ScreamService from '../services/ScreamService';

class ScreamController {
  static async createScream(req, res, next) {
    try {
      const response = await ScreamService.createScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getAllScreams(req, res, next) {
    try {
      const response = await ScreamService.getAllScreams(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getScream(req, res, next) {
    try {
      const response = await ScreamService.getScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteScream(req, res, next) {
    try {
      const response = await ScreamService.deleteScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async likeScream(req, res, next) {
    try {
      const response = await ScreamService.likeScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async unLikeScream(req, res, next) {
    try {
      const response = await ScreamService.unLikeScream(req);
      return res.status(response.statuscode).send(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default ScreamController;
