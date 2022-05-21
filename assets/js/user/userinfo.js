$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    });


    //发起请求获取用户信息
    const initUserinfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg("获取用户信息失败");
                // console.log(res);
                form.val("formUserinfo",res.data);
            }
        })
    };
    initUserinfo();

    //点击重置按钮，重置昵称和邮箱，用户名不变
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserinfo();
    });

    //监听表达提交事件，发起请求，修改信息并重新渲染
    $(".layui-form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(".layui-form").serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('更改用户信息失败');
                layer.msg('更改用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })
})