import {Router} from 'express'
import { TypesPokemonController } from './controller/TypesPokemonController';

const router = Router();

const typesPokemonController = new TypesPokemonController()

router.get("/",typesPokemonController.search)


export { router }