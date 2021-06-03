
const BaseImg = require("../base/BaseImg");
const bgFilePathList = ['./assets/bg_day.png', './assets/bg_night.png'];

class BgImg extends BaseImg{

    constructor(){
        const random = Math.ceil(Math.random() * 2);
        super(bgFilePathList[random]);
    }
}

module.exports = BgImg;