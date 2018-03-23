# Particles

Particles is a collection of fully editable line icons — using [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) and [FontForge Scripting](https://fontforge.github.io/scripting.html).

Particles was developed by the awesome engineering team at [Presslabs](https://www.presslabs.com/), 
a Managed WordPress Hosting provider.

For more open-source projects, check [Presslabs Code](https://www.presslabs.org/). 

## Usage
There are two ways of using Particles — with [Webpack](https://webpack.js.org/) or other bundle system, or with the good old CSS.

For a full list of particles and usage, see [project demo](https://www.presslabs.org/particles/)

### Webpack
First, you have to install Particles with your package manager — using one of the commands below. Webpack will automatically copy the fonts to your output folder. 

```
yarn install presslabs-particles-icons
```
or
```
npm install presslabs-particles-icons
```

Second, import the fonts and style in your `sass` file. 
```scss
$particles-font-path: "~presslabs-particles-icons/dist/fonts/";
@import "~presslabs-particles-icons";
```

Additionally, import the fonts and style where you wish to use them in your style file.  

```scss
.icon {
  @import particle('add');
}
```
Or use them directly in HTML markup.
```html
<i class="particle">add</i>
```

### CSS and Fonts
You can copy the fonts to your working directory, in the `fonts` folder, and  `particles.css` in your `css` folder. Then, import the style in the `header` of the HTML file:
```html
<link rel="stylesheet" href="css/particles.css" />
```

Additionally, add the icons where you wish to use them in your file.
```html
<i class="particle">add</i>
```

## Develop Custom Fonts

To develop custom fonts, you need to install the following: [FontForge](http://fontforge.github.io) and [WOFF2 Compressor by Google](https://github.com/google/woff2). Next, follow the instructions below. 


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

2. Replace stroke `linecap` and `linejoin` methods (it's a [bug](https://github.com/fontforge/fontforge/issues/2007) with FontForge)
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

You're set! 

## License

This project is licensed under the MIT License. For more information, read the [LICENSE file](LICENSE-MIT) in the
top distribution directory.
