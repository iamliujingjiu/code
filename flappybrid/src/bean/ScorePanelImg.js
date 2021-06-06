
const BaseImg = require("../base/BaseImg");
const scorePanelFilePath = './assets/score_panel.png';

class ScorePanelImg extends BaseImg{

    constructor(){
        super(scorePanelFilePath);
    }
}

module.exports = ScorePanelImg;