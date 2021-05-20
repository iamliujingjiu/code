window.onload = function onload(){
    
    let startFunc = (function(){
        const canvas = document.getElementById('canvas');
        const context = canvas && canvas.getContext && canvas.getContext('2d');

        const cacheCanvas = document.createElement("canvas");
        const cacheContext = cacheCanvas && cacheCanvas.getContext && cacheCanvas.getContext('2d');

        //背景的初始化
        const canvasX = 0;
        const canvasY = 0;
        const canvasWidth = 288;
        const canvasHeight = 517;
        const backgroundImgPath = './assets/bg_day.png';
        const backgroundImg = new Image();

        //地面的初始化
        const landWidth = canvasWidth;
        const landHeight = 112;
        const landX = 0;
        const landY = canvasHeight - landHeight;
        const LANDLENGTH = 3;
        const landImgPath = './assets/land.png';
        const landList = new Array(LANDLENGTH);
        for(let index = 0;index < LANDLENGTH;index++){
            let x = parseInt(index * landWidth, 10);
            let y = canvasHeight - landHeight;
            landList[index] = {
                X : x,
                Y : y,
                W : landWidth,
                H : landHeight,
            };
        }


        //鸟的初始化
        let birdX = 40;
        let birdY = landY / 2;
        //因为图片周边有一圈是透明的 
        //所以图片的宽高与小鸟实际占用的宽高需要分开来
        const birdWidth = 34;
        const birdHeight = 24;

        const speedX = 1;//X轴 飞翔的速度
        const speedDownY = 1;//Y轴 下落的速度
        const speedUpY = 15;//Y轴 上升的速度
        let addUpY = 0;//Y轴上升的高度
        let birdImg = new Image();


        window.onclick = function(event) {
            addUpY -= speedUpY;
        }
        //障碍物的初始化
        const pipeImgWidth = 52;
        const pipeImgHeight = 320;
        const pipeImgIntervalHeight = 115;//这个可以改动
        const pipeMinHeight = 80;//这个可以改动
        const pipeMaxHeight = landY - pipeImgIntervalHeight - pipeMinHeight;

        const pipeDownImgPath = './assets/pipe_down.png';
        const pipeUpImgPath = './assets/pipe_up.png';
      

        const PIPELENGTH = 3;
        const pipeImgList = new Array(PIPELENGTH);
        for(let index = 0;index < PIPELENGTH;index++){
            let x = parseInt(canvasWidth + index * canvasWidth / 2, 10);
            let downY = parseInt(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight, 10) - pipeImgHeight;
            let upY = downY + pipeImgHeight + pipeImgIntervalHeight;
            pipeImgList[index] = {
                X : x,
                downY : downY,
                upY : upY,
                W : pipeImgWidth,
                H : pipeImgHeight,
            };
        }
        
        //计分器
        let score = 0;
        //计时器
        let time = 0;

        //画板初始化宽高
        canvas.width = cacheCanvas.width = canvasWidth;
        canvas.height = cacheCanvas.height = canvasHeight;

        //失败的方法
        function fail(val){
            alert(val);
        }

        return function draw(){
            time += 1;
            if(time >= 29999){
                time = 0;
            }
             
            if(cacheContext){
                
                //触地
                if(birdY + birdHeight >= landY){
                    fail('掉地上摔死了');
                    return;
                }
                
                //碰撞检测
                for(let pipe of pipeImgList){
                    let add = 0;
                    // 左侧撞到柱子
                    if((birdX + add >= pipe.X && birdX + add <= pipe.X + pipe.W)
                        // 右侧撞到柱子
                        || (birdX + add + birdWidth >= pipe.X && birdX + add + birdWidth <= pipe.X + pipe.W)){
                        // 鸟右上方的点撞到上方的柱子
                        if(birdY + add >= 0 && birdY + add < pipe.H + pipe.downY){
                            debugger
                            fail('撞到上面的柱子撞死了');
                            return;
                        // 鸟右下方的点撞到下方的柱子 
                        }else if(birdY + birdHeight >= pipe.upY && birdY + birdHeight <= landY){
                            debugger
                            fail('撞到下面的柱子撞死了');
                            return;
                        }
                    }
                }

                backgroundImg.onload = function(){
                    cacheContext.drawImage(backgroundImg, canvasX, canvasY, canvasWidth, canvasHeight);
                }
                backgroundImg.src = backgroundImgPath;


                for(let pipe of pipeImgList){
                    let pipeDownImg = new Image();
                    pipeDownImg.onload = function(){
                        cacheContext.drawImage(pipeDownImg, pipe.X, pipe.downY, pipe.W, pipe.H);
                    }
                    pipeDownImg.src = pipeDownImgPath;

                    let pipeUpImg = new Image();
                    pipeUpImg.onload = function(){
                        cacheContext.drawImage(pipeUpImg, pipe.X, pipe.upY, pipe.W, pipe.H);
                    }
                    pipeUpImg.src = pipeUpImgPath;
                   
                

                    pipe.X -= speedX;
                    
                    if(pipe.X === birdX){
                        score += 1;
                    }

                    if(pipe.X + pipe.W <= 0){
                        
                        let x = parseInt(PIPELENGTH * canvasWidth / 2 - pipeImgWidth, 10);
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
                    // cacheContext.fillRect(birdX, birdY, birdWidth, birdHeight);
                    cacheContext.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
                }

                let imgPath = './assets/bird2_'+ (Math.abs(parseInt(time, 10)) % 3) +'.png';
                birdImg.src = imgPath;

                
            
                for(let land of landList){
                    let landImg = new Image();

                    land.X -= speedX;

                    if(land.X + land.W <= landX){
                        let x = parseInt((LANDLENGTH - 1) * landWidth, 10);
                        land.X = x;
                    }

                    landImg.onload = function(){
                        cacheContext.drawImage(landImg, land.X, land.Y, land.W, land.H);
                    }
                    landImg.src = landImgPath;
                    
                }
                
                cacheContext.font = "32px bold 黑体";
                cacheContext.fillStyle = "white";
                cacheContext.textAlign = "center";
                cacheContext.textBaseline = "middle";
                cacheContext.fillText(score, canvasWidth / 2, landY / 2);
                
                if(context){
                    context.drawImage(cacheCanvas, canvasX, canvasY, canvasWidth, canvasHeight);
                }
                
                requestAnimationFrame(draw);
            }    

        }
    }())
    
    startFunc();
}