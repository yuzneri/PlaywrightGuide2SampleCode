FROM dunglas/frankenphp:php8.3.11

RUN apt-get update && \
    apt-get install -y \
        git \
        unzip \
        libzip-dev \
        curl \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libonig-dev \
        libxml2-dev \
    && install-php-extensions pdo_mysql mbstring zip exif pcntl bcmath gd \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && rm -rf /var/lib/apt/lists/* \

RUN cp $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
