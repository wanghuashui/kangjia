"use strict";$("<div class='back-top'></div>").html('\n        <ul>\n            <li class="kefu"><a href="javascript:void(0)" style="cursor:hand" target="_blank"><span class="glyphicon glyphicon-headphones glyphicon-kefu"></span>  <span class="backShow">购买咨询</span></a></li>\n            <li><a href=""><span class="glyphicon glyphicon-wrench iconfont icon-banshou"></span> <span class="backShow">售后服务</span></a></li>\n            <li><a href="./cart.html"><span class="glyphicon glyphicon-shopping-cart iconfont icon-gouwuche"></span> <span class="backShow">购物车</span></a></li>\n            <li id="the-top"><a href="javascript:;"><span class="glyphicon glyphicon-plane iconfont icon-zhifeiji"></span> <span class="backShow">回到顶部</span></a></li>\n        </ul>\n').appendTo("body"),$(window).scroll(function(){800<=$(window).scrollTop()?$("#the-top").css("display","block"):$("#the-top").css("display","none")}),$("#the-top").click(function(){$(window).scrollTop(0)});