var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 5000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: './dist/styles/{path*}',
            handler: createDirectoryRoute('styles')
        },
        js: {
            method: 'GET',
            path: './dist/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: './dist/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: './dist/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: './dist/{path*}',
            handler: {
                file: path.join(__dirname, '/dist/index.html')
            }
        }
    };

server.route([ routes.css, routes.js, routes.assets, routes.templates, routes.spa ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/dist/', directory)
        }
    };
}

module.exports = server;