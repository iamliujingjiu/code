
const BaseImg = require("../base/BaseImg");
const tutorialFilePath = './assets/tutorial.png';

class TutorialImg extends BaseImg{

    constructor(){
        super(tutorialFilePath);
    }
}

module.exports = TutorialImg;