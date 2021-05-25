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

module.exports = imgProto;
