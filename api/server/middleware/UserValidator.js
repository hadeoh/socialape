import db from '../src/models';
import Helper from './Helper';

class UserValidation {
  static async signUpCheck(req, res, next) {
    let {
      email, firstname, lastname, password, handle, confirmPassword
    } = req.body;

    const errors = UserValidation.inputCheck(email, firstname, lastname, handle,
      password, confirmPassword);
    if (errors.length > 0) return res.status(errors[0].statuscode).send(errors[0]);

    if (firstname) firstname = firstname.trim();
    if (lastname) lastname = lastname.trim();
    if (email) email = email.trim();
    if (handle) handle = handle.trim();
    if (password) password = password.trim();
    if (confirmPassword) confirmPassword = confirmPassword.trim();

    const passwordPattern = /\w{6,}/g;

    if (!passwordPattern.test(password)) {
      return res.status(406).json({
        status: 'error',
        statuscode: 406,
        error: 'Invalid password provided',
        message: 'Password must not be less than six(6) characters'
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({
        status: 'error',
        statuscode: 422,
        error: 'Invalid password provided',
        message: 'Passwords do not match'
      });
    }

    const isInvalid = Helper.validateEmail(email);
    if (isInvalid) return res.status(isInvalid.statuscode).send(isInvalid);

    const result = await db.User.findOne({
      where: { email: req.body.email }
    });

    if (result) {
      return res.status(409).send({
        status: 'error',
        statuscode: 409,
        error: 'Email already in use',
        message: 'Please provide another email address',
      });
    }

    const results = await db.User.findOne({
      where: { handle: req.body.handle }
    });

    if (results) {
      return res.status(409).send({
        status: 'error',
        statuscode: 409,
        error: 'Handle already in use',
        message: 'Please provide another handle',
      });
    }

    req.body.firstname = firstname;
    req.body.lastname = lastname;
    req.body.password = password;
    req.body.email = email;
    req.body.handle = handle;

    return next();
  }

  static loginCheck(req, res, next) {
    let { email, password } = req.body;

    if (email) email = email.trim();
    if (password) password = password.trim();

    const errors = [];

    let isEmpty;
    isEmpty = Helper.checkFieldEmpty(email, 'email');
    if (isEmpty) errors.push(isEmpty);

    isEmpty = Helper.checkFieldEmpty(password, 'password');
    if (isEmpty) errors.push(isEmpty);

    if (errors.length > 0) return res.status(errors[0].statuscode).send(errors[0]);

    req.body.email = email;
    req.body.password = password;
    return next();
  }

  static inputCheck(email, firstname, lastname, handle, password) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    isEmpty = Helper.checkFieldEmpty(firstname, 'firstname');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = Helper.checkFieldWhiteSpace(firstname, 'firstname');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    let isNotAlpha;
    isNotAlpha = Helper.checkFieldAlpha(firstname, 'firstname');
    if (isNotAlpha) errors.push(isNotAlpha);

    isEmpty = Helper.checkFieldEmpty(lastname, 'lastname');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = Helper.checkFieldWhiteSpace(lastname, 'lastname');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isNotAlpha = Helper.checkFieldAlpha(lastname, 'lastname');
    if (isNotAlpha) errors.push(isNotAlpha);

    isEmpty = Helper.checkFieldEmpty(handle, 'handle');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = Helper.checkFieldWhiteSpace(handle, 'handle');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = Helper.checkFieldEmpty(email, 'email');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = Helper.checkFieldWhiteSpace(email, 'email');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = Helper.checkFieldEmpty(password, 'password');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = Helper.checkFieldWhiteSpace(password, 'password');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    return errors;
  }

  static uploadImageCheck(req, res, next) {
    if (!req.files) {
      res.status(422).send({
        status: 'error',
        statuscode: 422,
        message: 'No image uploaded'
      });
    }

    const fileNames = Object.keys(req.files).map((key) => req.files[key].name);
    return fileNames.every((filename) => !!filename.match(/\.(jpg|jpeg|png|gif)$/))
      ? next() // let multer do the job
      : res.status(400).json({
        status: 'error',
        statuscode: 400,
        error: 'Wrong image formats'
      });
  }

  static userDetailsCheck(req, res, next) {
    let { bio, website, location } = req.body;

    if (bio) bio = bio.trim();
    if (website) website = website.trim();
    if (location) location = location.trim();

    const errors = [];

    let isEmpty;
    isEmpty = Helper.checkFieldEmpty(bio, 'bio');
    if (isEmpty) errors.push(isEmpty);

    isEmpty = Helper.checkFieldEmpty(website, 'website');
    if (isEmpty) errors.push(isEmpty);

    isEmpty = Helper.checkFieldEmpty(location, 'location');
    if (isEmpty) errors.push(isEmpty);

    if (errors.length > 0) return res.status(errors[0].statuscode).send(errors[0]);

    if (website.substring(0, 4) !== 'http') {
      website = `http://${website}`;
    } else req.body.website = website;

    req.body.bio = bio;
    req.body.website = website;
    req.body.location = location;
    return next();
  }
}

export default UserValidation;
