//背景


const canvas = {
    mCanvas : null,
    mCanvasContext : null,
    mCacheCanvas : null,
    mCacheCanvasContext : null,
    mWidth : 0,
    mHeight : 0,

    onInit : function(id, width, height){
        console.log('canvas onInit');
        this.mCanvas = document.getElementById(id);
        this.mCanvasContext = this.mCanvas && this.mCanvas.getContext && this.mCanvas.getContext('2d');
        
        this.mCacheCanvas = document.createElement("canvas");
        this.mCacheCanvasContext = this.mCacheCanvas && this.mCacheCanvas.getContext && this.mCacheCanvas.getContext('2d');

        this.mCanvas.width = this.mCacheCanvas.width = this.mWidth = width;
        this.mCanvas.height = this.mCacheCanvas.height = this.mHeight = height;
    },

    onRotate : function(angle){
        this.mCacheCanvasContext.translate(this.mWidth / 2, this.mHeight / 2);
        this.mCacheCanvasContext.rotate(angle);
        this.mCacheCanvasContext.translate(0, 0);
    },

    onDrawImage : function(img, x, y, width, height){
        x = Math.ceil(x);
        y = Math.ceil(y);
        width = Math.ceil(width);
        height = Math.ceil(height);
        this.mCacheCanvasContext.drawImage(img, x, y, width, height);
    },

    onCopy : function(){
        this.mCanvasContext.drawImage(this.mCacheCanvas, 0, 0, this.mWidth, this.mHeight);
    },
}

module.exports = canvas;
