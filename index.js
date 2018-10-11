var hashToPort = require('hash-to-port')
var livereload = require('livereload')
var path = require('path')
var net = require('net')
var pathIsAbsolute = require('path-is-absolute');
var extend = require('safe-extend')

module.exports = {
    create: function (settings, watchDir) {
        var defaultSettings = {
            port: hashToPort(process.cwd()),
            delay: 100,
            exclusions: [/\\.git\//, /\\.svn\//, /\\.hg\//]
        }
        settings = extend(true, defaultSettings, settings)
        var port = settings.port
        if (!watchDir) {
            if (pathIsAbsolute(fis.config.data.options.d)) {
                watchDir = fis.config.data.options.d
            }
            else {
                watchDir = path.join(process.cwd(), fis.config.data.options.d)
            }
        }
        function portIsOccupied (port, callback) {
          var server = net.createServer().listen(port)
          server.on('listening', function () {
                server.close()
                callback(false)
          })
          server.on('error', function (err) {
            callback(true)
          })
        }
        portIsOccupied(port, function (listened) {
            if (listened) {

            }
            else {
                var lrserver = livereload.createServer(settings)
                lrserver.watch(watchDir)
                fis.log.info('Livereload: http://127.0.0.1:' + port + '\n\t' + watchDir)
            }
        })
        return function (content, file) {
            if (content.indexOf('fis-livereload') === -1) {
                var url = 'http://127.0.0.1:' + port + '/livereload.js?snipver=1'
                var livereloadScriptTag = "<script>;(function(){ \r\n\
                    var node = document.createElement('script'); \r\n\
                    node.setAttribute('src', '" + url + "'); \r\n\
                    document.body.appendChild(node); \r\n\
                })();</script>"
                content = content.replace(/<\/\s*body>/, livereloadScriptTag + '</body>')
            }
            return content
        }
    }
}
