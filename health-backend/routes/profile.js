const express= require('express');
const router= express.Router();
const multer= require('multer');
const path= require('path');
const protect= require('../middleware/auth');
const { saveProfile, getProfile } = require('../controllers/profileController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => {
    cb(null, `profile_${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.post('/', protect, upload.single('photograph'), saveProfile);
router.get('/',  protect, getProfile);

module.exports = router;