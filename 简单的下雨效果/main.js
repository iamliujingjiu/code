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
                el.style.left = parseInt(Math.random() * clientWidth, 10) + 'px';
                rain.appendChild(el);
                setTimeout(() => {
                    rain.removeChild(el);
                }, parseInt(400 + Math.random() * 350, 10))
            }

            dorpRain();
        }, parseInt(10 + Math.random() * 10, 10)) 
    }

    function ripple(){
        setTimeout(() => {
            if(typeof clientWidth !== 'undefined' && null !== clientWidth && typeof clientHeight !== 'undefined' && null !== clientHeight){
                let el = document.createElement('div');
                el.setAttribute('class', 'ripple');
                el.style.left = parseInt(Math.random() * clientWidth, 10) + 'px';
                el.style.top = parseInt(clientHeight / 100 * 50 + (Math.random() * (clientHeight / 100 * 50)), 10) + 'px';
                rain.appendChild(el);
                setTimeout(() => {
                    rain.removeChild(el);
                }, 600)
            }

            ripple();
        }, parseInt(10 + Math.random() * 10, 10)) 
    }

    dorpRain();
    ripple();
}


window.onresize = function onresize(){
    let clientWidth = document.body.clientWidth;
    let clientHeight = document.body.clientHeight;
}