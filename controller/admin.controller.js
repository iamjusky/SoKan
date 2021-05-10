
//HELPERS
const { ErrorHandler } = require("../helpers/error");
const utilies = require('../helpers/utilies')

//MODEL
const Service = require('../model/Service')

const controller = {}


controller.createService = async (req, res, next) => {
    const {services} = req.body

    try {
        const newServices = await Service.insertMany(services);
        res.json(newServices);
    } catch (error) {
        next(error)
    }
}

controller.deleteAllServices = async (req, res, next) => {
    const {services} = req.body

    try {
        await Service.deleteMany();
        res.json("Deleted all successfully");
    } catch (error) {
        next(error)
    }
}
module.exports = controller