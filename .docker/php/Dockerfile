ARG PHP_VERSION
FROM php:${PHP_VERSION}-fpm
ARG APP_CONTAINER_PATH

ENV DEBIAN_FRONTEND="noninteractive" \
    SYMFONY_ALLOW_APPDEV=1 \
    COMPOSER_ALLOW_SUPERUSER=1

# Set timezone
RUN rm /etc/localtime && ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zlib1g-dev \
    libzip-dev \
    libfontconfig1 \
    libxrender1 \
    ghostscript \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libicu-dev \
    libssl-dev \
    g++

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_mysql bcmath zip -j$(nproc) gd iconv intl \
    && docker-php-ext-enable opcache

RUN rm -rf /var/lib/apt/list*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN useradd -ms /bin/bash symfony
USER symfony
WORKDIR ${APP_CONTAINER_PATH}
