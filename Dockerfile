# Usa uma imagem leve do Node.js
FROM node:23-alpine AS build-stage

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Define PATH para acessar os binários do npm globalmente
ENV PATH="/app/node_modules/.bin:$PATH"

# Copia apenas os arquivos necessários primeiro para cache eficiente
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --frozen-lockfile

# Copia o restante dos arquivos para dentro do container
COPY . .

# Define a porta usada pelo Vite (padrão: 4000)
ENV PORT=4000
EXPOSE 4000

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]
