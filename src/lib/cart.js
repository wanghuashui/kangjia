$(() => {
    let userid = localStorage.getItem("userid") || ""
    if (userid != "" && localStorage.getItem("num") != 0) {
        $(".main-container").html("")
        let carthd = `<div class="cart-header clearfix">
                        <div class="cart-check">
                            <input type="checkbox" checked="true"> 全选
                        </div>
                        <div class="cart-title">商品</div>
                        <div class="cart-price">单价</div>
                        <div class="cart-quantity">数量</div>
                        <div class="cart-amount">小计</div>
                        <div class="cart-opt">操作</div>
                    </div><div class="cart-body"></div>`
        $(carthd).appendTo(".main-container")
        let cartfoo = `<div class="cart-footer clearfix">
                        <div class="cart-check">
                            <input type="checkbox" checked="true"> 全选
                        </div>
                        <div class="cart-check-opt">
                            <a href="javascript:;" >删除选中</a>
                        </div>

                        <div class="cart-all-amount text-right">
                            <div class="list-unstyled">
                                <p>
                                    已选择<span class="goods_count">1</span>件商品,优惠后金额：
                                    <small class="text-danger"></small><strong class="text-danger finally_cart_amount"
                                        style="color:#ed1c24;">￥1279.00</strong></p>
                            </div>
                        </div>
                        <div class="cart-all-opt"><a href="javascript:;">去结算</a>
                        </div>
                    </div>`
        $(cartfoo).appendTo(".main-container")
        $.ajax({
            url: "../server/userCart.php",
            data: "userid=" + localStorage.getItem("userid"),
            dataType: "json"
        }).done(data => {
            let cartbody = data.map(item => `<div class="cart-item clearfix" data-cartid=${item.cartid}>
                                                <div data-object="goods" class="cart-item-check selected">
                                                    <input type="checkbox" checked="true">
                                                </div>
                                                <div class="cart-item-info">
                                                    <div class="row">
                                                        <div class="cart-item-img">
                                                            <a href="/43U5W.html">
                                                                <img class="img-thumbnail"
                                                                    src="${item.src}"
                                                                    alt="${item.goodsname}">
                                                            </a>
                                                        </div>
                                                        <div class="cart-item-title">
                                                            <p class="brief">${item.desc}</p>
                                                            <h5><a href="">${item.goodsname}</a></h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="cart-item-price">￥${item.price}</div>
                                                <div class="cart-item-quantity">
                                                    <button type="button" class="numbtn">
                                                        -
                                                    </button>
                                                    <input type="text" disabled="disabled"  class="cart-item-num" value="${item.num}"
                                                        data-now="1">
                                                    <button type="button" class="numbtn">
                                                        +
                                                    </button>
                                                </div>
                                                <div class="cart-item-amount">
                                                    <p data-bind="amount">￥${(item.price * 1 * item.num).toFixed(2)}</p>
                                                </div>
                                                <div class="cart-item-opt">
                                                    <a href="javascript:void(0);" class="deletebtn">删除</a>
                                                </div>
                                            </div>
                                `).join("")
            $(cartbody).appendTo($(".cart-body"))
            allTotal()
        })

        // 全选
        $(".cart-check").click(function () {
            if ($(this).children().is(":checked")) {

                $(".cart-check").children().prop("checked", true)
                $(".cart-item-check").addClass("selected")
                $(".cart-item-check").children().prop("checked", true)
            } else {
                $(".cart-check").children().prop("checked", false)
            }
            allTotal()
        })
        $(".cart-body").on("click", ".cart-item-check", function () {
            if ($(this).children().is(":checked")) {
                $(this).addClass("selected")
                for (let i = 0; i < $(".cart-item-check").children().length; i++) {
                    if (!$(".cart-item-check").children().eq(i).is(":checked")) {
                        $(".cart-check").children().prop("checked", false)
                        break
                    } else {
                        $(".cart-check").children().prop("checked", true);
                    }
                }
            } else {
                $(this).removeClass("selected")
                $(".cart-check").children().prop("checked", false)
            }
            allTotal()
        })

        //根据复选框算总计 
        function allTotal() {
            let total = 0
            let allnum=0
            Array.from($(".selected").parent()).forEach(item => {
                total += ($(item).find(".cart-item-amount p").html().slice(1) * 1).toFixed(2) * 1
                allnum+=$(item).find(".cart-item-num").val()*1
            })
            $(".finally_cart_amount").html("￥" + (total).toFixed(2))
            $(".goods_count").html(allnum)
        }
        // 按钮控制数量
        $(".cart-body").on("click", ".numbtn", function () {
            let num = $(this).siblings("input").val() * 1
            if ($(this).index() == 0) {
                if (num == 1) {
                    alert("商品数量不能小于1")
                    return
                }
                $(this).siblings("input").val(num - 1)

            } else {
                if (num == 99) {
                    alert("商品数量不能大于99")
                    return
                }
                $(this).siblings("input").val(num + 1)
            }
            let data = {
                cartid: $(this).parents(".cart-item").data("cartid"),
                num: $(this).siblings("input").val()
            }
            $.ajax({
                url: "../server/changeCartNum.php",
                data: data,
            }).done((data) => {
            })
            let price = ($(this).parents(".cart-item").find(".cart-item-price").html().slice(1) * 1).toFixed(2)
            $(this).parents(".cart-item").find(".cart-item-amount p").html(`￥${($(this).siblings("input").val() * 1 * price).toFixed(2)}`)
            allTotal()
            getCartNum()
        })
        //删除商品
        $(".cart-body").on("click", ".deletebtn", function () {
            if (confirm("确定要删除吗？")) {
                $.ajax({
                    url: "../server/removeCart.php",
                    data: "cartid=" + $(this).parents(".cart-item").data("cartid")
                }).done(data => {
                    if (localStorage.getItem("num") == $(this).parents(".cart-item").find(".cart-item-num").val()) {
                        $(this).parents(".cart-item").remove()
                        allTotal()
                        getCartNum()
                        location.reload(true)
                    } else {
                        $(this).parents(".cart-item").remove()
                        allTotal()
                        getCartNum()
                    }
                    if($(".selected").length==$(".cart-item").length){
                        $(".cart-check").children().prop("checked", true);
                    }
                })
            }
        })
        // 删除选中
        $(".cart-check-opt").click(function () {
            if (confirm("确定要删除吗？")) {
                let arr = Array.from($(".selected").parent())
                arr.forEach(item => {
                    $.ajax({
                        url: "../server/removeCart.php",
                        data: "cartid=" + $(item).data("cartid")
                    }).done(data => {
                        $(item).remove()
                        allTotal()
                        getCartNum()
                        if ($(".cart-item").length == 0) {
                            location.reload(true)
                        }
                    })
                })
            }
        })
    }
})