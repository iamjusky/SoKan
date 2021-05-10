const dns = require('dns');

//HELPERS
const { ErrorHandler } = require("../helpers/error");

exports.getIpAdd = async (url) => {
         return await new Promise((resolve, reject) => {
            dns.lookup(url, (err, address, family) => {
                if (err) reject(err);
                resolve(address);
            });
        }).then(res => {
            return res
        }).catch(err => {
            throw  new ErrorHandler(404, "Your url  cannot access!!!")
        });
        
   
}
