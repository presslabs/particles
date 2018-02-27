# Presslabs Particles Icons Web Font

## Welcome to Particles
Particles is a collection of flat icons that is open to customization. To see the full list of glyphs, along with their codes, open [demo](https://www.presslabs.org/particles/).

The Particles Icons Web Font is developed by the awesome engineering team at [Presslabs](https://www.presslabs.com/),
a Managed WordPress Hosting provider.

For more open-source projects, check [Presslabs Code](https://www.presslabs.org/).

## Usage
Importing is straightforward. In your `sass` file add the following block:
```
$font-path: "~presslabs-particles-icons/dist/fonts/";
@import "~presslabs-particles-icons/dist/css/particles";
```

To add an icon to custom elements, use:
```
.icon {
  @particle('database_scheduled');
}
```
or you can use it straight in HTML code:
```
<i class="particle">database_scheduled</i>
```

## Development requirements
Firstly, install the following dependencies:

#### For macOS
```
brew install pkg-config cairo libpng jpeg giflib
```
#### For Ubuntu
```
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev
```
#### For Windows
Please follow the instructions stated [here](https://github.com/Automattic/node-canvas/wiki/Installation---Windows).

After installing all the packages, run the command:
```
yarn install
```

Secondly, install the [NPM `canvas` package](https://www.npmjs.com/package/canvas).

## Development commands
Source files are found in the `files` folder. Generated fonts will be placed inside the `fonts` folder and the demo inside the `demo` folder.

To convert source SVG files to ready-for-font SVGs, run the command:
```
yarn convert
```

To generate web fonts package and demo files, run:
```
yarn generate
```

To build the demo, run:
```
yarn build
```

To view the demo in browser window, run:
```
yarn dev
```
In case you wish to create custom icons, please fork this project. 

Have fun using these icons, or building your custom ones!

