# Particles

A collection of fully editable line icons using [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) and [FontForge Scripting](https://fontforge.github.io/scripting.html).

## Usage
There are two ways of using the particles. With [Webpack](https://webpack.js.org/) or other bundle system or goold old CSS way.

### Usage with Webpack
First install using your package manager. Webpack will automatically copy the fonts to your output folder.

```
yarn install presslabs-particles-icons
```
or
```
npm install presslabs-particles-icons
```

Then in your `sass` file import the fonts and style
```scss
$particles-font-path: "~presslabs-particles-icons/dist/fonts/";
@import "~presslabs-particles-icons";
```

then where you want to use them in your SCSS file:
```scss
.icon {
  @import particle('add');
}
```
or in HTML markup:
```html
<i class="particle">add</i>
```
For a full list of particles and usage see [project demo](https://www.presslabs.org/particles/)

### Basic usage with css and fonts
You to copy the fonts to your working directory in `fonts` folder and  `particles.css` in your `css` folder, then import the style in html:
```html
<link rel="stylesheet" href="css/particles.css" />
```

then where you want to use them:
```html
<i class="particle">add</i>
```
For a full list of particles and usage see [project demo](https://www.presslabs.org/particles/)

## Developing

Prerequisites: [FontForge](http://fontforge.github.io) and [WOFF2 Compressor by Google](https://github.com/google/woff2)

### Start the script
```
./bin/start
```

or

### Step by step

1. Generate JSON file
```
./bin/dump ./config.json > ./dist/icons/particles.json
```

2. Replace stroke `linecap` and `linejoin` methods. It's a [bug](https://github.com/fontforge/fontforge/issues/2007) with FontForge
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

### Start frontend app

```
yarn
yarn dev
```
