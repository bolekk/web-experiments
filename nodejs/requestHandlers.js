var querystring = require("querystring");
var exec = require("child_process").exec;
var fs = require("fs");
var formidable = require("formidable");
var Mustache = require('Mustache');

function write(response, content) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function start(response, request) {
    console.log("start called");
    //exec("ls -lah", function(error, stdout, stderr) {
    //    write(response, stdout);
    //});
    var path = "./view/upload.html";
    fs.readFile(path, 'utf-8', function(err, content) {
        var context = {
            'title': 'Tytulik'
        };
        var rendered = Mustache.to_html(content, context);
        write(response, rendered);
    });
}

function upload(response, request) {
    console.log("upload called");
    var form = formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.rename(files.upload.path, "test.png", function(error) {
            if (error) {
                fs.unlink("test.png");
                fs.rename(files.upload.path, "test.png");
            }
        });

        write(response, "received image:<br/><img src='/show' />");
    });
}

function show(response, request) {
    console.log("show called");
    fs.readFile("test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
