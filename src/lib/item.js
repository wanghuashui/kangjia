$(() => {
    $.ajax({
        url: "../server/item.php",
        data: { id: location.href.split("=")[1] },
        dataType: "json"
    }).done(data => {
        let html = ""
        html = `<ul class="breadcrumb">
                <li>${data[0].goodstype}></li>
                <li class="active">${data[0].goodsname}</li>
            </ul>
            <div class="product-page">
                <div class="row clearfix">
                    <div class="product-show">
                        <div class="product-main-image">
                            <a href="" class="imgshow"><img src=${data[0].src} alt=""></a>
                            <div id="bigMirror"></div>
                            <img class="zoomImg" style="background-image: url(${data[0].src});" >
                        </div>
                        <div class="updown">
                            <i></i>
                            <ul>
                                <li><img src=${data[0].src} alt=""></li>
                            </ul>
                            <i></i>
                        </div>
                    </div>
                    <div class="product-buy">
                        <h3>${data[0].goodsname}</h3>
                        <div>${data[0].desc}</div>
                        <div class="pricebox">
                            <strong class="price">￥${data[0].price}</strong>
                        </div>
                        <div class="addressWrap">配送地址:&nbsp;<input type="text" placeholder="写了也没用"></div>
                        <div class="product-page-cart">
                            <div class="product-quantity input-group" data-minibuy="">
                                <dl class="dl-horizontal">
                                    <dt>数量</dt>
                                </dl>
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn btn-default">-</button>
                                </div>
                                <input type="text" class="spinner-input" id="numBer" data-id="${data[0].id}" value="1">
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn btn-default">+</button>
                                </div>
                            </div>
                            <div class="row">
                                <a class="btn btn-danger favorite btn-buy distanceRight" href="">立即购买</a>
                                <a class="btn btn-warning favorite distanceRight" href="javascript:viod(0)">加入购物车</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        $(".product-container").html(html)
    })

    $(".product-container").on("click", ".btn-warning", function () {
        if (localStorage.getItem("userid")) {
            $.ajax({
                url: "../server/addcart.php",
                data: {
                    goodsid: $("#numBer").data("id"),
                    userid: localStorage.getItem("userid"),
                    num: $("#numBer").val()
                }
            }).done(data => {
                alert(data)
                getCartNum()
            })
        } else {
            alert("请先登录账号")
            location.href = "./login.html"
            return false
        }
    })
    $(".product-container").on("mouseenter", ".product-main-image", function () {
        $("#bigMirror").css({ display: "block" })
        $(this).mousemove(function (e) {

            let left1 = e.pageX - $(this).offset().left - $("#bigMirror").width() / 2
            let top1 = e.pageY - $(this).offset().top - $("#bigMirror").width() / 2
            // 边界限制
            if (left1 <= 0) {
                left1 = 0
            } else if (left1 + $("#bigMirror").width() >= $(this).width()) {
                left1 = $(this).width() - $("#bigMirror").width()
            }
            if (top1 <= 0) {
                top1 = 0
            } else if (top1 + $("#bigMirror").height() >= $(this).height()) {
                top1 = $(this).height() - $("#bigMirror").height()
            }
            $("#bigMirror").css({ display: "block", left: `${left1}px`, top: `${top1}px` })
            $(".zoomImg").css({
                display: "block", backgroundPosition: `${-left1 * 2}px ${-top1 * 2}px`
            })
        })
    })
    $(".product-container").on("mouseleave", ".product-main-image", function () {
        $("#bigMirror").css("display","none")
            $(".zoomImg").css("display","none")
    })
})