$(() => {
    $("#userName").val("wx")
    $("#phoneID").val("15959172169")
    $("#passwordA").val("15959172169")
    $("#passwordB").val("15959172169")

    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 4, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 80, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'fill', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        imgCode = r;
        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });
    let options = {
        "userName": {
            reg: "/^[a-zA-Z]{2,6}$/.test(val)"
        },
        "phoneID": {
            reg: "/^1[3-9]\\d{9}$/.test(val)"
        },
        "passwordA": {
            reg: "/^[a-zA-Z0-9]{6,18}$/.test(val)"
        },
        "passwordB": {
            reg: "$('#passwordA').val()==val&&val!=''"
        },
        "imageCode": {
            reg: "val==imgCode"
        }
    }
    $(".info-input input").blur(function () {
        let optionsKey = this.id
        let val = $(this).val()
        if (eval(options[optionsKey].reg)) {
            $(this).addClass("input-true").removeClass("input-error").next().html("√")
            $(this).next().css("color", "green")
        } else {
            $(this).addClass("input-error").removeClass("input-true").next().html("×")
            $(this).next().css("color", "red")
        }
    })
    $("#registerBtn").click(function () {
        $("#phoneID,#userName,#passwordA,#passwordB,#imageCode").trigger("blur");
        if ($(".input-error").length != 0) {
            return
        }
        if (!$("#checkbox").is(":checked")) {
            alert("请阅读并同意用户的注册协议!!!");
            return;
        }
        // 验证通过，发送请求
        $.ajax({
            type: "post",
            url: "../server/register.php",
            dataType: "json",
            data: {
                username: $("#userName").val(),
                phone: $("#phoneID").val(),
                password: md5($("#passwordA").val()).slice(0, 15)
            }
        }).done(data => {
            if (data.status == "success") {
                alert("注册成功，请登录")
                location.href = "./login.html"
            } else {
                alert(data.msg)
            }
        })
    })

































})