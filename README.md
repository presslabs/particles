# Presslabs Particles Icons Web Font

## Welcome to Particles
Open `demo/demo.html` to see a list of all the glyphs in your font along with their codes/ligatures.

## Requirements
Required packages fir installing NPM `canvas` package which can be found [here](https://www.npmjs.com/package/canvas)

#### macOS
```
brew install pkg-config cairo libpng jpeg giflib
```
#### Ubuntu
```
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
```
#### Windows
Instructions [here](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

After installing all packages run
```
yarn install
```

## Developing
Source files in `src` folder. Generated fonts will be placed inside `fonts` folder and demo inside `demo` folder.
To generate web fonts package and demo files run:
```
yarn build
```

## Usage
In you `sass` file add this block:
```
$font-path: "~presslabs-particles-icons/fonts/";
@import "~presslabs-particles-icons/fonts/style";
```

Particles was developed by the awesome engineering team at [Presslabs](https://www.presslabs.com/),
a Managed WordPress Hosting provider.

For more open-source projects, check [Presslabs Code](https://www.presslabs.org/).
