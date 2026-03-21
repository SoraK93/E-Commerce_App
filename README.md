# Project: E-Commerce App

This is a full stack application.

This will contain all the basic features found in any e-commerce website. After which, I will start the optimization process for each specific process.

The current state of the project can get confusing. So, I would like to clear up few things. **'Backend'** folder contains code related to **python migration**; **'views'** folder contain code related to **frontend** and **other** folders contain code of the **old Express/NodeJs backend**.

> [!NOTE]  
> **Main Purpose:**
>
> - Create a E-Commerce specific framework, able to handle all basic and optional functionality found in any E-Commerce App.
> - Implement newly learned feature or code into this project.

> [!IMPORTANT]  
> **Major Change:** Migrating to python backend using FastAPI Framework.  
> **Status:** On-Going

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
> If using ExpressJS Backend, change  
views -> features -> CONSTANT -> index.js -> ENDPOINT = `http://localhost:43576`

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

### Backend

- Setup each routes with its appropriate requests and responses
- Setup error handling in case of bad request or server issue
- Setup a proper structure that identifies error code for backend to database data flow
- Setup hashing for user login
- Setup authentication and authorisation
- ~~Setup session & cookie~~
- Structure backend file in a organized manner
- making sure all api follows a certain return structure
- ~~Implement alembic to migrate and manage database changes made into python models~~

### Frontend

- Implement forget password
- ~~Add product manage section in user profile (seller exclusive)~~
- user can visit seller profile (no permissions needed)
- ~~cart crud operation~~
- order crud operation

### Things I might look into

- Setup common middleware for all the repetative param lookups
- Setup client connection & transaction for all database related requests
- Setup user based database schema  
  giving access to specific tables on user level  
  -> isolating each users access to database
- Create SSL/ TLS certificate for all our connections ( backend <---> database )
- Implement soft delete then hard delete after 30 days  
  Like in case of product, if we try to delete the product and it exists in order table, currently this delete will create issues. implement something like is_delete tag and delete_timestamp
- Implement versioning on certain table activities like update  
  this will create a safeguard towards unintentional overide when two prople are updating same thing
