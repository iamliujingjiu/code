
const ID = 'canvas';
let mCanvas, mContext, cacheCanvas, cacheContext;
let mWidth, mHeight;
function onInit(width, height){

    if(width === 0 || typeof width === 'undefined' || width === null){
        throw Error('width must be greater than 0');
    }
    if(height === 0 || typeof height === 'undefined' || height === null){
        throw Error('height must be greater than 0');
    }
    mCanvas = document.getElementById(ID);
    mContext = mCanvas && mCanvas.getContext && mCanvas.getContext('2d');
    cacheCanvas = document.createElement('canvas');
    cacheContext = cacheCanvas && cacheCanvas.getContext && cacheCanvas.getContext('2d');

    mCanvas.width = cacheCanvas.width = mWidth = width;
    mCanvas.height = cacheCanvas.height = mHeight = height;
}

function drawImage(img, x, y, w, h){
    if(typeof img === 'undefined' || img === null){
        throw ReferenceError('img is not defined');
    }

    x = Math.ceil(x);
    y = Math.ceil(y);
    w = Math.ceil(w);
    h = Math.ceil(h);

    cacheContext.drawImage(img, x, y, w, h);
}

function copyCache(){
    mContext.drawImage(cacheCanvas, 0, 0, mWidth, mHeight);
}

function getContext(){
    return cacheContext;
}

function addEventListener(eventName, fn){
    mCanvas.addEventListener(eventName, fn)
}

function removeEventListener(eventName, fn){
    mCanvas.removeEventListener(eventName, fn)
}

module.exports = {
    onInit : onInit,
    drawImage : drawImage,
    copyCache : copyCache,
    getContext : getContext,
    addEventListener : addEventListener,
    removeEventListener : removeEventListener
};