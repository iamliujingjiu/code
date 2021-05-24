//背景
const baseImage = Object.create(null);
baseImage.onInit = function(imagePath, success){
    this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
        success && success();
    }
    this.image.src = imagePath;
}
baseImage.getWidth = function(){
    return this.width;
}
baseImage.getHeight = function(){
    return this.height;
}
baseImage.onDraw = function(context, x, y){
    if(context && context.drawImage){
        context.drawImage(this.image, x || 0, y || 0, this.width, this.height);
    }else{
        throw TypeError('context is null or undefined.');
    }
}
module.exports = baseImage;
