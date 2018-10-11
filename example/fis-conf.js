var fisLivereload = require('../index').create()

fis.media('dev').match('*.html', {
    postprocessor: fisLivereload
})
