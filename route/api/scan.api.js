const express = require("express");
const router = require('express').Router();



//CONTROLLER
const controller = require('../../controller/scan.controller');

// @route   POST api
// @desc    Make a new scan
// @access  Public
router.post('/' , controller.startScan,controller.scanPort);


module.exports = router;