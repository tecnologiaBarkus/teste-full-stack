import { Request, Response } from 'express'
import { TypesPokemon } from '../model/TypesPokemon'
import { TypesPokemonRepository } from '../repository/TypesPokemonRepository'
import { PokemonRepository } from '../repository/PokemonRepository'
import { Pokemon } from '../model/Pokemon'



class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type } = req.body

        try {            
            const apiType:TypesPokemon = await TypesPokemonRepository.find(type)
            const pokemons:TypesPokemon={
                pokemon:apiType.pokemon
            }

            const pokemonsSorteados=[]
            const items = pokemons.pokemon

            while(pokemonsSorteados.length<=4){
                const item = items[Math.floor(Math.random() * items.length)]
                const api2:Pokemon = await PokemonRepository.find(item.pokemon.name)
                const pokemon : Pokemon = {
                id: api2.id,
                types: api2.types,
                sprites:api2.sprites,
                name:api2.name,
                weight:api2.weight,
                height:api2.height,
                base_experience:api2.base_experience
                }
                pokemonsSorteados.push(pokemon)
            }          

            return res.json(pokemonsSorteados)
        } catch (error) {
            
        }

    }

}
export { TypesPokemonController }