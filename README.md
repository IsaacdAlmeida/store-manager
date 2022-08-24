# Store Manager

## Introdução

O projeto consiste em criar uma API RESTful utilizando node.js para gerenciar um sistema de vendas onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

## Sumário

- [Introdução](#introdução)
- [Tecnologias utilizadas](#tecnologias-utilizada)
- [CRUD](#crud)
- [MSC](#msc)
- [Aprendizados](#Aprendizados)
- [Instruções para utilizar a aplicação](#instruções-para-utilizar-a-aplicação)
- [Histórico de Commits](#histórico-de-commits)

## Tecnologias utilizada

**Back End:** Docker, NodeJs, express, mySQL, arquitetura RESTful, mocha, chai e sinon.

## CRUD

CRUD é um acrônimo para Create, Read, Update and Delete. Em português Criar, Ler, Atualizar e Deletar registros, nesse projeto não trabalhamos direto com um banco de dados para fazer as operações, utilizamos um arquivo JSON com alguns dados para consolidar melhor os conhecimentos em Node.

## MSC

MSC é um acrônimo para Model, Services e Controller. Utilizei essas camadas na criação dessa aplicação, o uso dessas camadas facilita a manutenção e legibilidade no código, uma vez que cada camada é responsável por fazer apenas uma função, no nosso caso a camada Controller é responsável por retornar as requisições e respostas de nossa API, enquanto a camada Model faz as queries necessárias para o banco de dados. O Service é responsável por fazer a intermediação entre as duas camadas e lançar erros em caso de algum problema na requisição ou query.

## Aprendizados

Fui capaz de desenvolver uma API utilizando os conceitos de CRUD e MSC para cadastro e manipulação de dados de Produtos e Vebdas, onde é possível criar, atualizar, pesquisar e deletar informações diretamente no banco de dados. Utilizei camadas para dividir bem cada função da aplicação, dessa forma a manutenção e legibilidade do código fica mais fácil.

Além da aplicação, precisei desenvolver caso de testes utilizando a ferramenta mocha em conjunto com o chai e sinon. Assim, consegui desenvolver testes assíncronos para que a aplicação tivesse cobertura de 100% nos testes.

Também criei vários middlewares para validar produtos e vendas, bem como erros personalizados, que são lançados de acordo com a inserção de um dado errado ou uma requisição feita de forma errada. Assim é possível garantir uma padronização das informações de acordo com as regras de negócio proposta no projeto.

## Instruções para utilizar a aplicação

Para utilizar a aplicação você precisará ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado.

Após clonar o repositório, você precisará usar o comando `docker-compose up -d` para criar e iniciar o container e depois executar o terminal bash do container e instalar as dependências do projeto com o comando `npm install` . O comando deverá ser feito via terminal no diretório em que está o arquivo **docker-compose.yml**.
Após o container subir você poderá fazer as requisições utilizando um cliente HTTP (insomnia, postman, httpie e etc);

## Histórico de commits

Você pode verificar todo o histório de commits para saber como a aplicação foi desenvolvida passo a passo, todos eles foram feitos com base no guia de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), mantendo uma organização e descrição objetiva do que foi feito a cada mudança!
***
  <a href="https://www.linkedin.com/in/isaacalmeidafilho/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
