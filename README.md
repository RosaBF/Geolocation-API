# Geolocation-API

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/RosaBF/the-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Execute
   ```sh
   npm run start
   ```

**Docker**

1. Build the docker container

```sh
  docker compose up
```

2. The database has been built in the docker container.
   To connect it with a mongo client, please use this URL

```sh
   mongodb://localhost:7000/api_weather
```

**Database**

1. Open `mongodbforweather` database and create a collection named `users`.

2. Create an USER

```sh
  POSTMAN


POST http://localhost:3000/users/register

Copy and paste this example to register your first user:

  body:
{

"email": "frances.lynn@gmail.com",

"password": "1234"

}
```

### software design approach --> DDD 

```

src

├── helpers
├── middlewares
├── models
│
├── modules
│ ├── users
│ │ ├── do
│ │ ├── domain
│ │ ├── dto
│ │ ├── infrastructure
│ │ ├── repos
│ │ └── useCases
│ ├── validateAdressIsReal
│ │ ├── do
│ │ ├── domain
│ │ ├── dto
│ │ ├── infrastructure
│ │ ├── repos
│ │ └── useCases
│ └── weatherAndGeolocation
│   ├── do
│   ├── domain
│   ├── dto
│   ├── infrastructure
│   ├── repos
│   └── useCases
├── index.ts
└── app.ts

```
