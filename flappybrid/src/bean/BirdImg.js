const BaseImg = require("../base/BaseImg");
class BirdImg extends BaseImg{
    constructor(birdFilePath){
        super(birdFilePath);
    }

    /**
     * 
     * @param {*} angle
     * @returns 
     */
    getImg(angle){
        if(typeof angle === 'undefined' || angle === null){
            angle = 0;
        }
        let img = super.getImg();
        let _canvas = document.createElement('canvas');
        let _context = _canvas.getContext('2d');
        let birdWidth = super.getW();
        let birdHeight = super.getH();
        
        _canvas.width = birdWidth;
        _canvas.height = birdHeight;
        _context.translate(birdWidth / 2, birdHeight / 2);
        _context.rotate(angle * Math.PI);
        _context.translate(birdWidth / -2, birdHeight / -2);
        _context.drawImage(img, 0, 0, birdWidth, birdHeight);
        return _canvas;
    }
}

module.exports = BirdImg;