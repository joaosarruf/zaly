# Usar uma imagem oficial do PHP
FROM php:8.1-apache

# Configurar o ServerName para evitar o erro AH00558
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copiar arquivos do projeto para o container
COPY . /var/www/html/

# Configurar o Apache para usar index.html como arquivo padrão
RUN echo "<Directory /var/www/html/>" >> /etc/apache2/apache2.conf && \
    echo "    DirectoryIndex index.html" >> /etc/apache2/apache2.conf && \
    echo "</Directory>" >> /etc/apache2/apache2.conf

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html

# Expor a porta 80
EXPOSE 80
