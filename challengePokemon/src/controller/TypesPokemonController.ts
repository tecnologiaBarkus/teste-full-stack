import { Request, Response } from 'express'
import {resolve} from 'path'
import { TypesPokemon } from '../model/TypesPokemon'
import { TypesPokemonRepository } from '../repository/TypesPokemonRepository'
import { PokemonRepository } from '../repository/PokemonRepository'
import { Pokemon } from '../model/Pokemon'
import SendMailService from '../services/SendMailService'
import { ScheduleRepository } from '../repository/ScheduleRepository'
import { Schedule } from "../model/Schedule";


class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type, emails, date } = req.body
        const randomPokemons=[]

        if(!isNaN(new Date(date).getTime())) {
            const scheduleDate = new Date(date)

            if(scheduleDate >= new Date()) {
                try {
                    const params: Schedule = {
                        type, 
                        emails,
                        date
                    }
                    const newSchedule =await ScheduleRepository.create(params)

                    return res.status(201).send({message: 'Scheduled email sending', data: newSchedule })
                } catch (error) {
                    res.status(500).send({message:"Internal Server Error"})
                }
            } else {
                res.status(400).send({message:"Date is not a valid "})
            }

        } else {
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
                        res.status(500).send({message:"Internal Server Error"})
                    }
                }        
    
            } catch (error) {
                res.status(500).send({message:"Internal Server Error"})
            }
    
            const path = resolve(__dirname,"..","..","src","views","emails","layout.hbs")
        
    
             await SendMailService.send(emails,type,{type,randomPokemons},path)
             return res.json(randomPokemons)
        }        
    }

}
export { TypesPokemonController }
