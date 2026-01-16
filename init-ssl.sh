#!/bin/bash

DOMAIN="myhospitalproject.o-r.kr"
EMAIL="admin@example.com"  # 변경하세요

# 디렉토리 생성
mkdir -p certbot/conf certbot/www

# 임시 nginx 설정 (SSL 없이)
cat > nginx/nginx-init.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name myhospitalproject.o-r.kr;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 200 'OK';
            add_header Content-Type text/plain;
        }
    }
}
EOF

echo "1. Starting nginx for certificate challenge..."
docker run -d --name temp-nginx \
  -p 80:80 \
  -v $(pwd)/nginx/nginx-init.conf:/etc/nginx/nginx.conf:ro \
  -v $(pwd)/certbot/www:/var/www/certbot \
  nginx:alpine

echo "2. Requesting certificate..."
docker run --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN

echo "3. Stopping temp nginx..."
docker stop temp-nginx
docker rm temp-nginx
rm -f nginx/nginx-init.conf

echo "4. Done! Now run: docker compose up -d"
