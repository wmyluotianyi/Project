// 需求：1.获取评论人的ID 评论人  评论内容 评论时间 渲染到页面上
//       2.点击删除按钮，删除内容  事件委托
// 



function getCommentList() {
    // 1.获取到评论人数据 渲染到页面
    $.ajax({
        type: 'get',
        url: 'admin/comments',
        success: function (res) {
            // console.log(res);
            // 如果数据请求成功 就添加到tbody
            if (res.status == 0) {
                var str = '';
                $.each(res.data, function (index, item) {
                    // console.log(index, item);
                    // 获取评论时间  并转化成年月日的格式
                    var date = new Date(res.data[index].cdate)
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    // console.log(date);  2020-8-19

                    str += `
                        <tr>
                        <td>${res.data[index].id}</td>
                        <td>${res.data[index].uname}</td>
                        <td>${res.data[index].content}</td>
                        <td>${date}</td>
                        <td>
                        <!-- <button data-id="1" type="button" class="layui-btn layui-btn-xs edit">
                            编辑
                        </button> -->
                        <button data-id="${res.data[index].id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                            删除
                        </button>
                        </td>
                        </tr>
                        `;

                });
                $('.layui-table tbody').html(str);
            }

        }
    });
};
getCommentList();

// 删除评论
// 用事件委托的方式为删除按钮注册点击事件
$('.layui-table tbody').on('click', '.delete', function (e) {
    var id = $(e.target).data('id'); //
    layer.confirm('行吧，你想好就删吧！', function (index) {
        $.ajax({
            type: 'delete',
            url: 'admin/comments/' + id,
            success: function (res) {
                if (res.status == 0) {
                    // 关闭窗口
                    layer.close(index);
                    layer.msg(res.message);
                    getCommentList();
                }
            }

        });
    });

});