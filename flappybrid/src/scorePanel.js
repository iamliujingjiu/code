const ScorePanelImg = require("./bean/ScorePanelImg");

const scorePanel = new ScorePanelImg();

function onInit(x, y){
    scorePanel.setX(x);
    scorePanel.setY(y);
}

function onDraw(context){
    context ? context.drawImage(scorePanel.getImg(), scorePanel.getX() - scorePanel.getW() / 2, scorePanel.getY() - scorePanel.getH() / 2, scorePanel.getW(), scorePanel.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
