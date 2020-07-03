(function () {
    let backtop = `
        <ul>
            <li class="kefu"><a href="javascript:void(0)" style="cursor:hand" target="_blank"><span class="glyphicon glyphicon-headphones glyphicon-kefu"></span>  <span class="backShow">购买咨询</span></a></li>
            <li><a href=""><span class="glyphicon glyphicon-wrench iconfont icon-banshou"></span> <span class="backShow">售后服务</span></a></li>
            <li><a href="./cart.html"><span class="glyphicon glyphicon-shopping-cart iconfont icon-gouwuche"></span> <span class="backShow">购物车</span></a></li>
            <li id="the-top"><a href="javascript:;"><span class="glyphicon glyphicon-plane iconfont icon-zhifeiji"></span> <span class="backShow">回到顶部</span></a></li>
        </ul>
`
    $("<div class='back-top'></div>").html(backtop).appendTo("body")
    $(window).scroll(() => {
        if ($(window).scrollTop() >= 800) {
            $("#the-top").css("display", "block")
        } else {
            $("#the-top").css("display", "none")
        }
    })
    $("#the-top").click(() => {
        $(window).scrollTop(0)
    })
    $(".back-top li").on("mouseenter",function(){
        $(this).children("a").css("display","none")
    })
})()