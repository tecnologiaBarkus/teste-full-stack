export interface Pokemon{
    id: number,
    types?:[{type:{name:string}}]
    sprites?:{front_default:string},
    photo?:string,
    name:string,
    weight:number,
    height:number,
    base_experience:number
}