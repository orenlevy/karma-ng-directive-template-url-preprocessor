# karma-ng-directive-template-url-preprocessor 

> Preprocessor for loading html referenced dynamiclly on [AngularJS](http://angularjs.org/) directives.


## Installation

The easiest way is to keep `karma-ng-directive-template-url-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-ng-directive-template-url-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-ng-directive-template-url-preprocessor --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
        preprocessors: {
          'directives/directive.js': ['directivetemplateurl']
        },

        files: [
          '*.js',
          '*.html'
        ],

        ngDirectiveTemplateUrlPreprocessor : {
            baseUrl : 'localhost',
            port : 3000
        }
    }
  });
};
```

## How does it work ?

This preprocessor converts HTML URLs located on the URLs of Angular directives into JS strings and generates Angular modules. These modules, when loaded, insert these HTML files into the `$templateCache` and therefore Angular won't try to fetch them from the server.

For instance this `/templates/my_directive`...
```html
<div>something</div>
```
... will be served as `/templates/my_directive.js`:
```js
angular.module('/templates/my_directive.js', []).config(function($templateCache) {
  $templateCache.put('/templates/my_directive.js', '<div>something</div>');
});
```
