#!/bin/bash

echo "CREATE ROLE oneplus WITH SUPERUSER LOGIN PASSWORD 'oneplus';CREATE DATABASE oneplus;" | sudo -u postgres psql postgres
echo "GRANT ALL PRIVILEGES ON DATABASE oneplus TO oneplus;" | sudo -u postgres psql postgres
echo "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO oneplus;" | sudo psql -U oneplus
npm install
node init.js