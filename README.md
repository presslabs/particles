# Particles

## Start the script
```
./bin/start
```

or step by step

1. Generate JSON file
```
./bin/dump ./icons/
```

2. Replace stroke `linecap` and `linejoin` methods. It's a bug with FontForge
```
./bin/replace ./icons stroke-linecap=\"round\" stroke-linecap=\"butt\"
./bin/replace ./icons stroke-linejoin=\"round\" stroke-linejoin=\"miter\"
```

3. Generate font files
```
./bin/generate ./config.json ./data.json
```

4. Convert to WOFF2 format
```
./bin/woff2_compress ./particles.ttf
```
