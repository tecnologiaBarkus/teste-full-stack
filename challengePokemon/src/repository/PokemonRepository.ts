import  axios  from "axios"

class PokemonRepository {

    static async find(name:string){
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return data
    }
}

export { PokemonRepository }
