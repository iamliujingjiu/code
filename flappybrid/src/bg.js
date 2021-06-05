const BgImg = require("./bean/BgImg");

const bg = new BgImg();

function onDraw(context){
    context ? context.drawImage(bg.getImg(), bg.getX(), bg.getY(), bg.getW(), bg.getH()) : '';
}

bg.onDraw = onDraw;

module.exports = bg;
