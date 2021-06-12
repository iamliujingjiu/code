const createImg = (function(){
    let X, Y, W, H, IMG;
    X = Y = W = H = 0;
    IMG = null;

    return function(imgPath){
        IMG = new Image();
        IMG.onload = () => {
            W = IMG.width;
            H = IMG.height;
        }
        IMG.onerror = (e) => {
            throw Error('img onerror');
        }
        IMG.src = imgPath;

        return function(speedX, speedY){
            X += speedX;
            Y += speedY;
            
            return function(context){
                X = Math.ceil(X);
                Y = Math.ceil(Y);
                W = Math.ceil(W);
                H = Math.ceil(H);
                context.drawImage(IMG, X, Y, W, H);
            }
        }
        
    }
}())


module.exports = createImg;