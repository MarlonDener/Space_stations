# Space stations 🚀

<p>Desafio proposto pela <a href="https://voltbras.com.br/">Voltbras</a> :globe_with_meridians: para processo de seleção.</p>
---
<br>
<h2>Descrição 📌 <a name="description"></a></h2>

Descobrir em quais planetas a empresa Voltbras pode instalar seus novos postos de carregamento e otimizar a experiência de recarga para os viajantes espaciais.

---

## Tecnologias 💻 <a name="technologies"></a>
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [Graphql](https://graphql.org/)
* [Eslint](https://eslint.org/)

---

## Regras do projeto <a name="rules"></a>

 [ x ] Crie um servidor em Node.js usando Apollo GraphQL Server

 [ x ] Crie o schema GraphQL com uma query suitablePlanets, que retorna os dados dos planetas com gravidade alta

 [ x ] Crie uma mutation installStation, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)

 [ x ] Use um RESTDataSource para pegar os dados da NASA

 [ x ]Crie uma query stations, que irá listar todas as estações instaladas nos planetas
 
 [ x ] Crie uma mutation recharge, que dado uma estação e um datetime de quanto a recarga irá finalizar, realiza uma recarga, começando a partir do momento em que a mutation foi chamada e finalizando com a datetime passada.

 - Só é possível realizar uma recarga na estação por vez
 - Essa recarga deve estar atrelado a um usuário - sinta-se livre para implementar da maneira que você desejar.
 - Um usuário só pode ter no máximo uma recarga em andamento


<h2>🔌 Getting started</h2>

Faça o clone do projeto:

```bash
$ git clone https://github.com/MarlonDener/Space_stations.git
```

Acesse a pasta do projeto:

```bash
$ cd Space_stations
```

Instale as dependências:
```bash
$ npm install
```


>⚠️ Você precisa ter uma conta no MongoDB
 
Crie o arquivo ``.env`` na raiz do projeto e defina a variável de ambiente(MONGO_URL).
```env

MONGO_URL: mongodb+srv://<username>:<password>@cluster0.rijg6.mongodb.net/VoltbrasDB?retryWrites=true&w=majority
```

>⚠️ Essa configuração é fundamental para o funcionamento da aplicação.

Inicie o projeto:
```bash
# Inicie em modo de desenvolvimento
$ npm run dev
```

## Contatos :paperclip:

<a href="https://www.linkedin.com/in/marlondener/" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="mailto:marlondener01@gmail.com" target="_blank">
   <img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/>
 </a>
 
 <hr>


