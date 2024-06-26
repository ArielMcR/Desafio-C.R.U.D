# C.R.U.D Projeto de desenvolvimento para vaga de estágio.
Este projeto consiste em um sistema de gestão de vendas online. A interface do usuário é desenvolvida com React JS, proporcionando uma experiência interativa. Para a comunicação entre o front-end e o back-end, utilizamos Axios para requisições HTTP e Express JS para configurar o servidor. O back-end é robustamente construído com Node.js, garantindo escalabilidade e eficiência no processamento das operações de vendas.
## Índice

- [Observações](#observações)
- [Instalação](#instalação)
- [Uso](#uso)
- [Pastas](#Pasta)
- [Endpoints API](#Endpoints)
- [Contribuição](#contribuição)

## Observações
Para este projeto é estritamente necessário o uso do Node JS e MySql e xampp(ou outro serviço mysql), caso não possua nenhum dos dois basta acessar o link abaixo e realizar a instalação:

[Node Js](https://nodejs.org/en)
<br>
[MySql](https://dev.mysql.com/downloads/workbench/)
<br>
[Xampp](https://www.apachefriends.org/pt_br/index.html)
</br> 
Caso seu usuário do banco de dados tenha senha e um nome especifico é necessário por sua vez alterar o arquivo connection.js localizado dentro da pasta back-end

![image](https://github.com/ArielMcR/Desafio-C.R.U.D/assets/91798390/08b46e6a-15a7-41f3-b591-df0e27da0055)

trocando o User e password

Outro ponto a se notar é que tanto front-end como o back-end rodaram em portas distintas para isso é necessário que as portas 3000 e 3001 não estajam obstruidas!!!

## Instalação

Para começar a utilizar o projeto, siga estas etapas simples:

1. Clone este repositório em sua máquina local:

    ```bash
    git clone https://github.com/ArielMcR/Desafio-C.R.U.D
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd Desafio-C.R.U.D
    ```

## Bibliotecas Utilizadas

Neste projeto, foram utilizadas diversas bibliotecas para o melhor desenvolvimento:

### Front-end

- **Bootstrap**: "^5.3.3"
- **Date-fns**: "^3.5.0"
- **React Icons**: "^5.0.1"
- **React Input Mask**: "^3.0.0-alpha.2"
- **React Number Format**: "^5.3.4"
- **React Router DOM**: "^6.22.3"
- **React Toastify**: "^10.0.5"
- **Reactstrap**: "^9.2.2"

### Back-end

- **Cors**: "^2.8.5"
- **Express**: "^4.18.3"
- **MySQL**: "^2.18.1"
- **Nodemon**: "^3.1.0"

## Uso

Para usar o projeto, siga estas instruções:

1. Primeiramente deve-se entrar na pasta raiz do projeto, para isso dentro de um terminal seja ele(PowerShell, Prompt e etc) utilizaremos o comando
    ```
    cd cliente
    ````
    Instale as dependências:

    ```bash
    npm install
    ```
3. Estando dentro da pasta cliente, utilizaremos o comando, assim nossa aplicação front-end começara a rodar:
    ```
    npm start
    ````
4. Inciando um novo terminal, vamos iniciar nossos serviços de back-end, para isso entramos na pasta back-end:
    ```
    cd back-end
    ````
5. Dentro da pasta rodamos novamente o comando ```npm install``` e `npm start`
6. Com ambos funcionando você pode acesar [http://localhost:3000/](http://localhost:3000)
## Pastas
**Back-end**
* **controllers**: Esta pasta contém todos os controladores dos endpoints da API. Cada controlador é responsável por manipular as solicitações e respostas, executando a lógica de negócios necessária.
* **data**: A pasta data é onde está a conexão com a base de dados.
* **index.js**: É o arquivo principal que inicia o servidor e contém configurações globais, como middleware, rotas e outras configurações essenciais.
* **package-lock.json** e **package.json**: Estes arquivos contêm informações sobre o projeto e suas dependências. O package.json é usado para gerenciar as dependências, enquanto o package-lock.json bloqueia as versões das dependências instaladas para garantir a consistência entre os ambientes de desenvolvimento.

**Front-end**
- **src**: Esta é a pasta principal que contém todo o código fonte aplicativo React.
    - **components**: Esta pasta contém todos os componentes React. Cada componente é responsável por uma parte específica da interface do usuário do aplicativo.
        - **cadastros**: Esta pasta contém componentes relacionados ao cadastro de dos dados como Produto, Pessoa, Bairro, Cidade e Vendas.
        - **HomePage**: Esta pasta contém o componente da página inicial do aplicativo.
        - **listagem**: Esta pasta contém componentes que lidam com a listagem dos dados.
        - **relatorios**: Esta pasta contém componentes que lidam com a geração e exibição de relatórios de Pessoas e Vendas.
        - **update**: Esta pasta contém componentes que lidam com a atualização dos dados.
        - **Footer.js**: Este arquivo é o componente que representa o rodapé do aplicativo.
        - **Header.js**: Este arquivo é o componente que representa o cabeçalho do aplicativo.
        - **App.js**: Este é o componente raiz do aplicativo React.
    - **index.js**: Este é o ponto de entrada. É aqui que o componente raiz do seu aplicativo é renderizado no DOM.
    - **MainRoutes.js**: Este arquivo contém as rotas principais do  aplicativo, definindo qual componente deve ser renderizado com base na URL.

## Endpoints
Quando o servidor back-end for iniciado como explicado no tópico [uso](#uso), você terá acesso ao servidor express a qual está rodando o back-end, la url [http://localhost:3001/api-docs](http://localhost:3001/api-docs) você irá encontrar todos a documentação da API utilizada, explicando todos os endpoints.

`Representação gráfica`
![image](https://github.com/ArielMcR/Imagens/blob/main/docApi.png)



## Contribuição

Se você quiser contribuir com o projeto, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona uma nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.


