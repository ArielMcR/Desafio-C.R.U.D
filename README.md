# C.R.U.D Projeto de desenvolvimento para vaga de estágio.
Este projeto é um sistema de gestão de vendas na web. Usamos React JS para criar a interface do usuário. Axios e Express JS são usados para conectar o front-end e o back-end. E o back-end é construído com Node.js.
## Índice

- [Observações](#observações)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Observações
Para este projeto é estritamente necessário o uso do Node JS e MySql, caso não possua nenhum dos dois basta acessar o link abaixo e realizar a instalação:

[Node Js](https://nodejs.org/en)

[MySql](https://dev.mysql.com/downloads/workbench/)
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

3. Instale as dependências:

    ```bash
    npm install
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
2. Estando dentro da pasta cliente, utilizaremos o comando, assim nossa aplicação front-end começara a rodar:
    ```
    npm start
    ````
3. Inciando um novo terminal, vamos iniciar nossos serviços de back-end, para isso entramos na pasta back-end:
    ```
    cd back-end
    ````
4. Dentro da pasta rodamos novamente o comando `npm start`
5. Com ambos funcionando você pode acesar [htpp://localhost:3000/](htpp://localhost:3000/)

## Contribuição

Se você quiser contribuir com o projeto, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona uma nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.


