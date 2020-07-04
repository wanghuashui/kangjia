(function () {
    let topbar = `
<div class="site-topbar">
    <div class="site-topbar-container">
        <div class="topbar-nav">
            <a href="" title="康佳新闻">康佳新闻</a>
            <span class="sep">|</span>
            <a href="" title="加入康佳">加入康佳</a>
            <span class="sep">|</span>
            <a href="" title="校园招聘">校园招聘</a>
            <span class="sep">|</span>
            <a href="" title="康佳社区">康佳社区</a>
            <span class="sep">|</span>
            <a href="" title="大宗采购">大宗采购</a>
            <span class="sep">|</span>
            <a href="" title="积分商城">积分商城</a>
            <span class="sep">|</span>
        </div>
        <div class="topbar-cart">
            <a href="./cart.html" class="iconImg">
            <img class="top-header-cart" src="https://www.konka.com/themes/pc/konka/images/top-header-cart.png?vf06b">
                购物车(<span class="cart-num">0</span>)
                <span class="sp-num" style="display:none"></span>
            </a>
        </div>
        <div class="topbar-info">
            <span class="spanLine"></span>
            <a href="javascript:;" class="member-btn" id="dLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <a href="./login.html" class="signin-btn" style="">登录</a>
            <span class=" sep ">|</span>
            <a href="./register.html" class="signup-btn" style="">注册</a>
            <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li><a href="javascript:void(0)">个人中心</a></li>
                <li><a href="javascript:void(0)">我的订单</a></li>
                <li><a href="javascript:void(0)">退出登录</a></li>
            </ul>
        </div>
    </div>
</div>`
    let headerBefore = `<div class="site-header" id="nav-top">
                    <div class="container-fluid">
                        <div class="row">`
    $.ajax({
        url: "../json/nav.json",
        dataType: "json",
    }).done((data) => {
        let rowhtml = ""
        data.map(item => {
            rowhtml += `<div class="col-xs-1"><a href="./list.html">${item.name}</a>`
            if (item.data.length != 0) {
                let colitem = item.data.map(item => `<div class="col-xs-2">
                                                                        <div class="figure">
                                                                            <a href="./item.html?id=${item.id}" title="">
                                                                                <img src=${item.src}>
                                                                            </a>
                                                                        </div>
                                                                        <h4 class="text-uppercase ellipsis">${item.goodsName}</h4>
                                                                        <div class="figure-title ellipsis">${item.desc}</div>
                                                                        <p>￥${item.price}</p>
                                                                    </div>`).join("")
                rowhtml += `<div class="item"><div class="item-children"><div class="container-fluid">` + colitem + "</div></div></div></div>"
            } else {
                rowhtml += "</div>"
            }
        })
        $(".row").eq(0).html(`<div class="col-xs-2 logoImg"><a href="./index.html"><img src="https://www.konka.com/themes/pc/konka/images/logo.png?v9f33"></a></div>` + rowhtml + `<span class="spanLine"></span>`)
    })
    let headerAfter = `</div>
                <div class="row search">
                        <div class="search-wrapper">
                            <button class="search-search">
                                <img src="https://www.konka.com/themes/pc/konka/images/header-scrae.png?v9f33">
                            </button>
                            <input type="text" name="keyword" class="inputSearch" placeholder="您喜欢的商品" autocomplete="off">
                            <button class="search-close">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span class="glyphicon glyphicon-menu-left"></span>
                            </button>
                        </div>
                        <aside class="search-content">
                            <section class="search-con-frame">
                                <ul id="animateUl">
                                    <li><a href="javascript:;">电视</a></li>
                                    <li><a href="javascript:;">冰箱</a></li>
                                    <li><a href="javascript:;">洗衣机</a></li>
                                    <li><a href="javascript:;">新飞</a></li>
                                    <li><a href="javascript:;">KKTV</a></li>
                                    <li><a href="javascript:;">A10</a></li>
                                    <li><a href="javascript:;">养生壶</a></li>
                                </ul>
                            </section>
                        </aside>
                </div>
            </div>
        </div>`
    $("<div class='site-header-relative'></div>").html(topbar + headerBefore + headerAfter).appendTo("body")
    $(".site-header").on("mouseenter", ".col-xs-1", function () {
        $(this).children(".item").addClass("item-show").siblings().children(".item").removeClass("item-show")
    })
    $(".site-header").on("mouseleave", ".col-xs-1", function () {
        $(this).children(".item").removeClass("item-show")
    })
    $(window).scroll(() => {
        if ($(window).scrollTop() >= 40) {
            $(".site-header").addClass("site-header-fixed")
        } else {
            $(".site-header").removeClass("site-header-fixed")
        }
    })
    let user = localStorage.getItem("username") || ""
    if (user != "") {
        $(".topbar-info .member-btn").html(user).next().css("display", "none").next().css("display", "none").next().css("display", "none")
    } else {
        $(".topbar-info .member-btn").css("display", "none")
    }
    getCartNum()
    $(".topbar-info .member-btn").click(function () {
        $(".dropdown-menu").toggle()
    })
    $(".dropdown-menu").children().eq(2).click(function () {
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        location.reload()
    })
})()
function getCartNum() {
    let userid = localStorage.getItem("userid") || ""
    let sum = 0
    if (userid != "") {
        $.ajax({
            url: "../server/getCart.php",
            dataType: "json",
            data: {
                id: userid
            }
        }).done(data => {
            data.forEach(item => {
                sum += parseInt(item.num)
            })
            $(".cart-num").html(sum)
            localStorage.setItem("num",sum)
        })
    }
}