const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.js');
const {authenticateUser} = require("../middleware/authentication");
const multer = require('multer');
const upload = multer({dest: 'public/images/'});



router.get('/', authenticateUser, contactController.listOwn);

router.get('/:id', authenticateUser, contactController.show);

router.post('/', authenticateUser, upload.single('image'), contactController.create);

router.put('/:id', authenticateUser, contactController.update);

router.delete('/:id', authenticateUser, contactController.remove);



module.exports = router;
