# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro para otimizar o cache do Docker
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --production

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o servidor irá utilizar (port 3000)
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
