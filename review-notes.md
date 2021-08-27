Opa Marlon, tudo certo? 

Sou o Gustavo, e atuo como desenvolvedor back-end aqui na Voltbras!

Ficamos muito felizes com o seu compromentimento em realizar o desafio, e vou fazer um code review do seu projeto, mostrando alguns pontos que eu achei legais e também algumas sugestões de melhoria, espero que você goste!


### Pontos gerais

- O README ficou muito bom, você mandou bem demais em colocar os gifs mostrando o projeto funcionando! Parabéns pelo compromentimento! :hugs:

- A estrutura do projeto ficou legal, gostei de como tu separou as responsabilidades especialmente dos services, cada arquivo ali tem apenas uma única responsabilidade, e isso facilita muito a manutenção do código. Isso também vale para as outras classes, curti bastante como você estruturou os models, resolvers, da pra se encontrar muito fácil no projeto, boa!

- Achei que poderia haver um pouco mais de padronização do código, em alguns lugares é utilizado camelCase, em outros foram utilizados PascalCase em nome de métodos ou variáveis, o ideal é adotar um padrão e seguir com isso sempre (um linter com prettier pode te ajudar com isso :D).

- O nome das classes, métodos e variáveis também ficaram um pouco confusos às vezes, uma coisa que pode te ajudar é ler um pouco sobre Clean Code

- Curti que teve bastante atenção aos detalhes nos services, foram feitas várias validações de regras de negócio em todos eles, boa!

- Como eu falei nos comentários, acho que ficaria melhor remover o `isActiveRecharge` do banco de dados e de fato sempre calcular esse campo quando precisar dele. Uma das principais desvantagens de ter esse booleano é que é muito mais difícil garantir a consistência dessa forma, mesmo executando um processo em background de tempos em tempos, não daria pra confiar nesse campo para fazer validações por exemplo.


---


Qualquer dúvida pode falar com a Vanessa pra gente marcar uma conversa, ou se quiser pode comentar aqui no Pull Request mesmo! :wink:
