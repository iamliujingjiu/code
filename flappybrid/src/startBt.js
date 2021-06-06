const StartBtImg = require("./bean/StartBtImg");

const startBt = new StartBtImg();

function onInit(x, y){
    startBt.setX(x);
    startBt.setY(y);
}

function onDraw(context){
    context ? context.drawImage(startBt.getImg(), startBt.getX() - startBt.getW() / 2, startBt.getY() - startBt.getH() / 2, startBt.getW(), startBt.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
