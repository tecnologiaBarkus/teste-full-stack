import {resolve} from 'path'
import { Pokemon } from "../model/Pokemon"
import { TypesPokemon } from "../model/TypesPokemon"
import { PokemonRepository } from "../repository/PokemonRepository"
import { TypesPokemonRepository } from "../repository/TypesPokemonRepository"
import SendMailService from '../services/SendMailService'

export const sendMailHelper = async (type: string, emails: string[]) => {
    const randomPokemons = []

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
                    photo:apiPokemons.sprites.front_default,
                    name:apiPokemons.name,
                    weight:apiPokemons.weight,
                    height:apiPokemons.height,
                    base_experience:apiPokemons.base_experience
                }

                randomPokemons.push(pokemon)
            } catch (error) {
                console.log('cron error', error)
            }
        }        

    } catch (error) {
        console.log('cron error', error)
    }

    const path = resolve(__dirname,"..","..","src","views","emails","layout.hbs")

    const params = {
        type, 
        randomPokemons
    }
    await SendMailService.send(emails,type,params,path)
}