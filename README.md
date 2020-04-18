# Installation

Download the Internet:
```
docker-compose run --rm app npm install
```

# Development

Watch your code in real time:
```
docker-compose run --rm --service-ports app npm run watch 
```
You can define your own port with
```
SERVER_PORT=8090 docker-compose run --rm --service-ports app npm run watch
```

# Build (production)

First build your app:
```
docker-compose run --rm -u $(id -u ${USER}):$(id -g ${USER}) app npm run build
```
Generated code will be in `dist` folder.
To test it locally, you can run a server locally with:
```
docker-compose run --rm --service-ports app npm run start
```

# Utils

```
convert /tmp/0*.png +append -remap src/assets/images/pico8-custom-palette.png src/assets/images/car2.png 
```
