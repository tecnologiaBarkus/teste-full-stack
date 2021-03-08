import {Router} from 'express'
import { TypesPokemonController } from './controller/TypesPokemonController';

const router = Router();

const typesPokemonController = new TypesPokemonController()

router.post("/",typesPokemonController.search)


export { router }