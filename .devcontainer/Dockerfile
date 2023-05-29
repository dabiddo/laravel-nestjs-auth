FROM php:8.1-fpm

#FROM php:8.1-fpm
# Installing dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installing extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl bcmath opcache
#RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
#RUN docker-php-ext-install gd

#Installl Node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
#RUN source ~/.bashrc 
#RUN nvm install --lts=gallium
#ENV NVM_DIR /usr/local/nvm

#RUN mkdir -p "$NVM_DIR"; \
#    curl -o- \
#        "https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh" | \
#        bash \
#    ; \
#    source $NVM_DIR/nvm.sh; \
#    nvm install --lts=hydrogen --latest-npm


#install composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm -rf composer-setup.php

# Changing Workdir
WORKDIR /app