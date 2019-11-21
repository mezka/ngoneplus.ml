#!/bin/bash

sudo apt-get update && sudo apt-get install postgresql -y
echo "CREATE ROLE oneplus WITH SUPERUSER LOGIN PASSWORD 'oneplus';CREATE DATABASE oneplus;" | sudo -u postgres psql postgres
echo "GRANT ALL PRIVILEGES ON DATABASE oneplus TO oneplus;" | sudo -u postgres psql postgres
echo "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO oneplus;" | sudo psql -U oneplus
npm install
./node_modules/gulp/bin/gulp.js fonts
node init.js
cd public
../node_modules/gulp/bin/gulp.js build