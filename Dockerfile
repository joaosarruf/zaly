FROM node:18-alpine

# Cria o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (se houver) antes do código para aproveitar o cache
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --production

# Copia o restante do código
COPY . .

# Se o seu server.js escuta na porta 3000, exponha-a
EXPOSE 3000

# Comando padrão para iniciar o servidor Node
CMD ["npm", "start"]
