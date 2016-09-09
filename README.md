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


##Folder Structure
```
.
├── README.md
├── app
│   ├── global                              # Global Assets
│   │   ├── images
│   │   │   ├── circle.svg
│   │   │   └── dropdown-arrow.svg
│   │   ├── styles                          # Global Styles
│   │   │   ├── normalize.scss
│   │   │   ├── reset.scss
│   │   │   ├── variable.scss
│   │   │   ├── global.scss
│   │   │   ├── modals.scss
│   │   │   ├── panels.scss
│   │   │   └── tooltip.scss
│   │   └── vendor                          # Vendor files which will be added for each view
│   │       ├── jquery-1.12.3.min.js
│   │       ├── lodash.js
│   │       └── vue.min.js
│   ├── login                               # Example View containing files specific to that view
│   │   ├── index.html
│   │   ├── scripts
│   │   │   ├── login-index.js              # Entry point of login view
│   │   │   └── loginController.js          # Controller for each view
│   │   └── styles                          # Styles specific to each view
│   │       └── login.scss
│   └── vueHelpers                          # Global Helper files
│       ├── directives.js
│       └── filters.js
├── gulpfile.js
└── package.json

```

###NOTE:

If you are replacing the URL, always use images in css like this : `../../global/images/<imgName>`


###TODO:

Add support for installing front-end dependencies via NPM.

Add Jade support.

Remove the need of adding folder name in the gulpfile.
