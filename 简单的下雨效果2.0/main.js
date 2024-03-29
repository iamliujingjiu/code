let clientWidth;
let clientHeight;
window.onload = function onload(){
    let rain = document.getElementById('rain');
    clientWidth = document.body.clientWidth;
    clientHeight = document.body.clientHeight;
    
    function dorpRain(){
        setTimeout(() => {
            if(typeof clientWidth !== 'undefined' && null !== clientWidth){
                let el = document.createElement('div');
                el.setAttribute('class', 'raindrop');
                let left = parseInt(Math.random() * clientWidth, 10) + 'px';
                el.style.left = left;
                rain.appendChild(el);

                let time = parseInt(Math.random() * 350, 10);

                setTimeout(() => {
                    rain.removeChild(el);

                    let newEl = document.createElement('div');
                    newEl.setAttribute('class', 'ripple');
                    newEl.style.left = left;
                    newEl.style.top = parseInt(clientHeight / 100 * 50 + (time / 350 * (clientHeight / 100 * 50)), 10) + 'px';
                    rain.appendChild(newEl);

                    setTimeout(() => {
                        rain.removeChild(newEl);
                    }, 600)
                }, 400 + time, 10)
            }

            dorpRain();
        }, parseInt(10 + Math.random() * 10, 10)) 
    }
    dorpRain();
}

function debounce(fn, wait, context){
    let timer = null;
    return function(){
        timer ? clearTimeout(timer) : '';
        timer = setTimeout(() => {
            fn.apply(context, arguments);
        }, wait)
    }
}

function onresize(event){
    clientWidth = document.body.clientWidth;
    clientHeight = document.body.clientHeight;
}

window.addEventListener("resize", debounce(onresize, 200, null));