(function(){let backtop=`
        <ul>
            <li class="kefu"><a href="javascript:void(0)" style="cursor:hand" target="_blank"><span class="glyphicon glyphicon-headphones glyphicon-kefu" style="display: inline-block;"></span>  <span class="backShow" style="display: none;">购买咨询</span></a></li>
            <li><a href="http://www.4008800016.com:84/MTalk/talk/visitor/dialog?config_id=1&amp;come=KONKAGUANWANG"><span class="glyphicon glyphicon-wrench iconfont icon-banshou" style="display: inline-block;"></span> <span class="backShow" style="display: none;">售后服务</span></a></li>
            <li><a href="/cart.html"><span class="glyphicon glyphicon-shopping-cart iconfont icon-gouwuche" style="display: inline-block;"></span> <span class="backShow" style="display: none;">购物车</span></a></li>
            <li id="the-top"><a href="javascript:;"><span class="glyphicon glyphicon-plane iconfont icon-zhifeiji" style="display: inline-block;"></span> <span class="backShow" style="display: none;">回到顶部</span></a></li>
        </ul>
`
$("<div class='back-top'></div>").html(backtop).appendTo("body")
$(window).scroll(()=>{
    if($(window).scrollTop()>=800){
        $("#the-top").css("display","block")
    }else{
        $("#the-top").css("display","none")
    }
})
$("#the-top").click(()=>{
    $(window).scrollTop(0)
})


})()