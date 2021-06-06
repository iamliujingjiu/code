
const BaseImg = require("../base/BaseImg");
const titleFilePath = './assets/title.png';

class TitleImg extends BaseImg{

    constructor(){
        super(titleFilePath);
    }
}

module.exports = TitleImg;