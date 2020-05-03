INSTALLING DEPENDENCIES
==

Before cloning you must install git-lfs else website images won't download correctly from github.

~~~
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
~~~

You will need to have the following available:

* nodejs
* npm
* postgresql
* Stipe.js API secret key for online credit card payments


CREATING THE DATABASE
===

You should run the following queries as the administrative user.

~~~
"CREATE ROLE oneplus WITH SUPERUSER LOGIN PASSWORD 'oneplus';
 CREATE DATABASE oneplus;" 
"GRANT ALL PRIVILEGES ON DATABASE oneplus TO oneplus;" 
"GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO oneplus;"
~~~


PREPARING THE ENV FILE
==

You will need to provision a .env file with the following data for the application to work

~~~
DB_HOST='localhost'
DB_PORT=**YOUR DB PORT HERE**
DB_NAME=oneplus
DB_USER=oneplus
DB_PASSWORD=oneplus
SESSION_SECRET_KEY=**SET A NEW SESSION SECRET KEY**
STRIPE_SECRET_KEY=**YOUR STRIPE SECRET KEY HERE**
APPLICATION_PORT=59876
~~~


It is also recommended to change the db password if remote access to the db is available.

POPULATING THE DATABASE
==

First we will create the CSVs from the data in schema.ods, they will be located at `./db/csv`

~~~
node ods_to_csv.js
~~~

Then we will run the init method to populate the database with those CSVs

~~~
node init.js
~~~

BUILDING THE STATIC FILES
==

~~~
npm run build
~~~

SETTING UP THE WEB SERVER
==

You will need to set up the web server to serve the static files and proxy any other requests to the node application.

Showing my apache virtualhost here for reference, but you can also use nginx

~~~
<VirtualHost *:80>
    ServerAdmin webmaster@ngoneplus.ml
    ServerName ngoneplus.ml
    ServerAlias www.ngoneplus.ml
    DocumentRoot /var/www/ngoneplus.ml/public/dist

    <Location "/"> # no, this closing tag is not a typo
        ProxyPassReverse http://localhost:59876
    </Location>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
~~~

RUNNING THE APPLICATION
==

~~~
node index.js
~~~

For production deployments I recommend you use a process manager like PM2.

[Learn more about PM2](https://pm2.keymetrics.io/)


