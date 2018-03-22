# Particles

Prerequisites: [FontForge](http://fontforge.github.io) and [WOFF2 Compressor by Google](https://github.com/google/woff2)

## Start the script
```
./bin/start
```

or

## Step by step

1. Generate JSON file
```
./bin/dump ./config.json > ./dist/icons/particles.json
```

2. Replace stroke `linecap` and `linejoin` methods. It's a bug with FontForge
```
./bin/replace ./config.json stroke-linecap=\"round\" stroke-linecap=\"butt\"
./bin/replace ./config.json stroke-linejoin=\"round\" stroke-linejoin=\"miter\"
```

3. Generate font files
```
fontforge -script ./bin/generate ./config.json ./dist/icons/particles.json
woff2_compress ./dist/fonts/particles.ttf
```

4. Build style files and JSON data file
```
./bin/create_css ./config.json > ./dist/style/particles.css
./bin/create_scss ./config.json > ./dist/style/particles.scss
./bin/create_data ./dist/fonts/particles.svg > ./dist/icons/particles-data.json
```

## Start frontend app

```
yarn
yarn dev
```
