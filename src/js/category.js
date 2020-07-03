(function () {
    $.ajax({
        url: "../json/category.json",
        dataType: "json"
    }).done((data) => {
        let cate1 = ""
        data.map((item) => {
            cate1 += `<li class="category-item">
            <a href="./list.html" class="title">${item.title}<i>&gt;</i></a>
            <div class="children clearfix">
                <div class="children-wrapper">
                    <ul class="children-list clearfix">`
                + item.data.map(item3 => `<li>
                            <a href="./list.html" class="link">
                                <img src=${item3.src} alt="">
                                <span>${item3.title}</span>
                            </a>
                        </li>`).join("") +
                `
                    </ul>
                </div>
            </div>
        </li>`
        })
        $("<ul class='site-category-list'></ul>").html(cate1).appendTo(".category-wrapper")
    })
    $(".category-wrapper").on("mouseenter", ".category-item", function () {
        $(this).addClass("category-item-active").siblings().removeClass("category-item-active")
    })
    $(".category-wrapper").on("mouseleave", function () {
        $(this).find(".category-item").removeClass("category-item-active")
    })
})()