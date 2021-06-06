const ScoreImg = require("./bean/ScoreImg");

let scoreFilePathList = ['./assets/font_048.png', './assets/font_049.png', './assets/font_050.png', './assets/font_051.png', './assets/font_052.png', './assets/font_053.png', './assets/font_054.png', './assets/font_055.png', './assets/font_056.png', './assets/font_057.png'];

const mScoreList = scoreFilePathList.map((item) => {
    return new ScoreImg(item);
})

let X = 0;
let Y = 0;

/**
 * 初始化坐标
 * @param {*} x 
 * @param {*} y 
 */
function onInit(x, y){
    X = x;
    Y = y;
}

function onDraw(context, score){
    let arr = String.prototype.split.call(score, '');
    let allWidth = 0;
    let marginWidth = 0;
    
    arr.forEach(item => {
        let score = mScoreList[Number(item)];
        allWidth += score.getW();
    });
    
    arr.forEach(item => {
        let score = mScoreList[Number(item)];
        context.drawImage(score.getImg(), X - allWidth / 2 + marginWidth, Y - score.getH() / 2, score.getW(), score.getH());
        marginWidth += score.getW();
    });
    
}

module.exports = {
    onInit : onInit,
    onDraw : onDraw
};
