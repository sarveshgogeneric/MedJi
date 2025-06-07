FROM php:8.1-apache

RUN a2enmod rewrite
RUN rm -rf /var/www/html/*

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
