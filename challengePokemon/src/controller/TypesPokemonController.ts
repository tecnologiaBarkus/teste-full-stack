import { Request, Response } from 'express'
import { TypesPokemon } from '../model/TypesPokemon'
import { TypesPokemonRepository } from '../repository/TypesPokemonRepository'
import { PokemonRepository } from '../repository/PokemonRepository'
import { Pokemon } from '../model/Pokemon'
import SendMailService from '../services/SendMailService'


class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type, emails } = req.body
        const randomPokemons=[]
        try {            
            const apiType:TypesPokemon = await TypesPokemonRepository.find(type)
            const pokemons:TypesPokemon = {
                pokemon:apiType.pokemon
            }

            
            const items = pokemons.pokemon

            while(randomPokemons.length<=4){
                const item = items[ Math.floor ( Math.random() * items.length ) ]
                try {
                    const apiPokemons:Pokemon = await PokemonRepository.find( item.pokemon.name )
                    const pokemon : Pokemon = {
                        id: apiPokemons.id,
                        types: apiPokemons.types,
                        sprites:apiPokemons.sprites,
                        name:apiPokemons.name,
                        weight:apiPokemons.weight,
                        height:apiPokemons.height,
                        base_experience:apiPokemons.base_experience
                    }

                    randomPokemons.push(pokemon)
                } catch (error) {
                    res.status(500).send({message:"Internal Server Error"})
                }
            }        

            //return res.json(randomPokemons)

        } catch (error) {
            res.status(500).send({message:"Internal Server Error"})
        }

         await SendMailService.send(emails,type,type)
         return res.json(type)
    }

}
export { TypesPokemonController }
