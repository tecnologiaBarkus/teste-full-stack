<h1 align="center">
    <img alt="Barkus" ttle="Barkus" width="200" src="https://barkus.com.br/site/wp-content/uploads/2018/12/Horizontal-branco-1-1024x308.png" />
    <p>Desafio - Desenvolvedor Júnior</p>
</h1>

## Index

- [**Introdução**](#Introdu%C3%A7%C3%A3o)
- [**Descrição**](#Descri%C3%A7%C3%A3o)
- [**Apresentação**](#Apresenta%C3%A7%C3%A3o)
- [**Avaliação**](#Avalia%C3%A7%C3%A3o)
- [**Envio**](#Envio)
- [**Observações Finais e Prazo**](#Observa%C3%A7%C3%B5es-Finais-e-Prazo)

## **Introdução**

Seu desafio será criar uma API responsável por enviar mensagens por email com base em algumas informações recebidas (mais detalhes na seção de [Descrição](#Descri%C3%A7%C3%A3o)). Essa aplicação deverá ser implementada usando necessariamente uma arquitetura serverless (sinta-se à vontade para utilizar a estratégia que preferir para isso, estando ela acoplada ou não a um provedor cloud específico). Será considerado um bônus caso você realize o deploy do que foi desenvolvido em um ambiente cloud (Google Cloud, Amazon AWS, Microsoft Azure, etc).

## **Descrição**

Você trabalha na agência responsável por desenvolver o jogo do Pokémon. Sua responsabilidade é desenvolver uma API REST que enviará mensagens sobre pokémons por meio de um e-mail fornecido por você. Durante as etapas abaixo você precisará se comunicar com uma API REST externa que foi desenvolvida pela empresa para coletar dados relativos aos pokémons: https://pokeapi.co/docs/v2

**Requisitos**:

- O usuário deverá fornecer obrigatoriamente um ou mais emails para serem utilizados como destinatários.
- O usuário deverá ser capaz de escolher entre dois tipos de envios:
  - Envio imediato (comportamento padrão, caso não fornecido): a mensagem é enviada por meio de um **sistema de filas (queue)** naquele exato momento.
  - Envio agendado: o usuário fornecerá o dia e a hora que a mensagem deve ser enviada.
- O usuário deverá escolher um tipo específico de pokémon (e.g: grass, electric, ground, etc.) que deseja utilizar para as mensagens. Essa informação, isto é, o tipo do pokémon, deverá ser utilizada para consumir a API externa (https://pokeapi.co/docs/v2) que fornecerá os dados necessários para popular o template da mensagem a ser enviada, conforme definido no final dessa seção. Como serão muitos pokémons retornados pela API externa, sorteie 5 pokémons aleatórios para utilizar.

**Template:**

```
Olá Treinador Pokémon,

Aqui estão as informações de 5 pokémons aleatórios do tipo **inserir tipo aqui** que podem ser interessantes para você capturar durante a sua jornada.

**Inserir foto do pokémon aqui**

Nome do Pokémon: **inserir nome aqui**

Peso: **inserir peso aqui**

Altura: **inserir altura aqui**

Experiência base: **inserir experiência base aqui**

Gotta Catch 'Em All!

See ya!
```

## **Apresentação**

É obrigatório que além do código desenvolvido, exista uma documentação detalhando como você chegou na solução apresentada. Além disso, é fundamental expor um passo a passo de como executar a aplicação desenvolvida, caso não tenha realizado a tarefa bônus de fazer o deploy em uma plataforma cloud.

## **Avaliação**

A avaliação será centrada na sua capacidade de organização, arquitetura de software e utilização de boas práticas como design patterns.

## **Envio**

Você deverá fazer um fork desse repositório e enviar um pull request com a sua solução.

## **Observações Finais e Prazo**

O desafio deverá ser entregue em até 5 dias após o recebimento.
