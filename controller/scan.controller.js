const request = require('request');
const portScanner = require('node-port-scanner')
var validUrl = require('valid-url');

//HELPERS
const { ErrorHandler } = require("../helpers/error");
const utilies = require('../helpers/utilies')

//MODEL
const Report = require('../model/Report')
const Service = require('../model/Service')

const controller = {}

controller.startScan = async (req, res, next) => {
    const { url } = req.body;
   

    try {
        //URL phải có format: http://name.tail
        if (!url || !validUrl.isUri(req.body.url)) {
             throw new ErrorHandler(404, "Your url  cannot access!!!")
             
        }
        const { hostname, protocol, href } = new URL(req.body.url)
        const ipAd = await utilies.getIpAdd(hostname);
        await request(href, { json: true }, async (err, resp, body) => {
            if (!resp) {
                throw new ErrorHandler(404, "Your url  cannot access!!!")
            }
            if (resp.statusCode == 200) {
                const { server: tech } = { ...resp.headers }

                const newReport = new Report({
                    opStatus: 'Success',
                    scanInfo: {
                        numTests: '10',
                        numFinishedTest: '1'
                    },
                    scanOutput: {
                        info: {
                            protocol,
                            tech,
                            services: [],
                        }
                    },
                    scanStatus: 'running',
                    target: {
                        href,
                        hostname,
                        ipAd,
                    }
                })
                await newReport.save()

                await res.json(newReport)

                req.report = newReport
                next()
            } else {
                throw new ErrorHandler(404, "Your url  cannot access!!!")
            }
        });
    } catch (error) {
        next(error)
    }
}

controller.scanPort = async (req, res, next) => {
    const report = req.report
    const { hostname } = { ...report.target }
    let ports = []
    await Service.find({}, { "_id": 0 }, async (err, docs) => {
        if (err) {
            report.scanInfo.numFinishedTest = 2
            report.scanStatus = "Finished"
            return await report.save()
        }
        ports = docs.map(doc => doc.port)
        await portScanner(hostname, ports)
            .then(async results => {
                let services = []
                await Service.find({ "port": { "$in": results.ports.open } }, (err, docs) => {
                    services = docs.map(doc => {
                        return { "port": doc.port, "name": doc.name, "protocol": doc.protocol }
                    })
                })
                report.scanInfo.numFinishedTest = 2
                report.scanOutput.info.services = [...services]
            })
            .catch(error => {
                report.scanInfo.numFinishedTest = 2
                report.scanOutput.info.services = 'error'
            });
        await report.save()
        next()
    })
}

module.exports = controller