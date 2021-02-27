import {Router} from 'express'
import { ApiController } from './controller/ApiController';
import { TypesPokemonController } from './controller/TypesPokemonController';

const router = Router();

const apiController = new ApiController();
const typesPokemonController = new TypesPokemonController()

router.get("/pokemon/:name",apiController.start)
router.get("/type",typesPokemonController.search)


export { router }