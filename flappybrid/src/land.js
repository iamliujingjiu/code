const LandImg = require("./bean/LandImg");

let landL = new LandImg();
let landR = new LandImg();

function onInit(bgHeight){
    landL.setY(bgHeight - landL.getH());
    landR.setX(landR.getW());
    landR.setY(bgHeight - landR.getH());
}

function onMove(addX){
    let LX = landL.getX() + addX;
    let RX = landR.getX() + addX;

    if(LX + landL.getW() < 0){
        landL.setX(0);
        landR.setX(landL.getW());
    }else{
        landL.setX(LX);
        landR.setX(RX);
    }
}

function onDraw(context){
    context.drawImage(landL.getImg(), landL.getX(), landL.getY(), landL.getW(), landL.getH());
    context.drawImage(landR.getImg(), landR.getX(), landR.getY(), landR.getW(), landR.getH());
}

function getLandHeight(){
    return landL.getH();
}

function getLandTop(){
    return landL.getY();
}

module.exports = {
    onInit : onInit,
    onMove : onMove,
    onDraw : onDraw,
    getLandHeight : getLandHeight,
    getLandTop : getLandTop
};