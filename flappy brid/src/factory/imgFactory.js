let imgProto = require('../proto/imgProto');

const imgFactory = Object.create(null);
imgFactory.create = function(path){
    let data = Object.create(imgProto);
    data.x = 0;
    data.y = 0;
    data.width = 0;
    data.height = 0;
    data.image = new Image();
    return data.onInit(path);
}

module.exports = imgFactory;