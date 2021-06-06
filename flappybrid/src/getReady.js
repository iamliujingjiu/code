const GetReadyImg = require("./bean/GetReadyImg");

const getReady = new GetReadyImg();

function onInit(x, y){
    getReady.setX(x);
    getReady.setY(y);
}

function onDraw(context){
    context ? context.drawImage(getReady.getImg(), getReady.getX() - getReady.getW() / 2, getReady.getY() - getReady.getH() / 2, getReady.getW(), getReady.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
