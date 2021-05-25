//背景

let mCanvas = null;
let mCanvasContext = null;
let mCacheCanvas = null;
let mCacheCanvasContext = null;
let mWidth = 0;
let mHeight = 0;
const canvas = {
    onInit : function(id, width, height){
        console.log('canvas onInit');
        mCanvas = document.getElementById(id);
        mCanvasContext = mCanvas && mCanvas.getContext && mCanvas.getContext('2d');
        
        mCacheCanvas = document.createElement("canvas");
        mCacheCanvasContext = mCacheCanvas && mCacheCanvas.getContext && mCacheCanvas.getContext('2d');

        mCanvas.width = mCacheCanvas.width = mWidth = width;
        mCanvas.height = mCacheCanvas.height = mHeight = height;
    },

    getWidth : function(){
        return mWidth;
    },

    getHeight : function(){
        return height;
    },

    getCachemCanvasContext : function(){
        return mCacheCanvasContext;
    },

    onCopy : function(){
        mCanvasContext.drawImage(mCacheCanvas, 0, 0, mWidth, mHeight);
    },
}

module.exports = canvas;
