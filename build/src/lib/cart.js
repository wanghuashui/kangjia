"use strict";$(function(){if(""!=(localStorage.getItem("userid")||"")&&0!=localStorage.getItem("num")){var c=function(){var e=0,a=0;Array.from($(".selected").parent()).forEach(function(t){e+=1*(1*$(t).find(".cart-item-amount p").html().slice(1)).toFixed(2),a+=1*$(t).find(".cart-item-num").val()}),$(".finally_cart_amount").html("￥"+e.toFixed(2)),$(".goods_count").html(a)};$(".main-container").html("");$('<div class="cart-header clearfix">\n                        <div class="cart-check">\n                            <input type="checkbox" checked="true"> 全选\n                        </div>\n                        <div class="cart-title">商品</div>\n                        <div class="cart-price">单价</div>\n                        <div class="cart-quantity">数量</div>\n                        <div class="cart-amount">小计</div>\n                        <div class="cart-opt">操作</div>\n                    </div><div class="cart-body"></div>').appendTo(".main-container");$('<div class="cart-footer clearfix">\n                        <div class="cart-check">\n                            <input type="checkbox" checked="true"> 全选\n                        </div>\n                        <div class="cart-check-opt">\n                            <a href="javascript:;" >删除选中</a>\n                        </div>\n\n                        <div class="cart-all-amount text-right">\n                            <div class="list-unstyled">\n                                <p>\n                                    已选择<span class="goods_count">1</span>件商品,优惠后金额：\n                                    <small class="text-danger"></small><strong class="text-danger finally_cart_amount"\n                                        style="color:#ed1c24;">￥1279.00</strong></p>\n                            </div>\n                        </div>\n                        <div class="cart-all-opt"><a href="javascript:;">去结算</a>\n                        </div>\n                    </div>').appendTo(".main-container"),$.ajax({url:"../server/userCart.php",data:"userid="+localStorage.getItem("userid"),dataType:"json"}).done(function(t){var e=t.map(function(t){return'<div class="cart-item clearfix" data-cartid='+t.cartid+'>\n                                                <div data-object="goods" class="cart-item-check selected">\n                                                    <input type="checkbox" checked="true">\n                                                </div>\n                                                <div class="cart-item-info">\n                                                    <div class="row">\n                                                        <div class="cart-item-img">\n                                                            <a href="/43U5W.html">\n                                                                <img class="img-thumbnail"\n                                                                    src="'+t.src+'"\n                                                                    alt="'+t.goodsname+'">\n                                                            </a>\n                                                        </div>\n                                                        <div class="cart-item-title">\n                                                            <p class="brief">'+t.desc+'</p>\n                                                            <h5><a href="">'+t.goodsname+'</a></h5>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class="cart-item-price">￥'+t.price+'</div>\n                                                <div class="cart-item-quantity">\n                                                    <button type="button" class="numbtn">\n                                                        -\n                                                    </button>\n                                                    <input type="text" disabled="disabled"  class="cart-item-num" value="'+t.num+'"\n                                                        data-now="1">\n                                                    <button type="button" class="numbtn">\n                                                        +\n                                                    </button>\n                                                </div>\n                                                <div class="cart-item-amount">\n                                                    <p data-bind="amount">￥'+(1*t.price*t.num).toFixed(2)+'</p>\n                                                </div>\n                                                <div class="cart-item-opt">\n                                                    <a href="javascript:void(0);" class="deletebtn">删除</a>\n                                                </div>\n                                            </div>\n                                '}).join("");$(e).appendTo($(".cart-body")),c()}),$(".cart-check").click(function(){$(this).children().is(":checked")?($(".cart-check").children().prop("checked",!0),$(".cart-item-check").addClass("selected"),$(".cart-item-check").children().prop("checked",!0)):$(".cart-check").children().prop("checked",!1),c()}),$(".cart-body").on("click",".cart-item-check",function(){if($(this).children().is(":checked")){$(this).addClass("selected");for(var t=0;t<$(".cart-item-check").children().length;t++){if(!$(".cart-item-check").children().eq(t).is(":checked")){$(".cart-check").children().prop("checked",!1);break}$(".cart-check").children().prop("checked",!0)}}else $(this).removeClass("selected"),$(".cart-check").children().prop("checked",!1);c()}),$(".cart-body").on("click",".numbtn",function(){var a=this,t=1*$(this).siblings("input").val();if(0==$(this).index()){if(1==t)return void alert("商品数量不能小于1");$(this).siblings("input").val(t-1)}else{if(99==t)return void alert("商品数量不能大于99");$(this).siblings("input").val(t+1)}var e={cartid:$(this).parents(".cart-item").data("cartid"),num:$(this).siblings("input").val()};$.ajax({url:"../server/changeCartNum.php",data:e}).done(function(t){var e=(1*$(a).parents(".cart-item").find(".cart-item-price").html().slice(1)).toFixed(2);$(a).parents(".cart-item").find(".cart-item-amount p").html("￥"+(1*$(a).siblings("input").val()*e).toFixed(2))}),c(),getCartNum()}),$(".cart-body").on("click",".deletebtn",function(){var e=this;confirm("确定要删除吗？")&&$.ajax({url:"../server/removeCart.php",data:"cartid="+$(this).parents(".cart-item").data("cartid")}).done(function(t){localStorage.getItem("num")==$(e).parents(".cart-item").find(".cart-item-num").val()?($(e).parents(".cart-item").remove(),c(),getCartNum(),location.reload(!0)):($(e).parents(".cart-item").remove(),c(),getCartNum()),$(".selected").length==$(".cart-item").length&&$(".cart-check").children().prop("checked",!0)})}),$(".cart-check-opt").click(function(){confirm("确定要删除吗？")&&Array.from($(".selected").parent()).forEach(function(e){$.ajax({url:"../server/removeCart.php",data:"cartid="+$(e).data("cartid")}).done(function(t){$(e).remove(),c(),getCartNum(),0==$(".cart-item").length&&location.reload(!0)})})})}});