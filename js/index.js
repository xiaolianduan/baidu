$(function () {
        var todown=$(".to-down");
        var module=$(".module");
        var ch=document.documentElement.clientHeight;

        var num=0;

        var flag2=true;
        function down() {
            if(flag2){
                flag2=false;
                if(num>=module.length-1){
                    flag2=true;
                    return;
                }
                num++;
                module[0].style.marginTop=-num*ch+"px";
                $(".btn").css("background","").eq(num).css("background","#555")
                $(".lefts").css({
                    transform:"translate(-50px,0)"
                }).eq(num).css({
                    transform:"translate(0,0)"
                });
                $(".rights").css({
                    transform:"translate(50px,0)"
                }).eq(num).css({
                    transform:"translate(0,0)"
                });

                module[0].addEventListener("transitionend",function(){
                    flag2=true;
                })
            }
        }
        function up() {
            if(flag2) {
                flag2=false;
                if (num <=0) {
                    num=0;
                    flag2=true;
                    return;
                }
                num--;
                module[0].style.marginTop = -num * ch + "px";
                $(".btn").css("background", "").eq(num).css("background", "#555")
                $(".lefts").css({
                    transform: "translate(-50px,0)"
                }).eq(num).css({
                    transform: "translate(0,0)"
                });
                $(".rights").css({
                    transform: "translate(50px,0)"
                }).eq(num).css({
                    transform: "translate(0,0)"
                });
                module[0].addEventListener("transitionend",function(){
                    flag2=true;
                })
            }
        }
    
        todown.click(function () {
            down()
        });

//按钮实现

        $(".btn").click(function () {
            var index=$(this).index();
            module[0].style.transition = "all 1s ease";
            module[0].style.marginTop=-index*ch+"px";
            $(".btn").css("background","").eq(index).css("background","#555");
            $(".lefts").css({
                transform:"translate(-50px,0)"
            }).eq(index).css({
                transform:"translate(0,0)"
            });
            $(".rights").css({
                transform:"translate(50px,0)"
            }).eq(index).css({
                transform:"translate(0,0)"
            });
            num=index;
        })


//移动端事件
        var leftInit;
        document.onmousedown=function (e) {
            var ev=e||window.event;
            ev.preventDefault()
            document.onmousemove=function (e) {
                var ev=e||window.event;
                ev.preventDefault()
            }
        };

        touch.on("body","dragstart",function(){
            module[0].style.transition="none";
            leftInit=parseInt(module[0].style.marginTop)?parseInt(module[0].style.marginTop):0;
        });

        touch.on("body","drag",function(e){
            module[0].style.marginTop= leftInit+e.y+"px";
        });

        touch.on("body","dragend",function(e){
            if(e.direction=="up"){
                if(Math.abs(e.y)>100) {
                    num++;
                    if (num >= module.length- 1) {
                        num =module.length- 1;
                    }
                    module[0].style.transition = "all 1s ease";
                    module[0].style.marginTop=-num*ch+"px";
                    $(".lefts").css({
                        transform:"translate(-50px,0)"
                    }).eq(num).css({
                        transform:"translate(0,0)"
                    });
                    $(".rights").css({
                        transform:"translate(50px,0)"
                    }).eq(num).css({
                        transform:"translate(0,0)"
                    });
                    $(".btn").css("background","").eq(num).css("background","#555")
                }else{
                    module[0].style.transition = "all 1s ease";
                    module[0].style.marginTop=-num*ch+"px";
                }
            }else if(e.direction=="down"){
                if(Math.abs(e.y)>100) {
                    num--;
                    if (num ==-1) {
                        num = 0;
                    }
                    module[0].style.transition = "all 3s ease";
                    module[0].style.marginTop=-num*ch+"px";
                    $(".lefts").css({
                        transform:"translate(-50px,0)"
                    }).eq(num).css({
                        transform:"translate(0,0)"
                    });
                    $(".rights").css({
                        transform:"translate(50px,0)"
                    }).eq(num).css({
                        transform:"translate(0,0)"
                    });
                    $(".btn").css("background","").eq(num).css("background","#555")
                }else{
                    module[0].style.transition = "all 3s ease";
                    module[0].style.marginTop=-num*ch+"px";
                }
            }
        })


    // 滚轮事件

    var box=document.getElementsByTagName("body")[0];
    mousewheel(down,up,box)

    $(window).keyup(function(e){
        var ev=e||window.event;
        if(ev.keyCode==38) {
            up()
        }
        if(ev.keyCode==40){
            down()
        }
    });


    //响应式自动
    $(window).resize(function () {
        var ch=document.documentElement.clientHeight;
        module[0].style.marginTop = -num * ch + "px";
    })

});


