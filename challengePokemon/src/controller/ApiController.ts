import { Request, Response } from 'express'
import { PokemonRepository } from '../repository/PokemonRepository'
import { Pokemon } from '../model/Pokemon'


class ApiController{
    async start(req:Request,res:Response) {
        const{ name }=req.params

        try {            
            const api:Pokemon = await PokemonRepository.find(name)
            const pokemon : Pokemon = {
                id: api.id,
                types: api.types,
                sprites:api.sprites,
                name:api.name,
                weight:api.weight,
                height:api.height,
                base_experience:api.base_experience
            }

            return res.json(pokemon)

        } catch (error) {
            
        }
    }
}

export { ApiController }