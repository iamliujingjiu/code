
const bgFilePathList = ['./assets/bg_day.png', './assets/bg_night.png'];
const landFilePath = './assets/land.png';
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
}

module.exports = config;