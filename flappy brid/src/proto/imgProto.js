const imgProto = Object.create(null);
imgProto.onInit = function(imagePath){
    let promise = new Promise((resolve, reject) => {
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            resolve && resolve(this);
        }
        this.image.onerror = (e) => {
            reject && reject(e);
        }
        this.image.src = imagePath;
    })
    return promise;
    
}
imgProto.getWidth = function(){
    return this.width;
}
imgProto.getHeight = function(){
    return this.height;
}
imgProto.getX = function(){
    return this.x;
}
imgProto.getY = function(){
    return this.y;
}
imgProto.setX = function(x){
    this.x = x;
}
imgProto.setY = function(y){
    this.y = y;
}
imgProto.onDraw = function(context){
    if(context && context.drawImage){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }else{
        throw TypeError('context is null or undefined.');
    }
}
module.exports = imgProto;
