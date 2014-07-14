var http = require('http');
var url = require('url');

function start(route, handlers) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Pathname = ' + pathname);
        route(handlers, pathname, res, req);

        /*req.setEncoding("utf8");
        var postData = "";
        req.addListener("data", function(chunk) {
            postData += chunk;
            console.log("Received chunk " + chunk);
        });
        req.addListener("end", function() {
            route(handlers, pathname, res, req);
        });*/
    }).listen(1337, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:1337/');
}

exports.start = start;
