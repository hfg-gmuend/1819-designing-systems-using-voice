Node.js Crash Course Tutorial
==========================

## install node.js
Download [node.js](https://nodejs.org/) or install it via [Homebrew](https://brew.sh/) (macOS only)

```
$ brew install node
```

## node project setup

Go to you future project folder in your terminal:

```
$ cd projectfolder
```

### package.json
Create a `package.json` file:

```
$ npm init
```
Your package.json should look similar to this now:

```js
{
  "name": "node-tut",
  "version": "0.0.0",
  "description": "fancy project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### npm
[npm](https://www.npmjs.com/) is the package manager for JavaScript and the "world’s largest software registry".


#node packaged modules


### require

In node, there is a `require()` function for loading code from other files. If you install a module with [npm](https://npmjs.org):

```js
$ npm install uniq
// to add it automatically as dependency to package.json
$ npm install uniq --save
```

Then in a file `nums.js` we can `require('uniq')`:

```js
var uniq = require('uniq');
var nums = [ 5, 2, 1, 3, 2, 5, 4, 2, 0, 1 ];
console.log(uniq(nums));
```

The output of this program when run with node is:

```
$ node nums.js
[ 0, 1, 2, 3, 4, 5 ]
```

You can require relative files by requiring a string that starts with a `.`. For
example, to load a file `foo.js` from `main.js`, in `main.js` you can do:


```js
var foo = require('./foo.js');
```


### module exports

To export a single thing from a file so that other files may import it, assign over the value at `module.exports`:


```js
module.exports.dingDong = function (n) {
	var msg = "Ding Dong";
	console.log(msg);
};
```

Now when some module `main.js` loads your `robo.js`, the return value of
`require('./robo.js')` will be the exported function:

```js
var robo = require('./robo.js');
robo.dingDong();
```

This program will print:

```
Ding Dong
```

You can export any kind of value with `module.exports`, not just functions.

For example, this is perfectly fine:

```js
module.exports = 555
```

and so is this:

```js
var numbers = [];
for (var i = 0; i < 100; i++) numbers.push(i);
module.exports.numbers = numbers;
```

Note however that you can't do:

```
// this doesn't work
exports = 555
```

## async vs sync

```js
var fs = require('fs');

if (fs.existsSync('./index.js')) {
  console.log('index.js existsSync');
}

fs.exists('./index.js', function(exists){
  if (exists) {
    console.log('index.js existsAsync');
  }
});
```

## streams (file I/O)
[Streams](https://www.tutorialspoint.com/nodejs/nodejs_streams.htm) in node.js let you read data from a source or write data to a destination in **continuous** fashion.

```js
var fs = require('fs');

var readStream = fs.createReadStream('./index.js', 'utf8');

readStream
  .on('data', function(chunk) {
    console.log(chunk);
  })
  .on('end', function() {
    console.log('end');
  });
```

## read a csv file

```js
var fs = require('fs');
var csv = require('csv-parser');

fs.createReadStream('your-csv-file.csv')
  .pipe(csv())
  .on('data', function(data) {
    console.log('row', data);
  });
```

## browserify
[browserify](http://browserify.org) is a tool for compiling
[node-flavored](http://nodejs.org/docs/latest/api/modules.html) commonjs modules
for the browser.

### bundling for the browser

To run a module in node, you've got to start from somewhere.

In node you pass a file to the `node` command to run a file:

```
$ node robo.js
ding dong
```

Install browserify globally:

```
$ npm install -g browserify
```

In browserify, you do this same thing, but instead of running the file, you generate a stream of concatenated javascript files on stdout that you can write to a file with the `>` operator:

```
$ browserify robo.js > bundle.js
```

Now `bundle.js` contains all the javascript that `robot.js` needs to work. Just plop it into a single script tag in some html:

```html
<html>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

### npm scripts
npm supports a ["scripts" property](https://docs.npmjs.com/misc/scripts) in the package.json file. Additionally, arbitrary scripts can be executed by running:

```
$ npm run your-script-name
```

## dev server - automatic re-running
[Nodemon](https://github.com/remy/nodemon) will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Either install nodemon globally,

```
$ npm install -g nodemon
```

or define a npm script in package.json

```json
...
"scripts": {
    "watch": "nodemon *.js"
  },
...
```

Now you can run nodemon with:

```
$ npm run watch
```


### dev browser - webserver with budo
[Budo](https://github.com/mattdesl/budo) is a dev server for rapid prototyping with incremental reloading, LiveReload integration (including CSS injection), and other handy features.

Recommendend to define a npm script for it, so that we don't have to install it globally.

```json
...
"scripts": {
    "dev": "budo index.js:bundle.js --open --live --watch-glob '**/*.{html,css,js}'"
  },
...
```

If you write javascript in ES6 with [babelify](https://github.com/babel/babelify) ...

```json
...
"scripts": {
    "dev": "budo index.js:bundle.js --open --live --watch-glob '**/*.{html,css,js}' -- -t babelify"
  },
...
```

Now you can run budo with:

```
$ npm run dev
```

### express.js

[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework for building web applications and APIs.

```js
var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  res.send('Hi!')
});

app.get('/hello', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

## acknowledgements
* Text/outline mainly adapted from the [browserify-handbook](https://github.com/substack/browserify-handbook/)
