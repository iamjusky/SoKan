
//MODEL
const Report = require('../model/Report')


const controller = {}


controller.getReportById = async (req, res, next) => {

    try {
        const report = await Report.findById(req.params.idReport)
        res.json(report);
    } catch (error) {
        next(error)
    }

}

controller.getAllReports = async (req, res, next) => {

    try {
        const reports = await Report.find()
        res.json(reports);
    } catch (error) {
        next(error)
    }

}

controller.deleteAllReports = async (req, res, next) => {

    try {
        await Report.deleteMany()
        res.json("Deleted all successfully");
    } catch (error) {
        next(error)
    }

}
module.exports = controller