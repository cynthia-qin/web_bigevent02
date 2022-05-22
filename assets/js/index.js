$(function () {
    getUserInfo();
    //获取layer
    const layer = layui.layer;
    $("#btnLogout").click(() => {
          layer.confirm(
              "确定退出登录？", {
                  icon: 3,
                  title: ""
              },
              function (index) {
                  // 清空本地存储里面的 token
                  localStorage.removeItem("token");
                  // 重新跳转到登录页面
                  location.href = "/login.html";
              }
          );
    })
})
const layer = layui.layer;
//封装获取用户信息的函数，函数不能用const或者let声明，因为这个函数必须挂载在window对象上，别的页面才能够调用
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //  headers: {
        //      Authorization: localStorage.getItem("token"),
        // },
        success: res => {
            if (res.status !== 0) return layer.msg("获取用户信息失败");
            layer.msg("获取用户信息成功")
            console.log(res);
            renderAvatar(res.data);
        },
        complete: res => {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }
    });
   
};
//封装渲染头像的函数
function renderAvatar(user) {
    //获取名字
    let name = user.nickname || user.username;
    //设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    //按需渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $('.layui-nav-img').hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
};
function change() {
    $("#art_list").addClass("layui-this").next().removeClass("layui-this");
}