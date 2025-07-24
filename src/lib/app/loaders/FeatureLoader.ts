import express, { Express } from 'express';
import morgan from 'morgan';
import routes from '../routes/index.routes';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../docs/swagger-output.json';
import FileUpload from 'express-fileupload';
import FileUploadConfig from '../../core/config/uploaderConfig';
import BaseApplicationLoader from '../../core/base/BaseApplicationLoader';
import corsOptions from '../../core/config/corsConfig';
import { ApplicationMode } from '../../core/contants/SystemContants';
import swaggerConfig from '../../core/config/swaggerConfig';

export default class FeatureLoader extends BaseApplicationLoader {
  app: Express;
  constructor(app: Express) {
    super();
    this.app = app;
  }
  build(): void {
    this.app.use(helmet());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/static', express.static('public'));
    this.app.use(cors(corsOptions));
    this.app.use(FileUpload(FileUploadConfig) as any);
    if (process.env.NODE_ENV === ApplicationMode.dev) {
      this.app.use(morgan('dev'));
      this.app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(swaggerOptions, swaggerConfig) as any);
    }
    this.app.use(routes);
  }
}
