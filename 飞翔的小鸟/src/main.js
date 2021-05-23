// 入口文件

import '../css/main.css';
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

let bg = require('./background');
window.onload = function main(){
    setTimeout(() => {
        bg.onInit();
        setTimeout(() => {
            console.log(bg.getWidth());
        }, 200)
    }, 200)
}