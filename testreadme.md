# SERVER:

```
PORT=*любой порт который нравится*
```

### Установка пакетов

```bash
$ npm install
```

### Эндпоинты(куда запросы делать епт и какие методы HTTP)

## POST

# Товары

```
http://localhost:*порт*/api/products
```

# Юзеры

```
http://localhost:*порт*/api/users
```

# Заказы

```
http://localhost:*порт*/api/orders
```

## GET

# Товары

```
http://localhost:*порт*/api/products
http://localhost:*порт*/api/products/{id}
```

# Юзеры

```
http://localhost:*порт*/api/users
http://localhost:*порт*/api/users/{id}
```

# Заказы

```
http://localhost:*порт*/api/orders
http://localhost:*порт*/api/orders
```

## PATCH

# Товары

```
http://localhost:*порт*/api/products/{id}
```

# Юзеры

```
http://localhost:*порт*/api/users/{id}
```

## DELETE

# Товары

```
http://localhost:*порт*/api/products/{id}
```

# Юзеры

```
http://localhost:*порт*/api/users/{id}
```

### Запуск(первое используй)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
