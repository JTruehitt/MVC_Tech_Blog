const router = require('express').Router()

const main = require('./main-routes')
const api = require('./api')


router.use(main);
router.use('/api', api);

module.exports = router