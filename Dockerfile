# Use uma imagem base com PHP e Apache
FROM php:8.1-apache

# Copie todos os arquivos do projeto para o diretório root do servidor
COPY . /var/www/html/

# Configure as permissões
RUN chown -R www-data:www-data /var/www/html

# Exponha a porta 80 para o servidor web
EXPOSE 80

# Inicia o servidor Apache
CMD ["apache2-foreground"]
