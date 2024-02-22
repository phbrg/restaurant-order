# Restaurant order
> This is a full-stack web application designed to address restaurant management challenges. In this app, users can conveniently place their food orders using their phones, reducing wrong orders and and facilitating workflow.

## Developers
- Backend
	- Pedro Henrique, [Github](https://github.com/phbrg)
- Frontend
	- Hiaki, [Github](https://github.com/NotHiaki)

## Technologies
- Backend
	- Node.js | Express.js | Sequelize.js | PostgreSQL | JavaScript
- Frontend
	- Angular | TypeScript | SCSS

> Other packages were used in the project, you can check each packages on: [Backend packages](https://github.com/phbrg/restaurant-manager/blob/master/backend/package.json), [Frontend packages](https://github.com/phbrg/restaurant-manager/blob/master/frontend/package.json)

## Docs
### Backend

### How to run the api

To run the backend api you need:
- Node.js
- PostgreSQL
- Git or Yarn

First you need to clone the project using:
```JSON
git clone https://github.com/phbrg/restaurant-manager.git
```

After clone run:
```JSON
npm i
```
to install the dependencies

Then create and <code>.env</code> archive in the project root folder and add these variables:
```JSON
POSTGRES_HOST=localhost # your host
POSTGRES_DATABASE= # your database name
POSTGRES_USER= # your postgres user
POSTGRES_PASSWORD= # your postgres password
ADMIN_PASSWORD=admin # project admin password
JWT_KEY= # project jwt secret key
```
> You need to create an database on pgAdmin with the name of POSTGRES_DATABASE

Then you can run
```JSON
npm start
```

After all the app should run, if not you can contact me.

### API Functions

### User

#### Register customer
- Route: <code>/</code>
- Method: <code>POST</code>
- Body:
```JSON
{
	"name": "Customer Name",
	"table": 22
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message": "Seja bem vindo!"
	}
	```

#### Logout
- Route: <code>/logout</code>
- Method: <code>PUT</code>
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message": "Obrigado por escolher o nosso restaurante! até a proxima."
	}
	```
#### Get products
- Route: <code>/products/parameter1/parameter2</code>
	- parameters:
	- <code>/</code>: get all products.
	- <code>avaliable</code>: get all avaliable products.
	- <code>unavaliable</code>: get all unavaliable products.
	- <code>id/id</code>: get the product by id.
	- <code>name/name</code>: get the product by name.
	- <code>category/category</code>: get the product by category.
- Method: <code>GET</code>
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"response": [
			{
				"id": 1,
				"name": "Product Name",
				"description": "Product Description",
				"category": "CATEGORY",
				"avaliable": true,
				"price": 99.99,
				"promotion": null,
				"createdAt": "2099-01-01T00:00:00.000Z",
				"updatedAt": "2099-01-01T00:00:00.000Z"
			},
			...
		]
	}
	```

#### Register order
- Route: <code>/registerorder</code>
- Method: <code>POST</code>
- Body:
```JSON
{
	"order":  [
		{
			"id":  1,
			"notes":  "Order Notes",
			"amount":  1
		},
		...
	]
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message": "Seu pedido foi registrado com sucesso!",
		"order": {
			{
				"status":  "Preparando pedido",
				"id":  1,
				"order":  [
					{
						"id":  1,
						"notes":  "Order Notes",
						"amount":  1
					},
					...
				],
				"total":  99.99,
				"UserId":  1,
				"updatedAt":  "2099-01-01T00:00:00.000Z",
				"createdAt":  "2099-01-01T00:00:00.000Z"
			}
		}
	}
	```


### Admin
> Every admin route is protected by middleware with admin authentication.

#### Register  admin
- Route: <code>/admin/register</code>
- Method: <code>POST</code>
- Body:
```JSON
{
	"name":  "admin",
	"login":  "admin",
	"password":  "admin",
	"confirmPassword":  "admin",
	"adminPassword":  "ADMINPASSOWRD"
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message": "Seja bem vindo!"
	}
	```

#### Create product
- Route: <code>/admin/createproduct</code>
- Method: <code>POST</code>
- Body:
```JSON
{
	"name":  "name",
	"description":  "description",
	"category":  "CATEGORY",
	"price":  99.99
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Produto registrado com sucesso!",
		"product":  {
		"avaliable":  true,
		"id":  1,
		"name":  "name",
		"description":  "description",
		"category":  "CATEGORY",
		"price":  99.99,
		"updatedAt":  "2099-01-01T00:00:00.000Z",
		"createdAt":  "2099-01-01T00:00:00.000Z",
		"promotion":  null
		}
	}
	```

#### Edit product
- Route: <code>/admin/editproduct/id</code>
- Method: <code>PUT</code>
- Body:
```JSON
{
	"name":  "name"
	...
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Produto atualizado com sucesso."
	}
	```

#### Edit admin
- Route: <code>/admin/editadmin/id</code>
- Method: <code>PUT</code>
- Body:
```JSON
{
	"name":  "name",
	...
	"adminPassword": "ADMINPASSWORD"
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Admin atualizado com sucesso."
	}
	```

#### Delete product
- Route: <code>/admin/deleteproduct/id</code>
- Method: <code>DELETE</code>
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Produto deletado com sucesso."
	}
	```

#### Delete admin
- Route: <code>/admin/deleteadmin/id</code>
- Method: <code>DELETE</code>
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Admin deletado com sucesso."
	}
	```

#### Get orders
- Route: <code>/admin/orders/parameter1/parameter2</code>
	- parameters:
	- <code>/</code>: get all products.
	- <code>notdone</code>: get all unprepared orders.
	- <code>awaiter</code>: get all orders that are waiting for the waiter.
	- <code>id/id</code>: get the product by id.
	- <code>user/UserId</code>: get the product by UserId.
- Method: <code>GET</code>
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"response":  [
			{
				"id":  1,
				"order":  [
					{
						"id":  1,
						"notes":  "Order Notes",
						"amount":  1
					},
					...
				],
				"status":  "Preparando pedido",
				"total":  99.99,
				"createdAt":  "2099-01-01T00:00:00.000Z",
				"updatedAt":  "2099-01-01T00:00:00.000Z",
				"UserId":  1
			},
			...
		]
	}
	```

#### Update order status
- Route: <code>/admin/updateorderstatus/id</code>
- Method: <code>PUT</code>
- Body:
```JSON
{
	"status":  "New order status"
	...
}
```
- Response:
	- Status: <code>200</code>
	```JSON
	{
		"message":  "Pedido atualizado com sucesso."
	}
	```

## License
This project is under [MIT License](LICENSE). See [LICENSE](LICENSE)   
for more details.
