<h1 align="center">
    <img alt="Barkus" ttle="Barkus" width="200" src="https://barkus.com.br/site/wp-content/uploads/2018/12/Horizontal-branco-1-1024x308.png" />
    <p>Desafio - Desenvolvedor Júnior</p>
</h1>

## **Introdução**

Seu desafio será criar uma API responsável por enviar mensagens por email com base em algumas informações recebidas (mais detalhes na seção de [Descrição](#Descri%C3%A7%C3%A3o)). Essa aplicação deverá ser implementada usando necessariamente uma arquitetura serverless (sinta-se à vontade para utilizar a estratégia que preferir para isso, estando ela acoplada ou não a um provedor cloud específico). Será considerado um bônus caso você realize o deploy do que foi desenvolvido em um ambiente cloud (Google Cloud, Amazon AWS, Microsoft Azure, etc).

## **Descrição do Desafio**

Você trabalha na agência responsável por desenvolver o jogo do Pokémon. Sua responsabilidade é desenvolver uma API REST que enviará mensagens sobre pokémons por meio de um e-mail fornecido por você. Durante as etapas abaixo você precisará se comunicar com uma API REST externa que foi desenvolvida pela empresa para coletar dados relativos aos pokémons: https://pokeapi.co/docs/v2

**Requisitos**:

- [x] O usuário deverá fornecer obrigatoriamente um ou mais emails para serem utilizados como destinatários.
- [ ] O usuário deverá ser capaz de escolher entre dois tipos de envios:
  - [x] Envio imediato (comportamento padrão, caso não fornecido): a mensagem é enviada por meio de um **sistema de filas (queue)** naquele exato momento.
  - [ ] Envio agendado: o usuário fornecerá o dia e a hora que a mensagem deve ser enviada.
- [x] O usuário deverá escolher um tipo específico de pokémon (e.g: grass, electric, ground, etc.) que deseja utilizar para as mensagens. Essa informação, isto é, o tipo do pokémon, deverá ser utilizada para consumir a API externa (https://pokeapi.co/docs/v2) que fornecerá os dados necessários para popular o template da mensagem a ser enviada, conforme definido no final dessa seção. Como serão muitos pokémons retornados pela API externa, sorteie 5 pokémons aleatórios para utilizar.

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

## Dependências

- [Python3.8](https://www.python.org/downloads/release/python-380/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Serverless](https://www.serverless.com/)
- [AWS](https://aws.amazon.com/)

## Como fazer o deploy utilizando o framework Serverless

1. Instalar o serverless globalmente

    ```
    npm install -g serverless
    ```

2. Instalar a biblioteca serverless-python-requirements

    ```
    npm install --save serverless-python-requirements
    ```

3. Configurar variáveis de ambiente

    É necessário ter uma conta na [Amazon AWS](https://portal.aws.amazon.com/billing/signup#/start) para ter acesso as keys.

    ```
    export AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    export AWS_ACCESS_KEY_ID=your-aws-access-key-id
    ```

    Adicione um email remetente em um arquivo .env (use o arquivo .env.example como exemplo) que seja verificado pela AWS.

4. Realizar login na plataforma Serverless:

    É necessário criar uma conta na plataforma [Serverless](https://app.serverless.com/).

    ```
    sls login
    ```

5. Deploy

    ```
    sls deploy
    ```

    Os resultados devem ser parecidos com esse:

    ```
    Serverless: Stack update finished...
    Service Information
    service: aws-python-rest-api-barkus
    stage: dev
    region: us-east-2
    stack: aws-python-rest-api-barkus-dev
    resources: 12
    api keys:
      None
    endpoints:
      POST - https://40m5w6gp2a.execute-api.us-east-2.amazonaws.com/dev/pokemons
    functions:
      send_email: aws-python-rest-api-barkus-dev-send_email
    layers:
      None
    ```

## Solução

Para resolver o desafio, foi utilizado o framework serverless para fazer o deploy da aplicação na Amazon AWS e a biblioteca boto3 do python para o envio de emails. O acesso a api do pokemon está centralizado no arquivo integrations/api.py e, caso o tipo de pokemon não exista, a aplicação retorna uma mensagem de erro amigável.

O envio de email foi realizado por meio do SES (Simple Email Service), que é um serviço da Amazon para envio de mails de forma confiável e escalável. Porém, utilizando a camada free do serviço, só é possível enviar emails que sejam verificados pelo mesmo serviço. Isso significa que o email definido como remetente e os emails definidos como destinatário, devem ter sido verificados previamente pelo serviço.

Dentro do arquivo `serverless.yml` foi definido a função lambda que envia email, o método HTTP, o path e os tipos de respostas possíveis.

## API

**Enviar email - POST /pokemons**

Endpoint utilizado para enviar email para X destinatários com os 5 pokemons do tipo Y que ele escolheu.

**Formato JSON do body**

```json
{
  "pokemon_type": "Tipo de pokemon (grass, fire...)",
  "destination": "Email do destinatário (pode ser uma string ou lista)"
}
```

**Requisição**

```
curl -X POST \
  --url https://40m5w6gp2a.execute-api.us-east-2.amazonaws.com/dev/pokemons \
  --header 'content-type: application/json' \
  --data '{
    "pokemon_type": "grass",
    "destination": "thalissonlipe7@gmail.com"
  }
```

**Resposta em caso de sucesso**

- 200 - OK

**Respostas em caso de erros**

- 400 - Missing pokemon_type parameter.
- 400 - Missing destination parameter.
- 400 - Invalid JSON.
- 400 - Resource not found.
- 500 - Internal Error.

## Template do email - Exemplo

![Exemplo 1 Template](/docs/images/ex1.jpeg)
![Exemplo 2 Template](/docs/images/ex2.jpeg)

## TODO

- [ ] Utilizar o serviço SQS (Simple Queue Service) para enfileiramento de mensagens.
- [ ] Utilizar Step Functions para agendamento de funções lambda para o envio de email.