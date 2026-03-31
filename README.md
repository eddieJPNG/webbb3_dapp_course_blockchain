# Webbb3 - DApp de Votação Blockchain

Um sistema descentralizado de votação inspirado no Big Brother Brasil, desenvolvido como projeto educacional para aprender os fundamentos da Web3 e tecnologia Blockchain.

<img src="https://media.licdn.com/dms/image/v2/D4E22AQG-2fQ5KCwqSQ/feedshare-shrink_2048_1536/B4EZw4sg2DJAAk-/0/1770477719174?e=1776297600&v=beta&t=OEPgYiRNGEkqHiFH8uUQuKHtzoyss8WfXWt5K9fNIlo" >

## 📋 Descrição

O **Webbb3** é uma Aplicação Descentralizada (DApp) que implementa um sistema de votação na Blockchain, permitindo que usuários conectem suas carteiras digitais (MetaMask) e votem em opções armazenadas em um Smart Contract na rede Binance Smart Chain (Testnet). O projeto demonstra a integração completa entre Frontend (React/TypeScript) e Blockchain (Solidity), exemplificando um cenário real de votação do Big Brother Brasil.

## ✨ Características

- 🔐 **Autenticação com MetaMask** - Conexão segura via carteira digital
- 🗳️ **Sistema de Votação em Tempo Real** - Interface responsiva para casting de votos
- ⏱️ **Votações com Prazo** - Suporte a votações com data/hora de término
- 📊 **Contagem de Votos ao Vivo** - Exibição em tempo real dos votos por opção
- 🎨 **Interface Moderna** - Design responsivo com gradientes e animações
- 🌐 **Blockchain Integrada** - Conexão direta com BSC Testnet via Wagmi
- 🧑‍💻 **Tipo Seguro** - Código TypeScript para maior segurança e manutenibilidade
- 🇧🇷 **Localização Português** - Interface e data/hora em português brasileiro

## 🛠️ Stack Tecnológico

### Frontend
- **React** - Biblioteca para construção de interfaces dinâmicas
- **TypeScript** - Superset do JavaScript com tipos estáticos
- **Vite** - Build tool/bundler ultra rápido
- **Wagmi** - Biblioteca para conexão eficiente Frontend ↔ Blockchain
- **Viem** - Cliente Ethereum low-level para interação com blockchain
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Bootstrap** - Framework CSS para interfaces responsivas

### Blockchain & Smart Contracts
- **Solidity** - Linguagem para desenvolvimento de Smart Contracts
- **Binance Smart Chain (Testnet)** - Rede blockchain utilizada
- **MetaMask** - Carteira digital para transações e autenticação

## 📁 Estrutura do Projeto

```
webbb3_dapp_course_blockchain/
├── README.md                 # Este arquivo
└── dapp/                     # Aplicação frontend
    ├── package.json          # Dependências do projeto
    ├── vite.config.ts        # Configuração do Vite
    ├── tsconfig.json         # Configuração do TypeScript
    ├── tsconfig.node.json    # Configuração TS para ferramentas
    ├── index.html            # HTML principal
    └── src/
        ├── main.tsx          # Ponto de entrada da aplicação
        ├── App.tsx           # Componente principal (router condicional)
        ├── login.tsx         # Página de autenticação com MetaMask
        ├── vote.tsx          # Página de votação
        ├── wagmi.ts          # Configuração da conexão blockchain
        ├── ABI.json          # Interface do Smart Contract
        ├── index.css         # Estilos globais
        └── vite-env.d.ts     # Tipos do Vite
```

### Fluxo da Aplicação

1. **App.tsx** - Verifica se o usuário está conectado
   - Se conectado → Exibe `Vote.tsx`
   - Se não conectado → Exibe `Login.tsx`

2. **login.tsx** - Tela de autenticação
   - Conecta carteira MetaMask via Wagmi
   - Autentica o usuário na blockchain

3. **vote.tsx** - Página principal de votação
   - Lê dados da votação atual do Smart Contract
   - Exibe opções e contagem de votos
   - Permite enviar votos para a blockchain
   - Verifica prazo de conclusão da votação

## 🚀 Primeiros Passos

### Pré-requisitos

