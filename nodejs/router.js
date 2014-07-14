function route(handlers, pathname, response, request) {
    if (typeof handlers[pathname] === 'function') {
        return handlers[pathname](response, request);
    } else {
        console.log('No handler for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Not found');
        response.end();
    }
}

exports.route = route;
