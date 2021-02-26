import {Router} from 'express'
import { ApiController } from './controller/ApiController';

const router = Router();

const apiController = new ApiController();

router.get("/pokemon",apiController.start)

export { router }