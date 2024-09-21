#!/bin/bash -euC

check_service_healthy() {
  local service_name=$1
  local max_retries=36
  local retries=0

  until (docker compose ps "$service_name" | grep -q "healthy") || [ $retries -eq $max_retries ]; do
    echo "$service_name starting: $(docker compose ps "$service_name" | grep "$service_name")"
    sleep 5
    retries=$((retries+1))
  done

  if [ $retries -eq $max_retries ]; then
    echo "Services did not become healthy in time"
    docker compose ps
    exit 1
  fi

  echo "$service_name healthy: $(docker compose ps "$service_name" | grep "$service_name")"
}

cp .env.example .env
docker compose build
docker compose up -d
docker compose exec node sh -c "npm ci && npm run build"
docker compose exec php composer install
docker compose up -d
check_service_healthy mysql

docker compose exec php php artisan migrate:refresh --seed --force

echo done.
