import { Request, Response } from 'express'
import { TypesPokemon } from '../model/TypesPokemon'
import { TypesPokemonRepository } from '../repository/TypesPokemonRepository'



class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type } = req.body

        try {            
            const api:TypesPokemon = await TypesPokemonRepository.find(type)
            const pokemons:TypesPokemon={
                id: api.id,
                pokemon:api.pokemon
            }
            return res.json(pokemons)
        } catch (error) {
            
        }

    }

}
export { TypesPokemonController }