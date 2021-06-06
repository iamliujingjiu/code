const TitleImg = require("./bean/TitleImg");

const title = new TitleImg();

function onInit(x, y){
    title.setX(x);
    title.setY(y);
}

function onDraw(context){
    context ? context.drawImage(title.getImg(), title.getX() - title.getW() / 2, title.getY() - title.getH() / 2, title.getW(), title.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
