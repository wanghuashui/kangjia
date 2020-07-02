$(() => {
    // 轮播图
    let a = new Slider($(".banner-con"), ["https://www.konka.com/public/images/cd/46/1c/569d7a3856d57202db68e975ae3a4fa069cdeed4.jpg?63433_OW1920_OH500", "https://www.konka.com/public/images/72/b5/ed/b12a8ac6bd8562d386ca7adbdca8c61b8c892d23.jpg?66976_OW1920_OH500", "https://www.konka.com/public/images/86/1f/f6/1ba37ca7414b7ac09b579d17308139f5cf146dbf.jpg?12684_OW1920_OH500", "https://www.konka.com/public/images/6f/53/12/4c4b4c5ed8afdcda6d9946f4a29f658afc644f0a.jpg?00122_OW1920_OH500"])
    a.init()
    // homesell切换
    $(".arr-left").click(function () {
        $(".star-row").animate({ left: "0px" }, 300)
    })
    $(".arr-right").click(function () {
        $(".star-row").animate({ left: "-1140px" }, 300)
    })
    // floor渲染
    $.ajax({
        url: "../json/floor.json",
        dataType: "json",
    }).done(data => {
        let floorHtml = ""
        data.map(item => {
            floorHtml += ` <div class="television clearfix" id="${item.type}">
        <div class="cate-top">
            <h3>
                <img src="${item.icon}" alt="">
                <a href="" title="${item.title}">${item.title}</a>
            </h3>
            <div class="more">
                <div class="more-ul">`+ item.ul.map(item => `<li>
                        <a href="" title="${item}">${item}</a>
                        <span>&nbsp;</span>
                    </li>`).join("") + `</div>
            </div>
        </div>
        <div class="carousel">
            <div class="container-fluid">
                <div class="item">
                    <a href="">
                        <img class="layz banW" src="${item.src}" alt="">
                    </a>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">`+ item.data.map(item => `
                <div class="col-xs-3">
                    <div class="figure">
                        <a href="" title="${item.title}"><img class="layz" src="${item.src}" alt=""></a>
                        <h4 class="text-uppercase ellipsis">${item.title}</h4>
                        <div class="figure-title ellipsis">${item.desc}</div>
                        <p class="price">${item.price}
                            <span class="del">${item.del}</span>
                        </p>
                    </div>
                </div>`).join("") +
                `</div>
        </div>
    </div>`
        });
        $("#comment .container").html(floorHtml)
    })
    //锚点滚动
    $(window).scroll(() => {
        if ($(window).scrollTop() >= 700) {
            $(".anchor").fadeIn(500)
        } else {
            $(".anchor").fadeOut(500)
        }
    })
    $('.anchor ul li a[href^="#"]').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $(this.hash).offset().top - 50 }, 400);
    })
})