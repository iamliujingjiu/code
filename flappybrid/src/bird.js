const BirdImg = require("./bean/BirdImg");

const birdFilePathList = [['./assets/bird0_0.png', './assets/bird0_1.png', './assets/bird0_2.png'], ['./assets/bird1_0.png', './assets/bird1_1.png', './assets/bird1_2.png'], ['./assets/bird2_0.png', './assets/bird2_1.png', './assets/bird2_2.png']];

let LENGTH = birdFilePathList.length;
let mBirdList = [];

const random = Math.floor(Math.random() * LENGTH);

let birdFilePathArr = birdFilePathList[random];
LENGTH = birdFilePathArr && birdFilePathArr.length;
mBirdList = new Array(LENGTH);


for(let index = 0; index < LENGTH;index++){
    let birdFilePath = birdFilePathArr[index];
    let bird = new BirdImg(birdFilePath);
    mBirdList[index] = bird;
}

function onInit(x, y){
    for(let index = 0; index < LENGTH;index++){
        let bird = mBirdList[index];
        bird.setX(x);
        bird.setY(y);
    }
}

function onMove(addY){
    for(let index = 0; index < LENGTH;index++){
        let bird = mBirdList[index];
        let y = bird.getY();
        bird.setY(y + addY);
    }
}

function onDraw(context, timer, angle){
    let index = Math.floor(timer % 9 / 3); 
    let bird = mBirdList[index];
    // context ? context.fillRect(bird.getX(), bird.getY(), bird.getW(), bird.getH()) : '';
    context ? context.drawImage(bird.getImg(angle), bird.getX() - bird.getW() / 2, bird.getY() - bird.getH() / 2, bird.getW(), bird.getH()) : '';
}

/**
 * 碰撞检测
 * @param {*} landT 
 * @param {*} pipeList 
 * @param {*} gameOverCallback 
 */
function collisionDetection(landT, pipeList, gameOverCallback){
    mBirdList.forEach((bird) => {
        //因为图片有留白 所以碰撞检测多计算一些值
        let birdL = bird.getX() - bird.getW() / 2 + 10;
        let birdR = birdL + bird.getW() - 20;
        let birdT = bird.getY() - bird.getH() / 2 + 10;
        let birdB = birdT + bird.getH() - 20;
 
        //触地
        if(birdB > landT){
            
            gameOverCallback();
        }

        pipeList.forEach((pipe) => {
            if((birdL > pipe.X && birdL < pipe.X + pipe.W)
            // 右侧撞到柱子
            || (birdR > pipe.X && birdR < pipe.X + pipe.W)){
                // 鸟右上方的点撞到上方的柱子
                if(birdT > 0 && birdT < pipe.H + pipe.downY){
                    
                    gameOverCallback();
                // 鸟右下方的点撞到下方的柱子 
                }else if(birdB > pipe.upY && birdB < landT){
                    
                    gameOverCallback();
                }
            }
        })
    })
}

module.exports = {
    onInit : onInit,
    onMove : onMove,
    onDraw : onDraw,
    collisionDetection : collisionDetection
};