import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import userRoutes from './server/routes/UserRoutes';
import screamRoutes from './server/routes/ScreamRoutes';
import commentRoutes from './server/routes/CommentRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 // 2MB max file(s) size
  },
}));

const port = process.env.PORT || 4000;
// when a random route is inputed
app.get('/', (req, res) => res.status(200).send({
  statusCode: 200,
  message: 'Welcome to the social media API.'
}));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/screams', screamRoutes);
app.use('/api/v1/scream', commentRoutes);
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    status: 'error',
    statuscode: error.status || 500,
    error: error.name,
    message: error.message,
  });
  next();
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
