if (fis.project.currentMedia() === 'dev') {
    var fisLivereload = require('../index').create()
    fis.match('*.html', {
        postprocessor: fisLivereload
    })
}
