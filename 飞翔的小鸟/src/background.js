//背景

const bgFilePathList = ['./assets/bg_day.png', './assets/bg_night.png'];
const bg = {
    image : new Image(),
    width : 0,
    height : 0,
    /**
     * 
     * @param {*} random 0 白天  1 黑夜
     */
    onInit : function(random){
        this.image.onload = () => {
            debugger
            console.log(this);
            this.width = this.image.width;
            this.height = this.image.height;
            console.log(this);
        }
        this.image.onerror = (e) => {
            console.log(e);
            debugger
        }
        this.image.src = random === 0 ? bgFilePathList[0] : bgFilePathList[1];
    },

    getWidth : function(){
        return this.width;
    },

    getHeight : function(){
        return this.height;
    },

    onDraw : function(context){
        
    },
}

module.exports = bg;
