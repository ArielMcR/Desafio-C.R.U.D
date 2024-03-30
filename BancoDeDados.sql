CREATE DATABASE sistema_gestao2;
USE sistema_gestao2;

CREATE TABLE Bairro(
	id_Bairro INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_Bairro VARCHAR(15) NOT NULL

);

CREATE TABLE Cidade (
   `id_Cidade` int(11) NOT NULL AUTO_INCREMENT,
   `nome_Cidade` varchar(255) NOT NULL,
   `sigla_Uf` char(2) NOT NULL,
   PRIMARY KEY (`id_Cidade`)
   
 );
 
 CREATE TABLE `pessoa` (
   `id_Pessoa` int(11) NOT NULL AUTO_INCREMENT,
   `nome_Pessoa` varchar(255) NOT NULL,
   `cep` varchar(11) NOT NULL,
   `endereco` varchar(255) NOT NULL,
   `numero` int(11) NOT NULL,
   `complemento` varchar(25) NOT NULL,
   `telefone` varchar(16) NOT NULL,
   `email` varchar(255) NOT NULL,
   `cidade_id` int(11) NOT NULL,
   `bairro_id` int(11) NOT NULL,
   PRIMARY KEY (`id_Pessoa`),
   UNIQUE KEY `email` (`email`),
   FOREIGN KEY (cidade_id) REFERENCES Cidade(id_Cidade) ON DELETE CASCADE,
   FOREIGN KEY (bairro_id) REFERENCES Bairro(id_Bairro) ON DELETE CASCADE
 ) ;
 
 
 CREATE TABLE `produto` (
   `id_Produto` int(11) NOT NULL AUTO_INCREMENT,
   `nome_Produto` varchar(100) NOT NULL,
   `vr_Venda` decimal(10,2) DEFAULT NULL,
   PRIMARY KEY (`id_Produto`)
 );
 
 CREATE TABLE `venda` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `dt_Venda` date NOT NULL,
   `pessoa_id` int(11) NOT NULL,
   `vr_Total` decimal(10,2) NOT NULL,
   PRIMARY KEY (`id`),
    FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id_Pessoa`) ON DELETE CASCADE
 );
 
 CREATE TABLE `venda_itens` (
   `id_VendaItens` int(11) NOT NULL AUTO_INCREMENT,
   `venda_id` int(11) NOT NULL,
   `produto_Id` int(11) NOT NULL,
   `qtade` int(11) NOT NULL,
   `vr_Venda` decimal(10,2) NOT NULL,
   PRIMARY KEY (`id_VendaItens`),
   KEY `produto_Id` (`produto_Id`),
   KEY `venda_id` (`venda_id`),
   CONSTRAINT `venda_itens_ibfk_1` FOREIGN KEY (`produto_Id`) REFERENCES `produto` (`id_Produto`) ON DELETE CASCADE,
   CONSTRAINT `venda_itens_ibfk_2` FOREIGN KEY (`venda_id`) REFERENCES `venda` (`id`) ON DELETE CASCADE
 );
 
