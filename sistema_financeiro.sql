-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/12/2025 às 00:49
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_financeiro`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `bases_fisicas`
--

CREATE TABLE `bases_fisicas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bases_fisicas`
--

INSERT INTO `bases_fisicas` (`id`, `nome`, `endereco`, `cidade`, `estado`) VALUES
(2, 'Matriz Porto Alegre', 'Av. Central, 1000', 'Porto Alegre', 'RS'),
(3, 'Filial São Paulo', 'Rua Augusta, 500', 'São Paulo', 'SP'),
(4, 'Importador Rio', 'Av. Atlântica, 200', 'Rio de Janeiro', 'RJ'),
(5, 'thaimara', 'rua santa isabel', 'viamao', 'rs');

-- --------------------------------------------------------

--
-- Estrutura para tabela `credores`
--

CREATE TABLE `credores` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `CNPJ` varchar(18) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `credores`
--

INSERT INTO `credores` (`id`, `nome`, `CNPJ`, `email`, `telefone`) VALUES
(2, 'Fornecedor A', '12345678000199', 'fornecedorA@email.com', '51999999999'),
(3, 'Fornecedor B', '98765432000188', 'fornecedorB@email.com', '11988888888'),
(4, 'Fornecedor C', '15647879525566', 'fornecedorC@email.com', '219963002525'),
(7, 'milho', '29392029292', 'admin@admin.com', '51 985202595');

-- --------------------------------------------------------

--
-- Estrutura para tabela `lancamentos`
--

CREATE TABLE `lancamentos` (
  `id` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `tipo_despesa_id` int(11) NOT NULL,
  `credor_id` int(11) NOT NULL,
  `base_fisica_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mesCompetencia` char(7) NOT NULL,
  `dataVencimento` date NOT NULL,
  `valorLiquido` decimal(10,2) DEFAULT 0.00,
  `valorMulta` decimal(10,2) DEFAULT 0.00,
  `valorJuros` decimal(10,2) DEFAULT 0.00,
  `valorCorrecao` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `lancamentos`
--

INSERT INTO `lancamentos` (`id`, `data`, `valor`, `tipo_despesa_id`, `credor_id`, `base_fisica_id`, `usuario_id`, `mesCompetencia`, `dataVencimento`, `valorLiquido`, `valorMulta`, `valorJuros`, `valorCorrecao`) VALUES
(11, '2025-02-05 09:30:00', 2500.00, 2, 3, 3, 2, '2025-02', '2025-02-15', 2500.00, 0.00, 0.00, 0.00),
(12, '2025-03-01 14:00:00', 800.00, 3, 4, 4, 3, '2025-03', '2025-03-10', 820.00, 0.00, 20.00, 0.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `migracao_registros`
--

CREATE TABLE `migracao_registros` (
  `id` int(11) NOT NULL,
  `arquivo_origem` varchar(200) DEFAULT NULL,
  `data_migracao` datetime NOT NULL,
  `registros_importados` int(11) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfil_permissoes`
--

CREATE TABLE `perfil_permissoes` (
  `perfil_id` int(11) NOT NULL,
  `permissao_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perfil_permissoes`
--

INSERT INTO `perfil_permissoes` (`perfil_id`, `permissao_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(3, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfis_acesso`
--

CREATE TABLE `perfis_acesso` (
  `id` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perfis_acesso`
--

INSERT INTO `perfis_acesso` (`id`, `nome`, `descricao`) VALUES
(1, 'admin', 'Acesso total ao sistema'),
(2, 'financeiro', 'Gerencia lançamentos e relatórios'),
(3, 'usuario', 'Acesso básico para consulta');

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissoes`
--

CREATE TABLE `permissoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `chave` varchar(80) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `permissoes`
--

INSERT INTO `permissoes` (`id`, `nome`, `chave`, `descricao`) VALUES
(1, 'Visualizar Lançamentos', 'VIEW_LANCAMENTOS', 'Permite visualizar lançamentos'),
(2, 'Criar Lançamentos', 'CREATE_LANCAMENTOS', 'Permite criar novos lançamentos'),
(3, 'Gerar Relatórios', 'GERAR_RELATORIOS', 'Permite gerar relatórios financeiros'),
(4, 'Gerenciar Usuários', 'GERENCIAR_USUARIOS', 'Permite criar e editar usuários');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_despesas`
--

CREATE TABLE `tipos_despesas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tipos_despesas`
--

INSERT INTO `tipos_despesas` (`id`, `nome`, `descricao`, `categoria`) VALUES
(1, 'Energia Elétrica', 'Conta de luz mensal', 'Operacional'),
(2, 'Aluguel', 'Pagamento de aluguel da sede', 'Administrativo'),
(3, 'Internet', 'Serviço de internet corporativa', 'Operacional'),
(4, 'Material Escritório', 'Itens de papelaria e escritório', 'Operacional');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `email` varchar(120) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `perfil_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha_hash`, `ativo`, `perfil_id`) VALUES
(1, 'Victor Silva', 'victor@email.com', 'hash123', 1, 1),
(2, 'Maria Souza', 'maria@email.com', 'hash456', 1, 2),
(3, 'João Pereira', 'joao@email.com', 'hash789', 1, 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bases_fisicas`
--
ALTER TABLE `bases_fisicas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `credores`
--
ALTER TABLE `credores`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `lancamentos`
--
ALTER TABLE `lancamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_despesa_id` (`tipo_despesa_id`),
  ADD KEY `credor_id` (`credor_id`),
  ADD KEY `base_fisica_id` (`base_fisica_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `migracao_registros`
--
ALTER TABLE `migracao_registros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `perfil_permissoes`
--
ALTER TABLE `perfil_permissoes`
  ADD PRIMARY KEY (`perfil_id`,`permissao_id`),
  ADD KEY `permissao_id` (`permissao_id`);

--
-- Índices de tabela `perfis_acesso`
--
ALTER TABLE `perfis_acesso`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `permissoes`
--
ALTER TABLE `permissoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tipos_despesas`
--
ALTER TABLE `tipos_despesas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `perfil_id` (`perfil_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bases_fisicas`
--
ALTER TABLE `bases_fisicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `credores`
--
ALTER TABLE `credores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `lancamentos`
--
ALTER TABLE `lancamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `migracao_registros`
--
ALTER TABLE `migracao_registros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `perfis_acesso`
--
ALTER TABLE `perfis_acesso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `permissoes`
--
ALTER TABLE `permissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tipos_despesas`
--
ALTER TABLE `tipos_despesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `lancamentos`
--
ALTER TABLE `lancamentos`
  ADD CONSTRAINT `lancamentos_ibfk_1` FOREIGN KEY (`tipo_despesa_id`) REFERENCES `tipos_despesas` (`id`),
  ADD CONSTRAINT `lancamentos_ibfk_2` FOREIGN KEY (`credor_id`) REFERENCES `credores` (`id`),
  ADD CONSTRAINT `lancamentos_ibfk_3` FOREIGN KEY (`base_fisica_id`) REFERENCES `bases_fisicas` (`id`),
  ADD CONSTRAINT `lancamentos_ibfk_4` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `migracao_registros`
--
ALTER TABLE `migracao_registros`
  ADD CONSTRAINT `migracao_registros_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `perfil_permissoes`
--
ALTER TABLE `perfil_permissoes`
  ADD CONSTRAINT `perfil_permissoes_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfis_acesso` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `perfil_permissoes_ibfk_2` FOREIGN KEY (`permissao_id`) REFERENCES `permissoes` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfis_acesso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
