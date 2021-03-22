## Desafio 5: Persistindo dados no Foodfy

“Todo programador é um autor.”

##🚀 Sobre o desafio

Nesse desafio você irá criar um banco de dados para o Foodfy.

A partir desse desafio, os dados que antes você vinha salvando em um arquivo JSON agora serão armazenados em um banco de dados PostgreSQL.

Você irá criar novas páginas de cadastro, listagem e edição de chefs, pois uma receita será atribuída a um chef.

Você irá criar um busca de receitas, onde você poderá filtrar receitas pelo seu nome.

## Por fim, você irá adicionar a funcionalidade de paginação na listagem de receitas.

## 🗄️ Banco de dados

[x] - Usando os conhecimentos adquiridos até aqui, você irá criar um banco de dados pelo Postgres, utilize o nome foodfy.

[x] - Você irá criar uma tabela de receitas, chame-a de recipes e uma tabela de cozinheiros, nomeie-a como chefs.

[x] - A tabela recipes deverá conter os seguintes campos:

* - id integer primary unique (o postbird cria esse campo por padrão)
* - chef_id integer (esse campo armazenará o ID do chef que criou essa receita)
* - image text
* - title text
* - ingredients text[]
* - preparation text[]
* - information text
* - created_at datetime (armazena a data de criação da receita no banco de dados)
* - Obs.: Você consegue armazenar vetores (arrays) no Postgres utilizando o [] no fim do campo.

[x] - A tabela chefs deverá conter os seguinte campos:

* - id integer primary unique (o postbird cria esse campo por padrão)
* - name text
* - avatar_url text
* - created_at datetime (armazena a data de criação do chef no banco de dados)


## 🍴 [Admin] Cadastro de chefs

[x] - Você irá colocar novas páginas administrativas que serão capazes de fazer as operação de cadastro, listagem, atualização e remoção de chefs.

[x] - Download dos arquivos: https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

[x] - Acesse o arquivo layouts/admin/index.html para ver todas especificações do layout do site.

[x] - Importante: Ao deletar o chef, se o mesmo possuir pelo menos uma receita, retorne um erro informando que chefs que possuem receitas não podem ser deletados.

## 🕵️ [Site] Busca de receitas

[x] - Para facilitar a busca de uma receita cadastrada, a pessoa que acessar o site poderá filtrar por nome da receita.

[x] -Você criará também uma página de resultado da busca que listará as receitas de acordo com a busca do usuário.

[x] - Download dos arquivos: https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

[x] - Acesse o arquivo layouts/site/index.html para ver todas especificações do layout do site.


## 👩‍🍳 [Site] Listagem de chefs

[x] - Fazer uma página com nome "Chefs" no site onde irá mostrar os chefs do Foodfy.

[x] - Fazer uma contagem de todas a receitas daquele chef, e apresentar nessa página.

[x] - Download dos arquivos: https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/archive/master.zip

[x] - Acesse o arquivo layouts/site/index.html para ver todas especificações do layout do site.


##📆 Entrega

Esse desafio não precisa ser entregue e não receberá correção. Após concluí-lo, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

##📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.