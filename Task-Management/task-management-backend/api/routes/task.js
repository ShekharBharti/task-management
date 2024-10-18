const express = require('express');
const router = express();
const TaskController = require('../controller/task');

// Get All Task List
router.get('/', TaskController.GetAll);

// POST Task
router.post('/', TaskController.Create);

// Delete
router.delete('/:id', TaskController.Delete);

// PUT Task
router.put('/:id', TaskController.Update);

module.exports = router;
