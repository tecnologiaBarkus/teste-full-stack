import random
import requests


class PokemonApi:
    NUMBER_OF_POKEMONS = 5

    def get_urls_by_type(self, type: str) -> [str]:
        response = requests.get(f'https://pokeapi.co/api/v2/type/{type}')
        response.raise_for_status()
        pokemons = response.json()['pokemon']
        pokemons = random.sample(pokemons, self.NUMBER_OF_POKEMONS)
        urls = [pokemon['pokemon']['url'] for pokemon in pokemons]

        return urls

    def get_pokemons_info(self, urls: [str]) -> [dict]:
        response = []

        for url in urls:
            pokemon_info = requests.get(url)
            pokemon_info.raise_for_status()
            pokemon_info = pokemon_info.json()

            response.append({
                'base_experience': pokemon_info['base_experience'],
                'height': pokemon_info['height'] / 10,
                'weight': pokemon_info['weight'] / 10,
                'name': pokemon_info['name'],
                'image': pokemon_info['sprites']['front_default']
            })

        return response
