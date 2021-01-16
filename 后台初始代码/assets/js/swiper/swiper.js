var layer = layui.layer
//---------------------------------------------------------------
// 轮播图渲染
function xr() {
    $.ajax({
        url: "admin/swipers",
        type: "get",
        success: function (res) {
            if (res.status == 0) {
                var str = ""
                $(res.data).each(function (index, value) {
                    str += ` <tr>
                                    <td>${value.id}</td>
                                    <td>
                                        <img src="http://localhost:8888/uploads/${value.swiperimg}">
                                    </td>
                                    <td> ${value.swiperimg}</td>
                                    <td>
                                    
                                        <span data-id='${value.id}' data-status='2' class="layui-badge layui-bg-green dui ${value.swiperstatus===1?'show':'hide'}">√</span>

                                        <span data-id='${value.id}' data-status='1' class="layui-badge layui-bg-cyan cuo ${value.swiperstatus===1?'hide':'show'}">×</span>
                                      
                                    </td>
                                    <td>
                                        <button data-id="${value.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                                            删除
                                        </button>
                                    </td>
                            </tr>`
                })
                $("tbody").html(str);
            }
        }
    })
}
xr();

//-----------------------------------------------------------------
//上传
$("#uploadSwiper").on("click", function () {
    $("#myfile").click();
});
$("#myfile").on("change", function (e) {
    var files = this.files; //批量上传，不能只取第一个
    var fd = new FormData();
    //遍历上传的图片，一个一个添加到fd里面
    $(files).each(function (index, item) {
        fd.append("swipers", item)
    })
    $.ajax({
        type: "post",
        url: "admin/swipers",
        data: fd,
        //上传文件必须配置的两个false
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.status == 0) {
                layer.msg(res.message)
                xr();
            }
        }
    })
})

//--------------------------------------------------------------
//切换
$("tbody").on("click", ".layui-badge", function (e) {
    //根据对应的id改变对应的状态
    var id = $(this).attr("data-id");
    //一开始是1启动，点击变成2禁用，所以这个data-status要相反
    var status = $(this).attr("data-status");
    $.ajax({
        type: 'put',
        url: 'admin/swipers/' + id,
        data: {
            status: status
        },
        success: function (res) {
            if (res.status == 0) {
                layer.msg(res.message)
                xr();
            }
        }
    })
})

//---------------------------------------------------------------------
//删除
$("tbody").on("click", ".delete", function (e) {
    var id = $(this).attr("data-id")
    layer.confirm('你忍心删除我么？', {
        icon: 3, // 不同的显示图片
        title: '提示'
    }, function (index) { // 点击确认执行函数  index，该弹窗凭证；
        $.ajax({
            type: "DELETE",
            url: "admin/swipers/" + id,
            success: function (res) {
                if (res.status == 0) {
                    layer.close(index);
                    xr();
                }
            }
        })
    });
})