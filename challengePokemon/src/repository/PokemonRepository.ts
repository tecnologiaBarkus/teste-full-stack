import  axios  from "axios"

class PokemonRepository {

    static async find(id:number){
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return data
    }
}

export { PokemonRepository }