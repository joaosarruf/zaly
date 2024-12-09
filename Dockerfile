FROM httpd:2.4

# Copiar arquivos do projeto para o diretório padrão do Apache
COPY . /usr/local/apache2/htdocs/

# Configurar o Apache para usar o index.html
RUN echo "DirectoryIndex index.html" >> /usr/local/apache2/conf/httpd.conf
