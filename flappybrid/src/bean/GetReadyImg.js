
const BaseImg = require("../base/BaseImg");
const getReadyFilePath = './assets/text_ready.png';

class GetReadyImg extends BaseImg{

    constructor(){
        super(getReadyFilePath);
    }
}

module.exports = GetReadyImg;