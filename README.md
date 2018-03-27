INSTALLING DEPENDENCIES
==

Before cloning you must install git-lfs else website images won't download correctly from github.

~~~
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
~~~

In order to get the images to download correctly you have to run `git lfs install` after installing the package, else images won't download properly.


You must also have git-secret installed in order to retrieve the private keys that are uploaded to the repository encrypted

~~~
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
echo "deb https://dl.bintray.com/sobolevn/deb git-secret main" | sudo tee -a /etc/apt/sources.list
wget -qO - https://api.bintray.com/users/sobolevn/keys/gpg/public.key | sudo apt-key add -
sudo apt-get update && sudo apt-get install git-secret
~~~

You must also have gulp installed globally in order for the install script to work, you can install it by doing `npm install -g gulp`

CREATING THE DATABASE AND BUILDING FOR PRODUCTION
==


You should do `git secret tell <yourgpg@email.com>` in order to pair your private/public keys with git-secret.

And then `git secret reveal` in order to decode the `keys.js` file needed for stripe support (and also prevent an error when starting index.js).

Run `bash install.sh` to create the database role, database object, create tables, and import csv data to it from schema.ods.

Also it will run gulp to build all js/scss code and prepare some extra assets (fonts).
