# Space stations 🚀

<p>Desafio proposto pela <a href="https://voltbras.com.br/">Voltbras</a> :globe_with_meridians: para processo de seleção.</p>

---
<h2>Descrição 📌 <a name="description"></a></h2>

Descobrir em quais planetas a empresa Voltbras poderá instalar seus novos postos de carregamento e otimizar a experiência de recarga para os viajantes espaciais.

---

## Tecnologias 💻 <a name="technologies"></a>
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [Graphql](https://graphql.org/)
* [Eslint](https://eslint.org/)
* [JWT](https://jwt.io/)

---

## Regras do projeto <a name="rules"></a>

 - [x] Crie um servidor em Node.js usando Apollo GraphQL Server

 - [x] Crie o schema GraphQL com uma query suitablePlanets, que retorna os dados dos planetas com gravidade alta

 - [x] Crie uma mutation installStation, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)

 - [x] Use um RESTDataSource para pegar os dados da NASA

 - [x] Crie uma query stations, que irá listar todas as estações instaladas nos planetas
 
 - [x] Crie uma mutation recharge, que dado uma estação e um datetime de quanto a recarga irá finalizar, realiza uma recarga, começando a partir do momento em que a mutation foi chamada e finalizando com a datetime passada

 - Só é possível realizar uma recarga na estação por vez
 - Essa recarga deve estar atrelado a um usuário - sinta-se livre para implementar da maneira que você desejar.
 - Um usuário só pode ter no máximo uma recarga em andamento

- [x] Adicione autenticação (apenas um usuário autenticado poderá fazer uma recarga ou uma reserva)

- [x]  Crie uma query stationHistory, onde será possível visualizar o histórico de recargas de uma estação (mostrar o horário, o tempo de duração da recarga e o usuário que realizou-a)

- [x]  Crie uma mutation reservation, que dado uma estação, um usuário e um intervalo de tempo, cria uma reserva da estação para o usuário naquele determinado intervalo de tempo.

---

<br>
<h2 style="align-center">Demonstração do projeto <a name="description"></a></h2>

---

## :zap: SuitablePlanets
<p>Essa query deve ser a primeira executada, ela pega os dados disponibilizado pela API da nasa e retorna os planetas com a gravidade alta.</p>

![installStations](https://user-images.githubusercontent.com/70349830/129973587-fd30ddb0-1856-481f-bceb-7f065a52daf6.gif)

<br>

## :zap: InstallStation

<p>Dado um planeta, essa Mutation instala uma estação de carregamento.</p>

 ![installStation](https://user-images.githubusercontent.com/70349830/129966588-237ffc5a-98a0-418c-aefe-b0f379c075c2.gif)
 
<br>

## :zap: Stations

<p>Uma query para listar todas as estações que existem, e seus determinados planetas.</p>

![stations](https://user-images.githubusercontent.com/70349830/129968836-2c094d58-7e19-46e9-aa82-3d11a945843a.gif)

<br>

## :zap: Authenticated & CreateUser

<p>Apenas um usuário autenticado poderá fazer uma recarga ou uma reserva</p>

![authenticate](https://user-images.githubusercontent.com/70349830/129972083-e0966c64-beca-4736-9e35-eadbbb1036ae.gif)

<br>

## :zap: Recharge

<p>Dado uma estação e um datetime de quanto a recarga irá finalizar, realiza uma recarga, começando a partir do momento em que a mutation foi chamada e finalizando com a datetime passada, lembrando que você precisa estar autenticado para realizar o cadastro.</p>

![recharge](https://user-images.githubusercontent.com/70349830/129969108-c66b4f81-049c-4f3d-8b46-1103f9c8645a.gif)

<br>

## :zap: StationHistory

<p>Com essa Query é possível visualizar o histórico de recargas de uma estação (mostrar o horário, o tempo de duração da recarga e o usuário que realizou-a).</p>

![stationHistory](https://user-images.githubusercontent.com/70349830/130297533-176c81ad-36d1-4e98-9300-3e3fc6a8b03f.gif)

<br>

## :zap: Reservation

<p>Dado uma estação, um usuário e um intervalo de tempo, cria uma reserva da estação para o usuário naquele determinado intervalo de tempo.</p>

![reservation](https://user-images.githubusercontent.com/70349830/130334632-f7ce80b5-55f9-405b-9c9a-4ef7f43bbea0.gif)

<br>

## :zap: UseReservedRecharge

<p>A utilização só pode ocorrer dentro do próprio intervalo de tempo da reserva.</p>
 <li>Perceba que no exemplo acima, eu agendo uma reserva das 17:40:00 até 19:00:00;</li>
 <li>Inicialmente tento fazer o uso da reserva antes do tempo agendado, e perceba que obtive um erro, lembrando que se eu tentar usar a reserva acima da data final agendada, eu receberia o mesmo erro;</li>
 <li>Depois ao tentar utilizar novamente a reserva, assim que já iniciada, a aplicação também gera um erro.</li>
<br />

![useReservedRecharge](https://user-images.githubusercontent.com/70349830/130334629-4ea14dce-fd5b-4799-a266-5826958f199c.gif)

<br>
...

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

<br>

Inicie o projeto:
```bash
# Inicie em modo de desenvolvimento
$ npm run dev
```
<br>
--- 

 ## 🦸 Autor

<a href="https://www.linkedin.com/in/marlondener">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/70349830?v=4" width="100px;" alt=""/>
 <br />
  <sub>Marlon Dener</sub>
 <br />
</a>
<br>
<a href="https://www.linkedin.com/in/marlondener/" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="mailto:marlondener01@gmail.com" target="_blank">
   <img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/>
 </a>
<br />

---

Feito com ❤️ por Marlon Dener

