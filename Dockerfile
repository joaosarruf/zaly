# Usar uma imagem oficial do PHP
FROM php:8.1-apache

# Copiar arquivos do projeto para o container
COPY . /var/www/html/

# Instalar extensões necessárias (ex.: mailer)
RUN docker-php-ext-install mysqli

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html

# Expor a porta 80
EXPOSE 80
