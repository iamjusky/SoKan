const express = require("express");
const router = require('express').Router();
const { body } = require('express-validator');



//CONTROLLER
const controller = require('../../controller/admin.controller');

// @route   POST admin/service
// @desc    Add a new service
// @access  Public
router.post('/' , controller.createService);


// @route   DEL api/report
// @desc    Delete all reports
// @access  Public
router.delete('/', controller.deleteAllServices);

module.exports = router;