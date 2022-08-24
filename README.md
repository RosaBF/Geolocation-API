# the-API

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
  npm run start
```

2. The database have been build in the docker container:

```sh
   mongodb://localhost:7000/api_weather
```

### Architecture - DDD

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
