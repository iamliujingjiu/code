'use strict'
function onGameInitialization(){
    onInit();
    
    var mCanvas, mContext,
        cacheCanvas, cacheCanvasContext,

        bgCanvas, bgCanvasContext,
        landCanvas, landCanvasContext,
        pipeDownCanvas, pipeDownCanvasContext,
        pipeUpCanvas, pipeUpCanvasContext,
        titleCanvas, titleCanvasContext,
        startBtCanvas, startBtCanvasContext,
        birdCanvas, birdCanvasContext ,birdCanvasList = [],
        gameOverImgCanvas, gameOverImgCanvasContext,//game over 图片
        scorePanelImgCanvas, scorePanelImgCanvasContext,//得分板 图片
        getReadyImgCanvas, getReadyImgCanvasContext ,//get ready 图片
        tutorialImgCanvas, tutorialImgCanvasContext,//教程图片

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

        gameOverImgX, gameOverImgY,
        gameOverImgWidth, gameOverImgHeight,
        gameOverImg, gameOverFilePath,

        scorePanelImgX, scorePanelImgY,
        scorePanelImgWidth, scorePanelImgHeight,
        scorePanelImg, scorePanelFilePath,

        getReadyImgX, getReadyImgY,
        getReadyImgWidth, getReadyImgHeight,
        getReadyImg, getReadyFilePath,
        
        tutorialImgX, tutorialImgY,
        tutorialImgWidth, tutorialImgHeight,
        tutorialImg, tutorialFilePath,

        tutorialImgCanvas, tutorialImgCanvasContext,//教程图片

        mRandom,//记录随机数 白天或者黑夜
        mTime = 0,//计时器
        mScore = 0,//计分器
        

        mFont, mFillStyle, mTextAlign, mTextBaseline,

        mAnimationFrame,
        // 4种状态 1 launch 2 ready 3 running 4 over
        mStatus = 1;

    function onInit(){
        onInitBg();
        setTimeout(function(){
            onInitLand();
            setTimeout(function(){
                onInitPipe();
                onInitbird();
                onInitTitle();
                onInitStartBt();

                onInitGameOverImg();
                onInitScorePanelImg();
                onInitGetReadyImg();
                onInitTutorialImg();
                initScore();
                initEvent();

                setTimeout(function(){
                    onDrawGameLaunchPage();
                },300)
            }, 100)
            

            
        }, 100)
    }

    function onInitBg(){
        mCanvas = document.getElementById('canvas');
        mContext = mCanvas && mCanvas.getContext && mCanvas.getContext('2d');
        
        cacheCanvas = document.createElement("canvas");
        cacheCanvasContext = cacheCanvas && cacheCanvas.getContext && cacheCanvas.getContext('2d');

        bgCanvas = document.createElement("canvas");
        bgCanvasContext = bgCanvas && bgCanvas.getContext && bgCanvas.getContext('2d');

        //随机数选择背景图片
        bgFilePath = Math.floor(mRandom = Math.floor(Math.random() * 2)) ? './assets/bg_day.png' : './assets/bg_night.png';
        bgImg = new Image();
        bgImg.onload = function(){
            mCanvas.width = cacheCanvas.width = bgCanvas.width = mCanvasWidth = bgImg.width;
            mCanvas.height = cacheCanvas.height = bgCanvas.height = mCanvasHeight = bgImg.height;
            bgCanvasContext.drawImage(bgImg, 0, 0, mCanvasWidth, mCanvasHeight);
        }
        bgImg.src = bgFilePath;
    }

    function onInitLand(){
        landCanvas = document.createElement("canvas");
        landCanvasContext = landCanvas && landCanvas.getContext && landCanvas.getContext('2d');
        landFilePath = './assets/land.png';
        landImg = new Image();
        landImg.onload = function(){
            landCanvas.width = landWidth = landImg.width;
            landCanvas.height = landHeight = landImg.height;
            landX = 0;
            landY = mCanvasHeight - landHeight;
            landCanvasContext.drawImage(landImg, 0, 0, landWidth, landHeight);

            //地面的初始化
            landLength = Math.ceil(2 * mCanvasWidth / landWidth)
            landList = new Array(landLength);
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
        landImg.src = landFilePath;
    }

    function onInitPipe(){
        pipeDownCanvas = document.createElement("canvas");
        pipeDownCanvasContext = pipeDownCanvas && pipeDownCanvas.getContext && pipeDownCanvas.getContext('2d');

        pipeUpCanvas = document.createElement("canvas");
        pipeUpCanvasContext = pipeUpCanvas && pipeUpCanvas.getContext && pipeUpCanvas.getContext('2d');

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
        pipeUpImg = new Image();

        pipeDownImg.onload = function(){
            pipeDownCanvas.width = pipeImgWidth = pipeDownImg.width;
            pipeDownCanvas.height = pipeImgHeight = pipeDownImg.height;
            pipeDownCanvasContext.drawImage(pipeDownImg, 0, 0, pipeImgWidth, pipeImgHeight);

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
        pipeUpImg.onload = function(){
            pipeUpCanvas.width = pipeUpImg.width;
            pipeUpCanvas.height = pipeUpImg.height;
            pipeUpCanvasContext.drawImage(pipeUpImg, 0, 0, pipeUpImg.width, pipeUpImg.height);
        }
        pipeUpImg.src = pipeUpFilePath;
        
        pipeDownImg.src = pipeDownFilePath;
    }

    function onInitbird(){
        //鸟的初始化
        birdX = 40;
        birdY = mCanvasHeight / 2;
        
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

        birdCanvasList.length = 0;
        
        for(var index = 0, length = birdFilePathList.length;index < length;index++){
            var birdFilePath = birdFilePathList[index];
            birdImg = new Image();
            void (function(path, img){
                img.onload = function(){
                    birdCanvas = document.createElement("canvas");
                    birdCanvasContext = birdCanvas && birdCanvas.getContext && birdCanvas.getContext('2d');
                    birdCanvas.width = birdWidth = img.width;
                    birdCanvas.height = birdHeight = img.height;
                    birdCanvasContext.rotate(-0.90);
                    birdCanvasContext.transform(1, 0, 0, 1, -12, 10);
                    birdCanvasContext.drawImage(img, 0, 0, birdWidth, birdHeight);
                    birdCanvasList.push(birdCanvas);
                }
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
        // window.addEventListener('click', function(event) {
        //     addUpY += speedUpY;
        // })

        // window.addEventListener('touchstart',function(event){
        //     addUpY += speedUpY;
        // })


        // window.addEventListener('touchmove',function(e){
        //     console.log('touchmove');
        // })
        // window.addEventListener('touchend',function(e){
        //     console.log('touchend');
        // })

        mCanvas.addEventListener('click', function(event) {
            var x = event.layerX;
            var y = event.layerY;
            var startBtImgL = startBtImgX;
            var startBtImgR = startBtImgX + startBtImgWidth;
            var startBtImgT = startBtImgY;
            var startBtImgB = startBtImgY + startBtImgHeight;

            if(mStatus === 3){
                addUpY += speedUpY;
            }else{
                if(mStatus === 2){
                    mAnimationFrame ? cancelAnimationFrame(mAnimationFrame) : '';
                    mAnimationFrame = requestAnimationFrame(onDrawGameStart);
                }else if(mStatus === 1){
                    if(x >= startBtImgL && x <= startBtImgR && y >= startBtImgT && y <= startBtImgB){
                        mAnimationFrame ? cancelAnimationFrame(mAnimationFrame) : '';
                        mAnimationFrame = requestAnimationFrame(onDrawGameReadyPage);
                    }
                }else{//4
                    if(x >= startBtImgL && x <= startBtImgR && y >= startBtImgT && y <= startBtImgB){
                        onInitPipe();
                        onInitbird();
                        mAnimationFrame ? cancelAnimationFrame(mAnimationFrame) : '';
                        mAnimationFrame = requestAnimationFrame(onDrawGameStart);
                    }
                }
            }
        })

    }

    

    function onDrawBg(){
        bgCanvas ? cacheCanvasContext.drawImage(bgCanvas, 0, 0, mCanvasWidth, mCanvasHeight) : '';
    }
    
    function onCalculatePipe(){
        for(var index = 0, length = pipeList.length;index < length;index++){
            var pipeItem = pipeList[index];
          
            void (function(pipe){
                pipe.X -= speedX;
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

    function onDrawPipe(){

        for(var index = 0, length = pipeList.length;index < length;index++){
            var pipeItem = pipeList[index];
            void (function(pipe){
                pipeDownCanvas ? cacheCanvasContext.drawImage(pipeDownCanvas, pipe.X, pipe.downY, pipe.W, pipe.H) : '';
                pipeUpCanvas ? cacheCanvasContext.drawImage(pipeUpCanvas, pipe.X, pipe.upY, pipe.W, pipe.H) : '';
            }(pipeItem))    
        }
    }

    function onCalculateLand(){
        for(var index = 0, length = landList.length;index < length;index++){
            var landItem =  landList[index];
            void (function(land){
                land.X -= speedX;

                if(land.X + land.W <= landX){
                    var x = parseInt((landLength - 1) * landWidth, 10);
                    land.X = x;
                }

            }(landItem))
        }
    }

    function onDrawLand(){
        for(var index = 0, length = landList.length;index < length;index++){
            var landItem =  landList[index];
            void (function(land){
                landCanvas ? cacheCanvasContext.drawImage(landCanvas, land.X, land.Y, land.W, land.H) : '';
            }(landItem))
        }
    }

    function onCalculateBird(){
        birdY += addUpY;
        addUpY = 0;
        birdY < 0 ? birdY = 0 : '';
        birdY += speedDownY;
    }

    function onDrawBird(){
        //每隔3次绘制更换一次小鸟的图片
        var index = Math.floor(mTime % 9 / 3);
        birdCanvasList && birdCanvasList[index] ? cacheCanvasContext.drawImage(birdCanvasList[index], birdX, birdY, birdWidth, birdHeight) : '';
    }

    function onDrawScore(){
        cacheCanvasContext.font = mFont;
        cacheCanvasContext.fillStyle = mFillStyle;
        cacheCanvasContext.textAlign = mTextAlign;
        cacheCanvasContext.textBaseline = mTextBaseline;
        cacheCanvasContext.fillText(mScore, mCanvasWidth / 2, landY / 2);
        
    }

    function copyCache(){
        mContext ? mContext.drawImage(cacheCanvas, 0, 0, mCanvasWidth, mCanvasHeight) : '';
    }

    function collisionDetection(){
        var birdL = birdX;
        var birdR = birdX + birdWidth;
        var birdT = birdY;
        var birdB = birdY + birdHeight;

        //触地
        if(birdB > landY){
            onDrawGameOverPage();
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
                        onDrawGameOverPage();
                    // 鸟右下方的点撞到下方的柱子 
                    }else if(birdB > pipe.upY && birdB < landY){
                        onDrawGameOverPage();
                    }
                }
            }(pipeItem))
        }
    }

    function onDrawGameStart(){
        mStatus = 3;

        mTime += 1;
        if(mTime >= 29999){
            mTime = 0;
        }
            
        if(cacheCanvasContext){
            onCalculatePipe();
            onCalculateLand();
            onCalculateBird();

            onDrawBg();
            onDrawPipe();
            onDrawBird();
            onDrawLand();

            onDrawScore();
            copyCache();
            collisionDetection();
            mAnimationFrame = requestAnimationFrame(onDrawGameStart);
        }
    }
 

    //启动页面的绘制
    function onDrawGameLaunchPage(){
        mStatus = 1;

        mTime += 1;
        if(mTime >= 29999){
            mTime = 0;
        }
        onCalculateLand();
        if(cacheCanvasContext){

            birdX = (mCanvasWidth - birdWidth) / 2;
            
            if(Math.floor(mTime % 16 / 8) === 0){
                birdY += 1;
            }else{
                birdY -= 1;  
            }
            onDrawBg();
            onDrawBird();
            onDrawLand();
            onDrawTitle();
            onDrawStartBt();
            copyCache();
      
            mAnimationFrame = requestAnimationFrame(onDrawGameLaunchPage);
        }
       
    }

    function onDrawGameReadyPage(){
        mStatus = 2;

        mTime += 1;
        if(mTime >= 29999){
            mTime = 0;
        }
        onCalculateLand();

        birdX = 40;

        if(Math.floor(mTime % 16 / 8) === 0){
            birdY += 1;
        }else{
            birdY -= 1;  
        }
        onDrawBg();
        onDrawBird();
        onDrawLand();
        onDrawGetReadyImg();
        onDrawTutorialImg();
        copyCache();
        mAnimationFrame = requestAnimationFrame(onDrawGameReadyPage);
    }

    function onDrawGameOverPage(){
        mStatus = 4;

        if(birdY + birdHeight >= landY){
            birdY = landY - birdHeight;
            cancelAnimationFrame(mAnimationFrame);
        }else{
            birdY += speedDownY;
        }

        onDrawBg();
        onDrawPipe();
        onDrawLand();
        onDrawBird();
        onDrawGameOverImg();
        ononDrawScorePanelImg();
        onDrawStartBt();
        copyCache();
        mAnimationFrame = requestAnimationFrame(onDrawGameOverPage);
    }

    function onInitTitle(){
        titleCanvas = document.createElement("canvas");
        titleCanvasContext = titleCanvas && titleCanvas.getContext && titleCanvas.getContext('2d');
        titleFilePath = './assets/title.png';
        titleImg = new Image();
        titleImg.onload = function(){
            titleCanvas.width = titleImgWidth = titleImg.width;
            titleCanvas.height = titleImgHeight = titleImg.height;
            titleImgX = (mCanvasWidth - titleImgWidth) / 2;
            titleImgY = mCanvasHeight / 2 - titleImgHeight - 100;
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
        
        startBtFilePath = './assets/button_ok.png';

        startBtImg = new Image();
        startBtImg.onload = function(){
            startBtCanvas.width = startBtImgWidth = startBtImg.width;
            startBtCanvas.height = startBtImgHeight = startBtImg.height;
            startBtImgX = (mCanvasWidth - startBtImgWidth) / 2;
            startBtImgY = mCanvasHeight - landHeight - startBtImgHeight - 40;
            startBtCanvasContext.drawImage(startBtImg, 0, 0, startBtImgWidth, startBtImgHeight);
        }
        startBtImg.src = startBtFilePath;
    }

    function onDrawStartBt(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(startBtCanvas, startBtImgX, startBtImgY, startBtImgWidth, startBtImgHeight) : '';
    }


    function onInitGameOverImg(){
        gameOverImgCanvas = document.createElement("canvas");
        gameOverImgCanvasContext = gameOverImgCanvas && gameOverImgCanvas.getContext && gameOverImgCanvas.getContext('2d');
        gameOverFilePath = './assets/text_game_over.png';
        gameOverImg = new Image();
        gameOverImg.onload = function(){
            gameOverImgCanvas.width = gameOverImgWidth = gameOverImg.width;
            gameOverImgCanvas.height = gameOverImgHeight = gameOverImg.height;
            gameOverImgX = (mCanvasWidth - gameOverImgWidth) / 2;
            gameOverImgY = (mCanvasHeight - landHeight) / 2 - gameOverImgHeight;
            gameOverImgCanvasContext.drawImage(gameOverImg, 0, 0, gameOverImgWidth, gameOverImgHeight);
        }
        gameOverImg.src = gameOverFilePath;
    }

    function onDrawGameOverImg(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(gameOverImgCanvas, gameOverImgX, gameOverImgY, gameOverImgWidth, gameOverImgHeight) : '';
    }
    
    function onInitScorePanelImg(){
        scorePanelImgCanvas = document.createElement("canvas");
        scorePanelImgCanvasContext = scorePanelImgCanvas && scorePanelImgCanvas.getContext && scorePanelImgCanvas.getContext('2d');
        scorePanelFilePath = './assets/score_panel.png';
        scorePanelImg = new Image();
        scorePanelImg.onload = function(){
            scorePanelImgCanvas.width = scorePanelImgWidth = scorePanelImg.width;
            scorePanelImgCanvas.height = scorePanelImgHeight = scorePanelImg.height;
            scorePanelImgX = (mCanvasWidth - scorePanelImgWidth) / 2;
            scorePanelImgY = (mCanvasHeight - landHeight) / 2;
            scorePanelImgCanvasContext.drawImage(scorePanelImg, 0, 0, scorePanelImgWidth, scorePanelImgHeight);
        }
        scorePanelImg.src = scorePanelFilePath;
    }

    function ononDrawScorePanelImg(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(scorePanelImgCanvas, scorePanelImgX, scorePanelImgY, scorePanelImgWidth, scorePanelImgHeight) : '';
    }

    function onInitGetReadyImg(){
        getReadyImgCanvas = document.createElement("canvas");
        getReadyImgCanvasContext = getReadyImgCanvas && getReadyImgCanvas.getContext && getReadyImgCanvas.getContext('2d');
        getReadyFilePath = './assets/text_ready.png';
        getReadyImg = new Image();
        getReadyImg.onload = function(){
            getReadyImgCanvas.width = getReadyImgWidth = getReadyImg.width;
            getReadyImgCanvas.height = getReadyImgHeight = getReadyImg.height;
            getReadyImgX = (mCanvasWidth - getReadyImgWidth) / 2;
            getReadyImgY = (mCanvasHeight - landHeight) / 2 - getReadyImgHeight;
            getReadyImgCanvasContext.drawImage(getReadyImg, 0, 0, getReadyImgWidth, getReadyImgHeight);
        }
        getReadyImg.src = getReadyFilePath;
    }

    function onDrawGetReadyImg(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(getReadyImgCanvas, getReadyImgX, getReadyImgY, getReadyImgWidth, getReadyImgHeight) : '';
    }

    function onInitTutorialImg(){
        tutorialImgCanvas = document.createElement("canvas");
        tutorialImgCanvasContext = tutorialImgCanvas && tutorialImgCanvas.getContext && tutorialImgCanvas.getContext('2d');
        tutorialFilePath = './assets/tutorial.png';
        tutorialImg = new Image();
        tutorialImg.onload = function(){
            tutorialImgCanvas.width = tutorialImgWidth = tutorialImg.width;
            tutorialImgCanvas.height = tutorialImgHeight = tutorialImg.height;
            tutorialImgX = (mCanvasWidth - tutorialImgWidth) / 2;
            tutorialImgY = (mCanvasHeight - landHeight) / 2 + tutorialImgHeight / 2;
            tutorialImgCanvasContext.drawImage(tutorialImg, 0, 0, tutorialImgWidth, tutorialImgHeight);
        }
        tutorialImg.src = tutorialFilePath;
    }

    function onDrawTutorialImg(){
        cacheCanvasContext ? cacheCanvasContext.drawImage(tutorialImgCanvas, tutorialImgX, tutorialImgY, tutorialImgWidth, tutorialImgHeight) : '';
    }

}

window.onload = onGameInitialization;