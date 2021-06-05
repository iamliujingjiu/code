const BaseImg = require("../base/BaseImg");
const pipeFilePathList = ['./assets/pipe_down.png', './assets/pipe2_down.png'];
class PipeImg extends BaseImg{
    #canvas;
    constructor(){
        const random = Math.floor(Math.random() * 2);
        super(pipeFilePathList[random]);
    }

    getPipeDownImg(){
        return super.getImg();
    }

    getPipeUpImg(){
        if(typeof this.#canvas === 'undefined' || this.#canvas === null){
            this.#canvas = document.createElement('canvas');
            let context = this.#canvas.getContext('2d');
            let pipeWidth = super.getW();
            let pipeHeight = super.getH();
            this.#canvas.width = pipeWidth;
            this.#canvas.height = pipeHeight;
            context.translate(pipeWidth / 2, pipeHeight / 2);
            context.rotate(Math.PI);
            context.translate(pipeWidth / -2, pipeHeight / -2);
            context.drawImage(super.getImg(), super.getX(), super.getY(), pipeWidth, pipeHeight);
        }
        return this.#canvas;
    }
}

module.exports = PipeImg;