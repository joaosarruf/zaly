# Usar a imagem oficial do Apache
FROM httpd:2.4

# Copiar arquivos do projeto para o servidor Apache
COPY . /usr/local/apache2/htdocs/
