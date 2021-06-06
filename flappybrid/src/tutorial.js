const TutorialImg = require("./bean/TutorialImg");

const tutorial = new TutorialImg();

function onInit(x, y){
    tutorial.setX(x);
    tutorial.setY(y);
}

function onDraw(context){
    context ? context.drawImage(tutorial.getImg(), tutorial.getX() - tutorial.getW() / 2, tutorial.getY() - tutorial.getH() / 2, tutorial.getW(), tutorial.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
