const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtController');

const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave);
router.get('/edit/:id', checkAuth, ToughtsController.editToughts);
router.post('/edit', checkAuth, ToughtsController.editToughtsSave);
router.get('/dashboard', checkAuth, ToughtsController.dashboard);
router.post('/remove', checkAuth, ToughtsController.removeToughts);
router.get('/', ToughtsController.showAll);

module.exports = router