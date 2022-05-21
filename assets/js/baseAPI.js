// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数,是一种请求拦截器
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    //统一拼接发送请求的url的根路径
    options.url = `http://www.liulongbin.top:3007` + options.url;
    //判断发送请求的url是否为需要权限的接口，如果是就添加请求头，发送token值
    if (options.url.includes("/my/")) {
        options.headers =  {
            Authorization: localStorage.getItem("token"),
        }
    };
    options.complete = res => {
    console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        localStorage.removeItem('token');
        location.href = '/login.html'
    }
    }
})