import Helper from './Helper';

class ScreamValidation {
  static async createScreamCheck(req, res, next) {
    let { body } = req.body;

    if (body) body = body.trim();

    const errors = [];

    const isEmpty = Helper.checkFieldEmpty(body, 'body');
    if (isEmpty) errors.push(isEmpty);


    if (errors.length > 0) return res.status(errors[0].statuscode).send(errors[0]);

    req.body.body = body;
    return next();
  }
}

export default ScreamValidation;
