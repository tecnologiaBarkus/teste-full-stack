import { Request, Response } from 'express'
import  axios  from "axios"


class ApiController{
    async start(req:Request,res:Response) {
        const pokemon = "pikachu"
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const ability1=api.data.abilities[0].ability.name
        const ability2=api.data.abilities[1].ability.name
        const wight = api.data.weight

        return res.send({ 
            pokemon,
            ability1,
            ability2,
            wight
        })
    
    }
}

export { ApiController }