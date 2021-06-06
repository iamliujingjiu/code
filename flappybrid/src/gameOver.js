const GameOverImg = require("./bean/GameOverImg");

const gameOver = new GameOverImg();

function onInit(x, y){
    gameOver.setX(x);
    gameOver.setY(y);
}

function onDraw(context){
    context ? context.drawImage(gameOver.getImg(), gameOver.getX() - gameOver.getW() / 2, gameOver.getY() - gameOver.getH() / 2, gameOver.getW(), gameOver.getH()) : '';
}


module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
