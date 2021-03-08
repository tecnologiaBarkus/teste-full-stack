Iniciei instalando Express e criando minha primeira rota. Decidi utilizar o TypeScript, então também fiz a parte de conversão de TypeScript para JavaScript para que o navegador pudesse interpretar.

Depois da primeira rota funcionando, fui ver a documentação da API, e como consumi-la com Node.JS. Inicialmente pensei que só com a rota “https://pokeapi.co/api/v2/pokemon/” iria conseguir desenvolver o proposto, então fiz a comunicação inicial com a API onde dava para buscar o Pokémon pelo nome ou id apenas para fim de teste.

Refatorei o código que inicialmente estava num arquivo só (ApiController), criando o Model Pokémon, que defino os campos que selecionarei do retorno da API, e o repository PokemonRepository responsável pela chamada da API, deixando o controller responsável apenas por obter o resultado e exibir em JSON.

O usuário teria que fornecer o tipo do Pokémon que ele gostaria de enviar, porém na rota que eu havia mapeado não seria possível pois só dava para buscar o Pokémon pelo id ou nome 
então mapeei a rota types “https://pokeapi.co/docs/v2#types” onde conseguiria buscar o tipo e me retornaria todos os Pokémons daquele tipo específico como precisava.

Criei um model, TypesPokemon, apenas com o campo que precisava array de Pokémons, repository, TypesPokemonRepository, responsável por fazer a chamada da API e controller, TypesPokemonController para receber o tipo fornecido pelo usuário e retornar o array de Pokémons. 

Com o retorno funcionando como esperado fiz a condição de retornar 5 Pokémons aleatórios dentre os retornados pela API, criei um array randomPokemons fora dos loops para armazenar os Pokémons e fiz um loop while se repetir enquanto o tamanho do randomPokemons fosse menor ou igual a 4 e dentro desse loop utilizei Math.floor e o Math.random para pegar um item aleatório do array retornado pela API e depois salvá-lo no nosso array randomPokemons. Nesse inicio ele estava salvando apenas o nome do Pokémon e retornou o resultado esperado.

Já com o array dos nomes dos Pokémons no TypesPokemonController  e com a busca de Pokémons no ApiController, unifiquei as funções em um controller só, apagando o ApiController.
E implementei dentro do loop antes de salvar o Pokémon no array randomPokemons seria feita uma requisição na API para pegar todas as informações necessárias para enviarmos por e-mail (types, sprites, name, weight, height e base experience) e assim já iria salvar as informações necessárias no array, mais uma vez obtive o resultado esperado.

Faltava então configurar o envio de e-mail, utilizei o Nodemailer com seu SMTP fake Ethereal que gera um link para você ver como o e-mail fica quando você enviar e o corpo do e-mail implementei com o Handlebars com base no modelo fornecido.

Criei o serviço de envio SendMailService com tudo que era necessário para preencher o corpo do e-mail e realizar, e além do tipo agora o TypesPokemonController precisava requisitar e e-mail de destino pelo body e com isso pronto iniciei os testes.

Inicialmente fiz o teste enviando apenas o tipo de Pokémon, depois fiz outro teste com todas as informações do personagem, e por fim fiz um loop direto no arquivo Layout.hbs para percorrer o array randomPokemons e preencher o e-mail com os 5 Pokémons. 

Após o envio estar funcionando mudei o atributo to da variável send no SendMailService para ela receber um array de strings, para assim enviar email para múltiplos e-mails, funcionou também.

Faltava então ter a opção de envio de e-mail agendado e para isso precisava receber data e horário que o e-mail deveria ser enviado, e armazenar essa informação e quando chegasse a data enviar esse e-mail. 

Decidi então utilizar o mongoDB para armazenar essa informação, criei um banco no mongoAtlas com as informações necessárias que precisa para enviar o e-mail depois inicialmente tipo Pokémon, e-mails de destino e data envio. 

No TypesPokemonController requisitei também receber no body a date como não obrigatório, verifiquei se era uma data valida e se fosse valida e maior data e hora atual salvava a informação no banco, caso não retornará data invalida. Se não houvesse a informação de data o e-mail é enviado de imediato.

Já salvando corretamente no banco, faltava de fato enviar o e-mail, então com o node-schedule configurei o mailJob para que verificasse no  banco  a cada um minuto se havia algum e-mail que não havia sido enviado, e também configurei o envio da mesma forma que havia feito no TypesPokemonController, funcionou porém ele enviada todos os e-mails anteriores aquele momento da verificação sempre, então adicionei no banco o campo send do tipo Boolean, para indicar se o e-mail já havia sido enviado ou não, iniciado como false, e após o envio mudando ele para true para não enviar novamente.

Como o mailJob e o TypesPokemonController utilizavam a mesma função de envio decidi criar o sendMailHelper com essa função, recebendo o tipo e e-mails como parâmetro e envia os e-mail, assim melhorando o código.

Para o envio de e-mail no modo de produção utilizei o SMTP gratuito Sendinblue, precisei criar o arquivo .env com as variáveis de ambiente necessárias para o envio de e-mail e também uma para dizer se o ambiente era de produção (para enviar com o Sendinblue) ou de desenvolvimento(gerando apenas um link de pré-visualização do Ethereal). Fiz essa verificação da variável de ambiente no SendMailService.

Percebi também que estava com um problema no fuso horário ao adicionar uma nota data estava considerando o horário do GMT+0, porém o nosso é o GMT-3 então alterei a criação da constante scheduleDate do TypesPokemonController para que concatenasse a data recebida + os GMT correto para que pudesse ficar de acordo com o horário brasileiro.
Com isso o envio de e-mail agendado estava funcionando também.

Depois fiz uma validação dos campos type e e-mails com Yup para ter certeza de que os campos estavam vindo preenchidos corretamente.

Os dados devem ser passados para API em formato JSON como exemplo apresentado abaixo: 
rota: post na raiz do projeto ___http://localhost:3000/___
```
{
	"type": "fire",
	"emails": ["analuizaramalho9@gmail.com","ana.santos141@outlook.com"],
	"date": "2021-03-02 12:50:00"
}
```

