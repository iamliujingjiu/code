class BaseImg extends Object{
    #X = 0;
    #Y = 0;
    #W = 0;
    #H = 0;
    #IMG = 0;
    constructor(imgPath){
        super();

        this.#IMG = new Image();
        this.#IMG.onload = () => {
            this.#W = this.#IMG.width;
            this.#H = this.#IMG.height;
        }
        this.#IMG.onerror = (e) => {
            throw Error('img onerror');
        }
        this.#IMG.src = imgPath;
    }

    getX(){
        return this.#X;
    }

    setX(x){
        this.#X = x;
    }

    getY(){
        return this.#Y;
    }

    setY(y){
        this.#Y = y;
    }

    getW(){
        return this.#W;
    }
    
    setW(w){
        this.#W = w;
    }

    getH(){
        return this.#H;
    }

    setH(h){
        this.#H = h;
    }

    getImg(){
        return this.#IMG;
    }

    setImg(img){
        this.#IMG = img;
    }
}

module.exports = BaseImg;