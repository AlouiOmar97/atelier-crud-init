var express = require('express');
var router = express.Router();
var validation= require('../middleware/validation')
var { findAll, createComment, displayUpdateForm, updateComment, deleteComment } = require('../services/commentService')

router.get('/', findAll);
router.post('/create', validation, createComment);
router.get('/update/:id', displayUpdateForm);
router.post('/update/:id', updateComment);
router.get('/delete/:id', deleteComment);

module.exports = router;
