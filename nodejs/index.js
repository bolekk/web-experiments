var server = require("./server");
var router = require("./router");
var reqHandlers = require("./requestHandlers");

var handlers = {}
handlers["/"] = reqHandlers.start;
handlers["/start"] = reqHandlers.start;
handlers["/upload"] = reqHandlers.upload;
handlers["/show"] = reqHandlers.show;

server.start(router.route, handlers);
