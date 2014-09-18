var util = require('util');
var http;
try {
	http = require('http-sync');
} catch(e) {
	http = require('http-sync-win');	
}


var TEMPLATE = 'angular.module(\'%s\', []).run(function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '});\n';


var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

var createDirectiveTemplateUrlPreprocessor = function(logger, basePath, config) {

  
  config = typeof config === 'object' ? config : {};

		
  var log = logger.create('preprocessor.directivetemplateurl');
	var reTemplateUrl = new RegExp("templateUrl\\s*:\\s*['\"](.*?)['\"]", "igm");

	
  return function(content, file, done) {
    log.debug("processing : %s", file);

    var modulesScript = "";
    var match = reTemplateUrl.exec(content);
		while (match != null) {
			var htmlPath = match[1];
			var req = http.request({
					host: config.baseUrl ,
					path: "/" + htmlPath,
					port: config.port
			});


			var res = req.end();
			var fileContent = res.body.toString();
			var moduleScript = util.format(TEMPLATE, htmlPath, htmlPath, escapeContent(fileContent));
			modulesScript += moduleScript;
			match = reTemplateUrl.exec(content);
		}
		done(modulesScript + content);
  };
};

createDirectiveTemplateUrlPreprocessor.$inject = ['logger', 'config.basePath' , 'config.ngDirectiveTemplateUrlPreprocessor'];

module.exports = createDirectiveTemplateUrlPreprocessor;
