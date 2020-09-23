# Warren Account

Primeiramente gostaria de agradecer pela oportunidade!

## Abordagens escolhidas
Escolhi processar tudo no momento do request por se tratar de operações dentro da mesma conta e pagamentos entre o mesmo "banco" e para diminuir a complexidade do desafio. Porém seria completamente viável (até recomendavel) fazer esse processamento usando algum serviço de mensageria, dessa forma melhorando a confiabilidade e deixando a escalabilidade mais granular.

## Endpoints

__Credenciais demo__

  * `email`: `demo@demo.com`
  * `password`: `123456`

__URL__
 `https://faevqnmzp7.execute-api.us-east-1.amazonaws.com/dev`

### POST /user/login
Autentica um Usuário. Retorna um token JWT.

Payload:
  * `email` - String, obrigatório
  * `password` - String, obrigatório

Atributos do Token JWT:
  * `userId`

### GET /account
Retorna as _accounts_ cadastradas na aplicação

__Requer autenticação__

### GET /account/info
Retorna as informações sobre a conta do usuário logado, durante o processo verifica se a conta deve receber a remuneração diária.

__Requer autenticação__

### POST /account/withdraw
Realiza uma retirada

Payload:
  * `value` - Number, obrigatório

__Requer autenticação__

### POST /account/deposit
Realiza um depósito

Payload:
  * `value` - Number, obrigatório

__Requer autenticação__

### POST /payment
Realiza um pagamento

Payload:
  * `description` - String, obrigatório
  * `destinationAccount` - String, obrigatório
  * `value` - Number, obrigatório

__Requer autenticação__

### GET /history
Retorna o histórico / extrato das transações feitas 

__Requer autenticação__

## Testes

Para rodar os testes, basta instalar as dependências usando `npm i` e rodar o `npm t` ou `npm run test` para executar os testes.

## Deploy

A API já se encontra publicada na `aws` na URL `https://faevqnmzp7.execute-api.us-east-1.amazonaws.com/dev` 

Porém, caso seja de interesse executar no próprio ambiente, siga os passos abaixo.

### Local
Para rodar a API em ambiente local, basta criar um arquivo `.env` seguindo o `.env.example` como exemplo, instalar as dependências com `npm i` e rodar `npm run serve`.

### Homologação / Produção
Para publicar a API na AWS, basta criar um arquivo `.env` seguindo o `.env.example` como exemplo, instalar as dependências com `npm i`, configurar um `aws profile` e setar o `profile` no `serverless.yml` e rodar um `npm run deploy`


## Observação
Como a aplicação estão rodando em _lambdas_, sem nenhuma camada de cache na frente, a primeira chamada pode apresentar uma latência elevada, por conta do _cold start_