- **Node.js** (v16+) - Runtime JavaScript
- **npm** ou **yarn** - Gerenciador de pacotes
- **MetaMask** - Extensão do navegador (extensão necessária)
- **Tokens BNB de Teste** - Obtidos no [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/eddiewav/webbb3_dapp_course_blockchain.git
   cd webbb3_dapp_course_blockchain
   ```

2. **Navegue até a pasta de aplicação**
   ```bash
   cd dapp
   ```

3. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Configure o MetaMask** (se não tiver configurado)
   - Instale a extensão MetaMask no seu navegador
   - Crie ou importe uma carteira
   - Adicione a rede BSC Testnet manualmente ou via chainlist.org

5. **Obtenha tokens de teste**
   - Visite o [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)
   - Solicite BNB de teste para sua carteira

## 📖 Uso

### Desenvolvimento

Inicie o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build para Produção

Compile a aplicação para produção:

```bash
npm run build
# ou
yarn build
```

Isso gerará uma pasta `dist/` com os arquivos otimizados.

### Preview de Produção

Visualize a build de produção localmente:

```bash
npm run preview
# ou
yarn preview
```

## ⚙️ Configuração

### Variáveis de Ambiente

Não há arquivos `.env` obrigatórios no projeto. No entanto, você pode estender o projeto adicionando:

```env
# Sugestão para futuras expansões
VITE_CONTRACT_ADDRESS=0xD07df20Cce5aa01F1e331F213Ae2711d4bb5Ab62
VITE_CHAIN_ID=97  # BSC Testnet
```

### Configuração da Blockchain

A rede blockchain é configurada em [dapp/src/wagmi.ts](dapp/src/wagmi.ts):

```typescript
export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
})
```

**Rede Atual**: Binance Smart Chain Testnet (Chain ID: 97)

### Configuração do Smart Contract

O endereço do Smart Contract está definido em [dapp/src/vote.tsx](dapp/src/vote.tsx):

```typescript
const CONTRACT_ADDRESS = '0xD07df20Cce5aa01F1e331F213Ae2711d4bb5Ab62';
```

A ABI (Application Binary Interface) está em [dapp/src/ABI.json](dapp/src/ABI.json).

## 📜 Scripts npm

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript e cria build otimizada com Vite |
| `npm run preview` | Visualiza build de produção localmente |

## 📡 Smart Contract - Documentação da API

O Smart Contract em Solidity expõe as seguintes funções:

### Funções de Escrita (State-Changing)

#### `addVoting(string option1, string option2, uint256 timeToVote)`
Cria uma nova votação com duas opções.

**Parâmetros:**
- `option1` - Texto da primeira opção
- `option2` - Texto da segunda opção  
- `timeToVote` - Duração da votação em segundos

**Retorno:** Nenhum

**Nota:** Requer transação blockchain.

#### `addVote(uint256 choice)`
Registra um voto para uma opção.

**Parâmetros:**
- `choice` - ID da opção (1 para option1, 2 para option2)

**Retorno:** Nenhum

**Nota:** Requer transação blockchain e tokens de teste.

### Funções de Leitura (View/Pure)

#### `getCurrentVoting() → Voting struct`
Retorna os dados da votação atual.

**Retorno:**
```solidity
struct Voting {
    string option1;      // Texto da primeira opção
    uint256 votes1;      // Contagem de votos da primeira opção
    string option2;      // Texto da segunda opção
    uint256 votes2;      // Contagem de votos da segunda opção
    uint256 maxDate;     // Timestamp de término da votação
}
```

**Exemplo de Resposta (TypeScript):**
```typescript
{
    option1: "Participante A",
    option2: "Participante B",
    votes1: 42,
    votes2: 38,
    maxDate: 1704067200  // Unix timestamp
}
```

#### `currentVoting() → uint256`
Retorna o índice da votação atual.

**Retorno:** Número inteiro representando a votação atual.

## 🎓 Aprendizados & Conceitos-Chave

Este projeto fornece compreensão prática de:

- ✅ **Sintaxe Solidity** - Desenvolvimento de Smart Contracts seguindo boas práticas
- ✅ **Arquitetura Web3** - Padrão de integração Frontend + Blockchain
- ✅ **Wallets Digitais** - Autenticação via MetaMask e gerenciamento de transações
- ✅ **Conexão DApp-Blockchain** - Uso de bibliotecas como Wagmi e Viem
- ✅ **TypeScript para Web3** - Type safety ao interagir com blockchain
- ✅ **Ecosistema Blockchain** - Redes de teste, faucets, e exploradores de blockchain

## 🤝 Contribuindo

Contribuições são bem-vindas! Para reportar bugs ou sugerir melhorias:

1. Abra uma **Issue** descrevendo o problema ou sugestão
2. Faça um **Fork** do repositório
3. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
4. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
5. Push para a branch (`git push origin feature/MinhaFeature`)
6. Abra um **Pull Request** descrevendo as mudanças

## 📚 Recursos Úteis

- [Documentação Wagmi](https://wagmi.sh/)
- [Documentação Viem](https://viem.sh/)
- [Remix IDE - Editor de Solidity](https://remix.ethereum.org/)
- [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)
- [BscScan Testnet](https://testnet.bscscan.com/) - Explorador de Blockchain
- [MetaMask - Carteira e Gateway Web3](https://metamask.io/)

## 📝 Agradecimentos

Este projeto foi desenvolvido como trabalho final do curso **Web3 Week**, ministrado pelo professor [Luiz Fernando Duarte Junior](https://linkedin.com). Agradecimentos especiais ao professor pela dedicação, orientação e apoio durante todo o processo de aprendizado.

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para a comunidade Web3 brasileira.**

