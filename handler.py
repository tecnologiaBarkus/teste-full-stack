import os
import boto3
from dotenv import load_dotenv
from integrations.api import PokemonApi
from requests.exceptions import HTTPError
load_dotenv()


SOURCE = os.getenv('SOURCE_EMAIL')
SUBJECT = 'Informações sobre pokemons'


def validate_body(body):
    if 'pokemon_type' not in body:
        raise Exception('Missing pokemon_type parameter.')
    if 'destination' not in body:
        raise Exception('Missing destination parameter.')
    if (
        not isinstance(body['pokemon_type'], str) or
        not (
            isinstance(body['destination'], str) or
            isinstance(body['destination'], list)
        )
    ):
        raise Exception('Invalid JSON.')

    return body


def send_email(event, context):
    body = validate_body(event['body'])
    pokemon_type = body['pokemon_type']
    destination = body['destination']

    if isinstance(destination, str):
        destination = [destination]

    try:
        urls = PokemonApi().get_urls_by_type(pokemon_type)
        pokemons_info = PokemonApi().get_pokemons_info(urls)

        content = ''
        for info in pokemons_info:
            content += f'<img src="{info["image"]}"/>'
            content += f'<p>Nome do pokemon: {info["name"]}<p>'
            content += f'<p>Peso: {info["weight"]} kg<p>'
            content += f'<p>Altura: {info["height"]} m<p>'
            content += f'<p>Experiência base: {info["base_experience"]}<p>'

        TEMPLATE = f"""
            <html>
                <head></head>
                <body>
                    <p>Olá Treinador Pokemon,</p>
                    <p>Aqui estão as informações de 5 pokémons aleatórios do
                    tipo {pokemon_type} que podem ser interessantes para você
                    capturar durante a sua jornada.</p>
                    {content}
                    <p>Gotta Catch 'Em All!</p>
                    <p>See ya!</p>
                </body>
            </html>
        """

        client = boto3.client('ses')

        response = client.send_email(
            Destination={
                'ToAddresses': destination
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': TEMPLATE,
                    }
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': SUBJECT,
                },
            },
            Source=SOURCE,
        )

        return response
    except Exception as e:
        if isinstance(e, HTTPError):
            raise Exception('Resource not found.')
        raise Exception('Internal Error.')
