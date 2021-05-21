'use strict'
function onGameInitialization(){
    
    var mCanvas, mContext,
        cacheCanvas, cacheCanvasContext,

        bgCanvas, bgCanvasContext,
        landCanvas, landCanvasContext,
        pipeDownCanvas, pipeDownCanvasContext,
        pipeUpCanvas, pipeUpCanvasContext,
        titleCanvas, titleCanvasContext,
        startBtCanvas, startBtCanvasContext,
        bridCanvas, bridCanvasContext ,bridCanvasList = [],

        mCanvasX, mCanvasY,
        mCanvasWidth, mCanvasHeight,
        
        bgFilePath, bgImg,

        landX, landY,
        landWidth, landHeight,
        landFilePath, landImg,
        landLength,
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
        pipeDownFilePath, pipeDownImg,
        pipeUpFilePath, pipeUpImg,
        pipeLength,
        pipeList,

        titleImgX, titleImgY,
        titleImgWidth, titleImgHeight,
        titleImg, titleFilePath,

        startBtImgX, startBtImgY,
        startBtImgWidth, startBtImgHeight,
        startBtImg, startBtFilePath,

        mRandom,//记录随机数 白天或者黑夜
        mTime = 0,//计时器
        mScore = 0,//计分器
        

        mFont, mFillStyle, mTextAlign, mTextBaseline,

        running = false;

    function initBg(){
        bgCanvas = document.createElement("canvas");
        bgCanvasContext = bgCanvas && bgCanvas.getContext && bgCanvas.getContext('2d');

        bgCanvas.width = mCanvasWidth;
        bgCanvas.height = mCanvasHeight;

        //随机数选择背景图片
        bgFilePath = Math.floor(mRandom = Math.floor(Math.random() * 2)) ? './assets/bg_day.png' : './assets/bg_night.png';
        
        bgImg = new Image();

        bgImg.onload = function(){
            bgCanvasContext.drawImage(bgImg, mCanvasX, mCanvasY, mCanvasWidth, mCanvasHeight);
        }

        bgImg.src = bgFilePath;

    }

    function initLand(){
        landCanvas = document.createElement("canvas");
        landCanvasContext = landCanvas && landCanvas.getContext && landCanvas.getContext('2d');

        landWidth = mCanvasWidth;
        landHeight = 112;
        landX = mCanvasX;
        landY = mCanvasHeight - landHeight;

        landCanvas.width = landWidth;
        landCanvas.height = landHeight;

        landFilePath = './assets/land.png';
        
        landImg = new Image();

        landImg.onload = function(){
            landCanvasContext.drawImage(landImg, 0, 0, landWidth, landHeight);
        }
        landImg.src = landFilePath;

        //地面的初始化
        landList = new Array(landLength = 3);

        for(var index = 0;index < landLength;index++){
            var x = landX + Math.ceil(index * landWidth);
            var y = landY;
            landList[index] = {
                X : x,
                Y : y,
                W : landWidth,
                H : landHeight,
            };
        }
        
    }

    function initPipe(){
        pipeDownCanvas = document.createElement("canvas");
        pipeDownCanvasContext = pipeDownCanvas && pipeDownCanvas.getContext && pipeDownCanvas.getContext('2d');

        pipeUpCanvas = document.createElement("canvas");
        pipeUpCanvasContext = pipeUpCanvas && pipeUpCanvas.getContext && pipeUpCanvas.getContext('2d');

        //障碍物的初始化
        pipeImgWidth = 52;
        pipeImgHeight = 320;

        pipeDownCanvas.width = pipeUpCanvas.width = pipeImgWidth;
        pipeDownCanvas.height = pipeUpCanvas.height = pipeImgHeight;

        pipeImgIntervalHeight = 115;//这个可以改动
        pipeMinHeight = 80;//这个可以改动
        pipeMaxHeight = landY - pipeImgIntervalHeight - pipeMinHeight;
 
        if(mRandom){
            pipeDownFilePath = './assets/pipe_down.png';
            pipeUpFilePath = './assets/pipe_up.png';
        }else{
            pipeDownFilePath = './assets/pipe2_down.png';
            pipeUpFilePath = './assets/pipe2_up.png';
        }

        pipeDownImg = new Image();
        pipeDownImg.onload = function(){
            pipeDownCanvasContext.drawImage(pipeDownImg, 0, 0, pipeImgWidth, pipeImgHeight);
        }
        pipeDownImg.src = pipeDownFilePath;

        pipeUpImg = new Image();
        pipeUpImg.onload = function(){
            pipeUpCanvasContext.drawImage(pipeUpImg, 0, 0, pipeImgWidth, pipeImgHeight);
        }
        pipeUpImg.src = pipeUpFilePath;

        pipeList = new Array(pipeLength = 3);
        for(var index = 0;index < pipeLength;index++){
            var x = Math.ceil(mCanvasWidth + index * mCanvasWidth / 2);
            var downY = Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - pipeImgHeight;
            var upY = downY + pipeImgHeight + pipeImgIntervalHeight;
            pipeList[index] = {
                X : x,
                downY : downY,
                upY : upY,
                W : pipeImgWidth,
                H : pipeImgHeight,
            };
        }
    }

    function initBrid(){
        //鸟的初始化
        birdX = 40;
        birdY = mCanvasHeight / 2;
        birdWidth = 34;
        birdHeight = 24;

        speedX = 1;//X轴 飞翔的速度
        speedDownY = 3;//Y轴 下落的速度
        speedUpY = -30;//Y轴 上升的速度
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

        bridCanvasList.length  = 0;
        
        for(var index = 0, length = birdFilePathList.length;index < length;index++){
            var birdFilePath = birdFilePathList[index];
            birdImg = new Image();
            void (function(path, img){
                bridCanvas = document.createElement("canvas");
                bridCanvasContext = bridCanvas && bridCanvas.getContext && bridCanvas.getContext('2d');
                
                bridCanvas.width = birdWidth;
                bridCanvas.height = birdHeight;
                
                img.onload = (function(canvas, context){
                    return function(){
                        context.drawImage(img, 0, 0, birdWidth, birdHeight);
                        bridCanvasList.push(canvas);
                    }
                }(bridCanvas, bridCanvasContext))

                img.src = path;

            }(birdFilePath, birdImg))
            
        }

    }

    function initScore(){
        mFont = "32px bold 黑体";
        mFillStyle = "white";
        mTextAlign = "center";
        mTextBaseline = "middle";
    }

    function initEvent(){
        //监听点击事件
        window.addEventListener('click', function(event) {
            addUpY += speedUpY;
        })

        window.addEventListener('touchstart',function(event){
            addUpY += speedUpY;
        })
        // window.addEventListener('touchmove',function(e){
        //     console.log('touchmove');
        // })
        // window.addEventListener('touchend',function(e){
        //     console.log('touchend');
        // })

        // mCanvas.addEventListener('click', function(event) {
        //     alert('开始');
        // })

    }

    function onInit(){
        running = true;

        mCanvas = document.getElementById('canvas');
        mContext = mCanvas && mCanvas.getContext && mCanvas.getContext('2d');
        
        cacheCanvas = document.createElement("canvas");
        cacheCanvasContext = cacheCanvas && cacheCanvas.getContext && cacheCanvas.getContext('2d');

        mCanvasX = 0;
        mCanvasY = 0;
        mCanvasWidth = 288;
        mCanvasHeight = 517;

        mCanvas.width = mCanvasWidth;
        mCanvas.height = mCanvasHeight;

        cacheCanvas.width = mCanvasWidth;
        cacheCanvas.height = mCanvasHeight;

        initBg();
        initLand();
        initPipe();
        initBrid();
        onInitTitle();
        onInitStartBt();
        initScore();
        initEvent();

        onDraw();
    }

    function drawBg(){
        bgCanvas ? cacheCanvasContext.drawImage(bgCanvas, mCanvasX, mCanvasY, mCanvasWidth, mCanvasHeight) : '';
    }
    
    function drawPipe(){
        for(var index = 0, length = pipeList.length;index < length;index++){
            var pipeItem = pipeList[index];
            void (function(pipe){
                pipe.X -= speedX;
                pipeDownCanvas ? cacheCanvasContext.drawImage(pipeDownCanvas, pipe.X, pipe.downY, pipe.W, pipe.H) : '';
                pipeUpCanvas ? cacheCanvasContext.drawImage(pipeUpCanvas, pipe.X, pipe.upY, pipe.W, pipe.H) : '';
                if(pipe.X + pipe.W <= 0){
                    mScore += 1;
                    var x =  Math.ceil(pipeLength * mCanvasWidth / 2 - pipeImgWidth);
                    var downY =  Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - pipeImgHeight;
                    var upY = downY + pipeImgHeight + pipeImgIntervalHeight;
                    pipe.X = x;
                    pipe.downY = downY;
                    pipe.upY = upY;
                    pipe.W = pipeImgWidth;
                    pipe.H = pipeImgHeight;
                    
                }
            }(pipeItem))
        }
    }

    function drawLand(){
        for(var index = 0, length = landList.length;index < length;index++){
            var landItem =  landList[index];
            void (function(land){
                land.X -= speedX;

                if(land.X + land.W <= landX){
                    var x = parseInt((landLength - 1) * landWidth, 10);
                    land.X = x;
                }

                landCanvas ? cacheCanvasContext.drawImage(landCanvas, land.X, land.Y, land.W, land.H) : '';
            }(landItem))
        }
    }

    function drawBird(){
        //每隔3次绘制更换一次小鸟的图片
        var index = Math.floor(mTime % 9 / 3);
        bridCanvasList && bridCanvasList[index] ? cacheCanvasContext.drawImage(bridCanvasList[index], birdX, birdY, birdWidth, birdHeight) : '';
    }

    function drawScore(){
        cacheCanvasContext.font = mFont;
        cacheCanvasContext.fillStyle = mFillStyle;
        cacheCanvasContext.textAlign = mTextAlign;
        cacheCanvasContext.textBaseline = mTextBaseline;
        cacheCanvasContext.fillText(mScore, mCanvasWidth / 2, landY / 2);
        
    }

    function copyCache(){
        mContext ? mContext.drawImage(cacheCanvas, mCanvasX, mCanvasY, mCanvasWidth, mCanvasHeight) : '';
    }

    function collisionDetection(){
        var birdL = birdX;
        var birdR = birdX + birdWidth;
        var birdT = birdY;
        var birdB = birdY + birdHeight;

        //触地
        if(birdB > landY){
            onFail('掉地上摔死了');
        }
        
        //碰撞检测
        for(var index = 0, length = pipeList.length;index < length;index++){
            var pipeItem = pipeList[index];
            void (function(pipe){
                if((birdL > pipe.X && birdL < pipe.X + pipe.W)
                    // 右侧撞到柱子
                    || (birdR > pipe.X && birdR < pipe.X + pipe.W)){
                    // 鸟右上方的点撞到上方的柱子
                    if(birdT > 0 && birdT < pipe.H + pipe.downY){
                        onFail('撞到上面的柱子撞死了');
                    // 鸟右下方的点撞到下方的柱子 
                    }else if(birdB > pipe.upY && birdB < landY){
                        onFail('撞到下面的柱子撞死了');
                    }
                }
            }(pipeItem))
        }
    }

    function onDraw(){
        if(!running){
            return;
        }

        mTime += 1;
        if(mTime >= 29999){
            mTime = 0;
        }
            
        if(cacheCanvasContext){
            drawBg();
            drawPipe();

            birdY += addUpY;
            addUpY = 0;
            birdY < 0 ? birdY = 0 : '';
            birdY += speedDownY;

            drawBird();
            drawLand();
            drawScore();
            copyCache();
            collisionDetection();
            requestAnimationFrame(onDraw);
        }
    }
 
    function onFail(val){
        running = false;
        // 确保动画执行完毕
        setTimeout(function(){
            // alert(val);
            onDrawGameOverPage();
        }, 25)
    }
    
    onInit();

    //启动页面的绘制
    function onDrawGameLaunchPage(){
        mTime += 1;
        if(mTime >= 29999){
            mTime = 0;
        }

        drawBg();
        birdX = (mCanvasWidth - birdWidth) / 2;
        drawBird();
        drawLand();
        onDrawTitle();
        onDrawStartBt();
        copyCache();
        requestAnimationFrame(onDrawGameLaunchPage);
    }

    function onDrawGameStartPage(){
        
    }

    function onDrawGameOverPage(){
        if(birdY + birdHeight > landY){
            birdY = landY - birdHeight;
        }else{
            birdY += 30;
            drawBg();
            drawPipe();
            drawBird();
            copyCache();
        }

        requestAnimationFrame(onDrawGameOverPage);

    }

    function onInitTitle(){
        titleCanvas = document.createElement("canvas");
        titleCanvasContext = titleCanvas && titleCanvas.getContext && titleCanvas.getContext('2d');

        titleCanvas.width = titleImgWidth = 178;
        titleCanvas.height = titleImgHeight = 48;

        titleImgX = (mCanvasWidth - titleImgWidth) / 2;
        titleImgY = mCanvasHeight / 2 - titleImgHeight - birdHeight;
        titleFilePath = './assets/title.png';

        titleImg = new Image();
        titleImg.onload = function(){
            titleCanvasContext.drawImage(titleImg, 0, 0, titleImgWidth, titleImgHeight);
        }
        titleImg.src = titleFilePath;
    }

    function onDrawTitle(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(titleCanvas, titleImgX, titleImgY, titleImgWidth, titleImgHeight) : '';
    }


    function onInitStartBt(){
        startBtCanvas = document.createElement("canvas");
        startBtCanvasContext = startBtCanvas && startBtCanvas.getContext && startBtCanvas.getContext('2d');

        startBtCanvas.width = startBtImgWidth = 80;
        startBtCanvas.height = startBtImgHeight = 28;

        startBtImgX = (mCanvasWidth - startBtImgWidth) / 2;
        startBtImgY = mCanvasHeight - landHeight - startBtImgHeight - 40;
        startBtFilePath = './assets/button_ok.png';

        startBtImg = new Image();
        startBtImg.onload = function(){
            startBtCanvasContext.drawImage(startBtImg, 0, 0, startBtImgWidth, startBtImgHeight);
        }
        startBtImg.src = startBtFilePath;
    }

    function onDrawStartBt(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(startBtCanvas, startBtImgX, startBtImgY, startBtImgWidth, startBtImgHeight) : '';
    }
}

window.onload = onGameInitialization;