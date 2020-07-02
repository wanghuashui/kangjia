$(() => {
    $.ajax({
        url: "../server/list.php",
        dataType: "json"
    }).done(data => {
        // 渲染全部商品列表
        let html = ""
        for (let i = 0; i < data.length && i <= 23; i++) {
            html += `<div class="goods-list-item" data-id="${data[i].id}">
                <div class="figure">
                        <img class="layz" alt="${data[i].goodsname}" src=${data[i].src} style="display: inline;">
                </div>
                <h4 class="text-uppercase figure-title">${data[i].goodsname}</h4>
                <div class="figure-title figureColor">${data[i].desc}</div>
                <p class="price">￥${data[i].price}</p>
                <div class="wrapper">
                    <a href="javascipt:void(0)" type="button" class="btn btn-default">加入购物车</a>
                    <a href="javascipt:void(0)" type="button" class="btn btn-danger">立即购买</a>
                </div>
            </div>`
        }
        $(".goods-list-all").html(html)
        // 渲染分类商品列表
        let newdata = dataTool(data)
        newdata.forEach((item, idx) => {
            let html = ""
            for (let i = 0; i < item.goods.length && i <= 23; i++) {
                html += `<div class="goods-list-item" data-id="${item.goods[i].id}">
                    <div class="figure">
                            <img class="layz" alt="${item.goods[i].goodsname}" src=${item.goods[i].src} style="display: inline;">
                    </div>
                    <h4 class="text-uppercase figure-title">${item.goods[i].goodsname}</h4>
                    <div class="figure-title figureColor">${item.goods[i].desc}</div>
                    <p class="price">￥${item.goods[i].price}</p>
                    <div class="wrapper">
                        <div class="btn btn-default">加入购物车</div>
                        <div type="button" class="btn btn-danger">立即购买</div>
                    </div>
                </div>`
            }
            $(".goods-list").eq(idx + 1).html(html)
        })
    })
    $("dt").click(function () {
        $(".list-inline li,dt").css({
            background: "#fff",
            borderBottom: "1px solid #fff"
        })
        $(this).css({
            background: "#eee",
            borderBottom: "1px solid #e0e0e0"
        })
        $(".goods-list").css("display", "none")
        $(".goods-list").eq(0).css("display", "block")
    })
    $(".list-inline li").click(function () {
        $(".list-inline li,dt").css({
            background: "#fff",
            borderBottom: "1px solid #fff"
        })
        $(this).css({
            background: "#eee",
            borderBottom: "1px solid #e0e0e0"
        })
        let idx = $(this).index()
        $(".goods-list").css("display", "none")
        $(".goods-list").eq(idx + 1).css("display", "block")
    })
    // 给商品添加跳转详情页
    $(".goods-list").on("click", ".goods-list-item", function () {
        location.href = `./item.html?id=${$(this).data("id")}`
    })
    $(".goods-list").on("mouseenter", ".goods-list-item", function () {
        $(this).find(".price").stop().fadeOut()
        $(this).find(".wrapper").stop().fadeIn()
    })
    $(".goods-list").on("mouseleave", ".goods-list-item", function () {
        $(this).find(".wrapper").stop().fadeOut()
        $(this).find(".price").stop().fadeIn()
    })
    // 加入购物车表
    $(".goods-list").on("click", ".btn-default", function () {
        if (localStorage.getItem("userid")) {
            $.ajax({
                url: "../server/addcart.php",
                data: {
                    goodsid: $(this).parents(".goods-list-item").data("id"),
                    userid: localStorage.getItem("userid"),
                }
            }).done(data=>{
                alert(data)
            })
        } else {
            alert("请先登录账号")
            location.href = "./login.html"
            return false
        }
    })
    function dataTool(data) {
        let arr = []
        data.forEach(item => {
            let result = arr.filter(ele => ele.goodstype == item.goodstype)
            if (result.length == 0) {
                arr.push({ goodstype: item.goodstype, goods: [] })
            }
        })
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.goodstype == item.goodstype) {
                    ele.goods.push(item)
                }
            })
        })
        return arr
    }
})