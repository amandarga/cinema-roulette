# Cinema Roulette

## Como Rodar o Projeto Localmente

### Frontend (desenvolvimento)

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra [http://localhost:8080](http://localhost:8080) no seu navegador

### Backend (integração com Notion)

1. Crie um arquivo `.env` na raiz do projeto com:
   ```env
   NOTION_API_KEY=sua_chave_aqui
   NOTION_DATABASE_ID=seu_database_id_aqui
   PORT=4000
   ```

2. Em outro terminal, rode o backend:
   ```bash
   npm run server
   ```

3. O backend vai rodar em [http://localhost:4000](http://localhost:4000)

## Deploy na Vercel 🚀

### Passo 1: Preparar o repositório

1. Faça commit de todas as alterações:
   ```bash
   git add .
   git commit -m "Preparar para deploy na Vercel"
   git push origin main
   ```

### Passo 2: Criar conta e projeto na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta do GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório **`cinema-roulette`**
5. Clique em **"Import"**

### Passo 3: Configurar Variáveis de Ambiente

Antes de fazer o deploy, adicione as variáveis de ambiente:

1. Na página de configuração do projeto, clique em **"Environment Variables"**
2. Adicione as seguintes variáveis:
   - **Nome:** `NOTION_API_KEY`  
     **Valor:** Seu Internal Integration Token do Notion
   - **Nome:** `NOTION_DATABASE_ID`  
     **Valor:** O ID do seu database do Notion

3. Clique em **"Deploy"**

### Passo 4: Aguardar o deploy

A Vercel vai:
- Instalar as dependências (`npm install`)
- Buildar o projeto (`npm run build`)
- Criar as serverless functions da pasta `api/`
- Publicar o site

Em alguns minutos seu site estará online em uma URL tipo:
```
https://cinema-roulette-xxxx.vercel.app
```

### Passo 5: Testar

1. Acesse a URL fornecida pela Vercel
2. Verifique se os filmes são carregados automaticamente do Notion
3. Teste o sorteio e veja se o status é atualizado no Notion

### Deploy automático

A partir de agora, todo `git push` no branch `main` vai automaticamente:
- Fazer rebuild do projeto
- Atualizar o site em produção

## Estrutura do Projeto

```
cinema-roulette/
├── api/                    # Serverless functions (Vercel)
│   ├── movies.js          # GET /api/movies - Buscar filmes
│   └── start.js           # POST /api/start - Atualizar status
├── src/                    # Código fonte React
│   ├── components/        # Componentes React
│   ├── pages/             # Páginas
│   └── lib/               # Utilitários
├── public/                # Arquivos estáticos
├── server.cjs             # Backend local (desenvolvimento)
├── vercel.json            # Configuração da Vercel
└── package.json           # Dependências e scripts
