
const bgFilePathList = ['./assets/bg_day.png', './assets/bg_night.png'];
const landFilePath = './assets/land.png';
const pipeFilePathList = [['./assets/pipe_down.png', './assets/pipe_up.png'], ['./assets/pipe2_down.png', './assets/pipe2_up.png']];
const birdFilePathList = [['./assets/bird0_0.png', './assets/bird0_1.png', './assets/bird0_2.png'], ['./assets/bird1_0.png', './assets/bird1_1.png', './assets/bird1_2.png'], ['./assets/bird2_0.png', './assets/bird2_1.png', './assets/bird2_2.png']];
const config = {
    getBgFilePathList : function(){
        return bgFilePathList;
    },

    getBgFilePath : function(index){
        return index === 0 ? bgFilePathList[0] : bgFilePathList[1];
    },

    getLandFilePath : function(){
        return landFilePath;
    },
    
    getPipeFilePathArr : function(index){
        return index === 0 ? pipeFilePathList[0] : pipeFilePathList[1];
    },

    getBirdFilePathArr : function(index){
        if(index === 0){
            return birdFilePathList[0];
        }else if(index === 1){
            return birdFilePathList[1];
        }else{
            return birdFilePathList[1];
        }
    },
}

module.exports = config;