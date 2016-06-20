# Seed project for Non-SPA applications

## What is included:
SCSS support

Browserify for commonJS modules

BabelJS for ES6 support

VueJS, Lodash, jQuery

Some basic VueJS directives and filters

Normalize and reset styling

Some SCSS snippets (buttons, modals, panels, tooltip)

##Local Server

`npm install` to install

`gulp watch` for local server

Open `localhost:9000/<folderName>`


Entry point for each view is `<folderName>/scripts/<folderName>-index.js` and  `<folderName>/styles/<folderName>.scss`

`<folderName>-index.js` should contain all the file imports and controller class instantiation and should have

##If you are using VueJS

`window.VueInstance = new Vue();`

`Controller` file should handle the `Vue` instantiation and all the view logic.


`<folderName>/styles/<folderName>.scss` should have `@import 'app/global/styles/_variable'`

All the scss files in `global/styles/*scss` folder are automatically merged in `dist/global/styles/global.css`

All the js files in `global/vendor/.js` folder are automatically merged in `dist/global/vendor.js`

In SCSS files, use `url('../../global/images/<imageName>')`

Use `container` class for each view.

###NOTE: 

If you are replacing the URL, always use images in css like this : `../../global/images/<imgName>`


###TODO:

Add support for installing front-end dependencies via NPM.

Add Jade support.

Remove the need of adding folder name in the gulpfile.
