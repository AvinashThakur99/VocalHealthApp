const express = require('express');
const router  = express.Router();
const protect = require('../middleware/auth');
const {
  saveRecord,
  getWeekHistory,
  getMonthHistory,
  getGraphData,
  getByCondition,
  getLatest
} = require('../controllers/healthController');

router.post('/record',protect, saveRecord);
router.get('/week',protect, getWeekHistory);
router.get('/month',protect, getMonthHistory);
router.get('/graph',protect, getGraphData);
router.get('/latest',protect, getLatest);
router.get('/condition/:disease',protect, getByCondition);

module.exports = router;