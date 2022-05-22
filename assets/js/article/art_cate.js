$(function () {
    const form = layui.form;
    const layer = layui.layer;
    const initArtCateList = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg("获取文章分类失败");
                const htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
            }
        })
    };
    initArtCateList();
    //添加类别弹出层
    let indexAdd = null;
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1, //为1 表示页面层弹窗
            area: ["500px", "250px"], //表示宽高
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    });

    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg("添加分类失败");
                initArtCateList();
                layer.msg("添加分类成功");
                layer.close(indexAdd);
            }
        })
    });

    //修改类别弹出层
     let indexEdit = null;
     $("body").on("click", "#btn-edit", function() {
         indexEdit = layer.open({
             type: 1, //为1 表示页面层弹窗
             area: ["500px", "250px"], //表示宽高
             title: "添加文章分类",
             content: $('#dialog-edit').html(),
         });

         const id = $(this).attr('data-id');
         $.ajax({
             type: 'GET', 
             url: '/my/article/cates/' + id, 
             success: res => {
                 if (res.status !== 0) return layer.msg("获取文章类别失败")
                 form.val('form-edit',res.data)
             }
         })
     });
    
    //发起修改类别的请求
    $("body").on('submit', "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status) return layer.msg("更新文章类别失败");
                layer.msg("更新文章类别成功");
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    });

    //监听删除按钮的点击事件，发起删除请求
    $("tbody").on("click", ".btn-delete", function () {
        const id = $(this).attr("data-id");
        layer.confirm("确定删除吗？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            $.ajax({
                type: "GET",
                url: '/my/article/deletecate/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg("删除文章类别失败");
                    layer.msg("删除文章类别成功");
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    });
    
})