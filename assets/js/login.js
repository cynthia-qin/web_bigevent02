$(function () {
    //点击去注册按钮，显示注册盒子隐藏登录盒子
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    //点击去登录，显示登录盒子，隐藏注册盒子
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    //调用layui得form属性
    const form = layui.form;
    const layer = layui.layer;
    //自定义正则
    form.verify({
        //校验密码得正则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //校验两次密码是否一致得正则
        repwd: (val) => {
            const pwd = $("#form_reg [name=password]").val();
            if (val !== pwd) return "两次密码不一致";
        }
    });
    //
    // const baseUrl = "http://www.liulongbin.top:3007";
    $("#form_reg").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: res => {
                if (res.status !== 0) return layer.msg("注册失败");
                layer.msg("注册成功");
                // console.log($(e.target)[0]);
                $(e.target)[0].reset();
                $("#link_login").click();
            }
        })
    });
    $("#form_login").on("submit", function (e) {
        //阻止表单默认事件
        e.preventDefault();
        //发起请求
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg("登录失败");
                layer.msg("登录成功");
                console.log(res);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
});
