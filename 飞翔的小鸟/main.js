'use strict'
function game(){
    
    var mCanvas, mContext,
        bgCanvas, bgCanvasContext,
        cacheCanvas, cacheCanvasContext,

        mCanvasX, mCanvasY,
        mCanvasWidth, mCanvasHeight,
        
        bgCanvasX, bgCanvasY,
        bgCanvasWidth, bgCanvasHeight,
        
        cacheCanvasX, cacheCanvasY,
        cacheCanvasWidth, cacheCanvasHeight,

        bgFilePath, bgImg,

        landX, landY,
        landWidth, landHeight,
        landFilePath, landLength,
        landList,
        
        birdX, birdY,
        birdWidth, birdHeight,
        speedX,//X轴 飞翔的速度
        speedDownY,//Y轴 下落的速度
        speedUpY,////Y轴 上升的速度
        addUpY,//Y轴一次重绘上升的高度
        birdFilePathList, birdImg,


        pipeImgWidth, pipeImgHeight,
        pipeImgIntervalHeight,//上下管道的距离
        pipeMinHeight,//管道的最低高度
        pipeMaxHeight,//管道的最高高度
        pipeDownImgPath,
        pipeUpImgPath,
        pipeLength,
        pipeList,

        random,//记录随机数 白天或者黑夜
        
        score = 0,//计分器
        
        time = 0;//计时器


    function onInit(){
        mCanvas = document.getElementById('canvas');
        mContext = mCanvas && mCanvas.getContext && mCanvas.getContext('2d');
        
        bgCanvas = document.createElement("canvas");
        bgCanvasContext = bgCanvas && bgCanvas.getContext && bgCanvas.getContext('2d');

        cacheCanvas = document.createElement("canvas");
        cacheCanvasContext = cacheCanvas && cacheCanvas.getContext && cacheCanvas.getContext('2d');
        
        //背景的初始化
        mCanvasX = bgCanvasX = cacheCanvasX = 0;
        mCanvasY = bgCanvasY = cacheCanvasY = 0;
        mCanvasWidth = bgCanvasWidth = cacheCanvasWidth = 288;
        mCanvasHeight = bgCanvasHeight = cacheCanvasHeight = 517;
        debugger
        //画板初始化宽高
        mCanvas.width = mCanvasWidth;
        mCanvas.height = mCanvasHeight;

        bgCanvas.width = bgCanvasWidth;
        bgCanvas.height = bgCanvasHeight;

        cacheCanvas.width = cacheCanvasWidth;
        cacheCanvas.height = cacheCanvasHeight;
        
        //随机数选择背景图片
        bgFilePath = Math.floor(random = Math.floor(Math.random() * 2)) ? './assets/bg_day.png' : './assets/bg_night.png';
        
        bgImg = new Image();

        landWidth = cacheCanvasWidth;
        landHeight = 112;
        landX = cacheCanvasX;
        landY = cacheCanvasHeight - landHeight;

        landFilePath = './assets/land.png';
        
        //地面的初始化
        landList = new Array(landLength = 3);
        for(let index = 0;index < landLength;index++){
            let x = landX + Math.ceil(index * landWidth);
            let y = landY;
            landList[index] = {
                X : x,
                Y : y,
                W : landWidth,
                H : landHeight,
            };
        }


        //鸟的初始化
        birdX = 40;
        birdY = landY / 2;
        birdWidth = 34;
        birdHeight = 24;

        speedX = 1;//X轴 飞翔的速度
        speedDownY = 1;//Y轴 下落的速度
        speedUpY = 15;//Y轴 上升的速度
        addUpY = 0;//Y轴一次重绘上升的高度
        
        switch(Math.floor(Math.random() * 3)){
            case 0 :
                birdFilePathList = ['./assets/bird0_0.png', './assets/bird0_1.png', './assets/bird0_2.png'];
                break;
            case 1 :
                birdFilePathList = ['./assets/bird1_0.png', './assets/bird1_1.png', './assets/bird1_2.png'];
                break;
            default :
                birdFilePathList = ['./assets/bird2_0.png', './assets/bird2_1.png', './assets/bird2_2.png'];
                break;    
        }

        birdImg = new Image();

     
        //障碍物的初始化
        pipeImgWidth = 52;
        pipeImgHeight = 320;
        pipeImgIntervalHeight = 115;//这个可以改动
        pipeMinHeight = 80;//这个可以改动
        pipeMaxHeight = landY - pipeImgIntervalHeight - pipeMinHeight;
 
        if(random){
            pipeDownImgPath = './assets/pipe_down.png';
            pipeUpImgPath = './assets/pipe_up.png';
        }else{
            pipeDownImgPath = './assets/pipe2_down.png';
            pipeUpImgPath = './assets/pipe2_up.png';
        }
   

        pipeLength = 3;
        pipeList = new Array(pipeLength);
        for(let index = 0;index < pipeLength;index++){
            let x = Math.ceil(cacheCanvasWidth + index * cacheCanvasWidth / 2);
            let downY = Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - pipeImgHeight;
            let upY = downY + pipeImgHeight + pipeImgIntervalHeight;
            pipeList[index] = {
                X : x,
                downY : downY,
                upY : upY,
                W : pipeImgWidth,
                H : pipeImgHeight,
            };
        }

        //监听点击事件
        window.onclick = function(event) {
            addUpY -= speedUpY;
        }


        onDraw();
    }

    function onDraw(){
        time += 1;
        if(time >= 29999){
            time = 0;
        }
            
        if(cacheCanvasContext){
            
            //触地
            if(birdY + birdHeight >= landY){
                onFail('掉地上摔死了');
                return;
            }
            
            //碰撞检测
            for(let pipe of pipeList){
                let add = 0;
                // 左侧撞到柱子
                if((birdX + add >= pipe.X && birdX + add <= pipe.X + pipe.W)
                    // 右侧撞到柱子
                    || (birdX + add + birdWidth >= pipe.X && birdX + add + birdWidth <= pipe.X + pipe.W)){
                    // 鸟右上方的点撞到上方的柱子
                    if(birdY + add >= 0 && birdY + add < pipe.H + pipe.downY){
                        debugger
                        onFail('撞到上面的柱子撞死了');
                        return;
                    // 鸟右下方的点撞到下方的柱子 
                    }else if(birdY + birdHeight >= pipe.upY && birdY + birdHeight <= landY){
                        debugger
                        onFail('撞到下面的柱子撞死了');
                        return;
                    }
                }
            }

            if(bgCanvas){

            }
            bgImg.onload = function(){
                cacheCanvasContext.drawImage(bgImg, bgCanvasX, bgCanvasY, bgCanvasWidth, bgCanvasHeight);
            }
            bgImg.src = bgFilePath;


            for(let pipe of pipeList){
                let pipeDownImg = new Image();
                pipeDownImg.onload = function(){
                    cacheCanvasContext.drawImage(pipeDownImg, pipe.X, pipe.downY, pipe.W, pipe.H);
                }
                pipeDownImg.src = pipeDownImgPath;

                let pipeUpImg = new Image();
                pipeUpImg.onload = function(){
                    cacheCanvasContext.drawImage(pipeUpImg, pipe.X, pipe.upY, pipe.W, pipe.H);
                }
                pipeUpImg.src = pipeUpImgPath;
                
            

                pipe.X -= speedX;
                
                if(pipe.X === birdX){
                    score += 1;
                }

                if(pipe.X + pipe.W <= 0){
                    
                    let x = parseInt(pipeLength * mCanvasWidth / 2 - pipeImgWidth, 10);
                    let downY = parseInt(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight, 10) - pipeImgHeight;
                    let upY = downY + pipeImgHeight + pipeImgIntervalHeight;

                    pipe.X = x;
                    pipe.downY = downY;
                    pipe.upY = upY;
                    pipe.W = pipeImgWidth;
                    pipe.H = pipeImgHeight;
                    
                }
            }
            
            birdY += addUpY;
            addUpY = 0;

            if(birdY < 0){
                birdY = 0;
            }
            
            birdY += speedDownY;
            birdImg.onload = function(){
                // cacheCanvasContext.fillRect(birdX, birdY, birdWidth, birdHeight);
                cacheCanvasContext.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
            }

            birdImg.src = birdFilePathList[time % 3];
        
            for(let land of landList){
                let landImg = new Image();

                land.X -= speedX;

                if(land.X + land.W <= landX){
                    let x = parseInt((landLength - 1) * landWidth, 10);
                    land.X = x;
                }

                landImg.onload = function(){
                    cacheCanvasContext.drawImage(landImg, land.X, land.Y, land.W, land.H);
                }
                landImg.src = landFilePath;
                
            }
            
            cacheCanvasContext.font = "32px bold 黑体";
            cacheCanvasContext.fillStyle = "white";
            cacheCanvasContext.textAlign = "center";
            cacheCanvasContext.textBaseline = "middle";
            cacheCanvasContext.fillText(score, cacheCanvasWidth / 2, landY / 2);
            
            if(mContext){
                mContext.drawImage(cacheCanvas, mCanvasX, mCanvasY, mCanvasWidth, mCanvasHeight);
            }

            requestAnimationFrame(onDraw);
        }
    }

    function onStart(){

    }

    function onStop(){

    }

    function onFail(val){
        alert(val);
    }
    
    debugger
    onInit();
}

window.onload = game;