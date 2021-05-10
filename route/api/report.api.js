const express = require("express");
const router = require('express').Router();
//CONTROLLER
const controller = require('../../controller/report.controller')

// @route   GET api/report/:idReport
// @desc    Get data of the scanned report
// @access  Public
router.get('/:idReport', controller.getReportById);

// @route   GET api/report
// @desc    Get all reports
// @access  Public
router.get('/', controller.getAllReports);

// @route   DEL api/report
// @desc    Delete all reports
// @access  Public
router.delete('/', controller.deleteAllReports);

module.exports = router;
