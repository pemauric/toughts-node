const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtController');

const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave);
router.get('/dashboard', checkAuth, ToughtsController.dashboard);
router.get('/', ToughtsController.showAll);

module.exports = router