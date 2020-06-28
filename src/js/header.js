let topbar=`
<div class="site-topbar">
    <div class="site-topbar-container">
        <div class="topbar-nav">
            <a href="" title="康佳新闻" rel="nofollow" target="_blank">康佳新闻</a>
            <span class="sep">|</span>
            <a href="" title="加入康佳" rel="nofollow" target="_blank">加入康佳</a>
            <span class="sep">|</span>
            <a href="" title="校园招聘" rel="nofollow" target="_blank">校园招聘</a>
            <span class="sep">|</span>
            <a href="" title="康佳社区" rel="nofollow" target="_blank">康佳社区</a>
            <span class="sep">|</span>
            <a href="" title="大宗采购" rel="nofollow" target="_blank">大宗采购</a>
            <span class="sep">|</span>
            <a href="" title="积分商城" rel="nofollow" target="_blank">积分商城</a>
            <span class="sep">|</span>
        </div>
        <div class="topbar-cart">
            <a href="/cart.html" class="iconImg">
            <img class="top-header-cart" src="https://www.konka.com/themes/pc/konka/images/top-header-cart.png?vf06b">
                购物车(<span class="cart-num">0</span>)
                <span class="sp-num" style="display:none"></span>
            </a>
        </div>
        <div class="topbar-info">
            <span class="spanLine"></span>
            <a href="javascript:;" class="member-btn" id="dLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="display: none"></a>
                <a href="/passport-login.html" class=" signin-btn" style="">登录</a>
                <span class=" sep ">|</span>
                <a href="/passport-signup.html" class=" signup-btn" style="">注册</a>
            <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li><a href="/my.html">个人中心</a></li>
                <li><a href="/my-orders.html">我的订单</a></li>
                <li><a href="/passport-logout.html">退出登录</a></li>
            </ul>
        </div>
    </div>
</div>
`
let headerBefore=`
<div class="site-header" id="nav-top">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-2 logoImg"><a href="/index.html"><img src="https://www.konka.com/themes/pc/konka/images/logo.png?v9f33"></a></div>`

let headerContent
$.ajax({
    url:"../json/nav.json",
    dataType:"json",
})
let headerAfter=`
                    <span class="spanLine"></span>
                     <div class="col-xs-1 "><a href="javascript:;" class="Magnifier iconImg">
    
                         <img src="https://www.konka.com/themes/pc/konka/images/header-scrae.png?v9f33">
                         </a>
                    </div>
                </div>
                <div class="row search">
                    <form action="/list.html">
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
                    </form>
                </div>
            </div>
        </div>`

$("<div class='site-header-relative'></div>").html(topbar+headerBefore+headerAfter).appendTo("body")