
const BaseImg = require("../base/BaseImg");
const gameOverFilePath = './assets/text_game_over.png';

class GameOverImg extends BaseImg{

    constructor(){
        super(gameOverFilePath);
    }
}

module.exports = GameOverImg;