# EasyShop
The EasyShop project is designed to create, share and find recipes and then easily generate shopping lists for them!

Create an account, create a shopping list and start adding meals to them.

## Setup
Currently to setup, perform the following:
- In the root directory, run `docker-compose up`
- Connect to the database running in the easyshop_db container (default username/password: root/1234), and run all of the code in the SQL file in /easyshop_db
- In the /easyshop_app directory, run `npm start`