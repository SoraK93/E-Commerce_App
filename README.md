# E-Commerce App

This is a full stack application. It will contain all the basic features found in any e-commerce website. After which, I will start the optimization process for each specific process.

> [!NOTE]  
> **Main Purpose:**
>
> - Create a E-Commerce specific backend, able to handle all basic and optional functionality found in any E-Commerce App.
> - Implement newly learned feature or code into this project.

> [!IMPORTANT]  
> **Major Change:** Migrating to python backend using FastAPI Framework.  
> **Status:** Implement all product and user related routes

> [!TIP]  
> The current state of the project can get confusing. So, I would like to clear up few things. **'Backend'** folder contains code related to **python migration**; **'views'** folder contain code related to **frontend** and **other** folders contain code of the **old Express/NodeJs backend**.

## Getting started

### Python Backend
Run command in terminal to:  
install all packages

```shell
$ cd Backend
$ python -m venv .venv
$ pip install -r requirement.txt
```

To run backend server at (run this first): https://127.0.0.1:43576/ 

```shell
$ cd Backend
$ python main.py
```
### ExpressJs Backend
Run command in terminal to:  
install all packages

```shell
$ npm install
```

Start back end server at http://localhost:43576/

```shell
$ npm run dev
```

### Front-End:
> If using ExpressJS Backend, change branch
```shell
$ git checkout ty_migrate
```

Run command in terminal to:  
install all packages

```shell
$ cd views
$ npm install
```

Start front end server at https://localhost:5173/

```shell
$ cd views
$ npm run dev
```

## TODO List

:hourglass: Setup user based database schema giving access to specific tables on user level --> Isolating each users access to database  
:hourglass: Implement soft delete then hard delete after 30 days --> Like in case of product, if we try to delete the product and it exists in order table, currently this delete will create issues. implement something like is_delete tag and delete_timestamp  
:hourglass: Implement versioning on certain table activities like update --> This will create a safeguard towards unintentional overide when two prople are updating same thing  
:hourglass: Create excel template and system that helps seller upload loads of product at once  
:hourglass: Create e-mail services --> Forget Password --> Account verification --> Certain process like uploading a bunch of products using excel  
:hourglass: Implement forget password  
:hourglass: user can visit seller profile (no permissions needed)  
:hourglass: order crud operation  
:hourglass: Setup each routes with its appropriate requests and responses  
:hourglass: Setup error handling in case of bad request or server issue  
:hourglass: Setup a proper structure that identifies error code for backend to database data flow  
:hourglass: Setup authorisation  
:hourglass: Structure backend file in a organized manner  
:hourglass: making sure all api follows a certain return structure  

### Backend

:white_check_mark: Setup hashing for user login  
:white_check_mark: Setup authentication  
:white_check_mark: Setup session & cookie  
:white_check_mark: Use transactions for all database related requests  
:white_check_mark: Implement alembic to migrate and manage database changes made into python models  
:white_check_mark: Use HTTPS connection, Create SSL/ TLS certificate  

### Frontend

:white_check_mark: Add product manage section in user profile (seller exclusive)  
:white_check_mark: cart crud operation  
:white_check_mark: Use HTTPS connection, Create SSL/ TLS certificate  

