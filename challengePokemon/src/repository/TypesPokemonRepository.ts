import  axios  from "axios"

class TypesPokemonRepository{

    static async find (type:string){
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        return data
    }
}

export { TypesPokemonRepository }
