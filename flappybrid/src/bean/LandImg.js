
const BaseImg = require("../base/BaseImg");
const landFilePath = './assets/land.png';

class LandImg extends BaseImg{
    constructor(){
        super(landFilePath);
    }
}

module.exports = LandImg;