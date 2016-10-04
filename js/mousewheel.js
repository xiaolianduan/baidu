function mousewheel(upfn,downfn,obj){
    var obj=obj||document;
    if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);
        obj.addEventListener("DOMMouseScroll",scrollFn,false);
    }

    function scrollFn(e){
        var e=e||window.event
        var num=e.wheelDelta||e.detail;
        var platform=navigator.platform;    //浏览器的所在平台
        if (platform=="MacInter") {
            if(num==-3||num==1){
                upfn()
            }else if(num==3||num==-1){
                downfn()
            }
        }else{
            if(num==-3||num==120){
                upfn()
            }else if(num==3||num==-120){
                downfn()
            }
        }

        if (e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue = false;
        }
    }
}