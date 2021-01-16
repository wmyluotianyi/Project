(function () {
    var form = layui.form,
        laypage = layui.laypage;
    var pagenum = 1;
    var pagesize = 3;

    function loadUserList(param) {
        $.ajax({
            type: 'get',
            url: 'admin/users',
            data: param,
            success: function (res) {
                var tags = template('table-tpl', res);
                $('.layui-table tbody').html(tags);
                laypage.render({
                    elem: 'articlePage',
                    curr: pagenum,
                    count: res.total,
                    limit: pagesize,
                    limits: [3, 6, 9, 12, 15],
                    layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
                    jump: function (obj, first) {
                        pagenum = obj.curr;
                        pagesize = obj.limit;
                        if (!first) {
                            loadUserList({
                                pagenum: pagenum,
                                pagesize: pagesize
                            })
                        }
                    }
                });
            }
        })
    }
    loadUserList({
        pagenum: pagenum,
        pagesize: pagesize
    });

    //删除功能
    $('.layui-table tbody').on('click', '.layui-btn-danger', function (e) {
        var id = $(e.target).data("id");
        // console.log(id);
        layer.confirm("确认要删除用户吗？", function (index) {
            $.ajax({
                type: "delete",
                url: "admin/users/" + id,
                success: function (res) {
                    layer.msg(res.message);
                    loadUserList({
                        pagenum: pagenum,
                        pagesize: pagesize
                    });
                }
            });
        });
    });
    //重置密码
    form.verify({
        same: function (value) {
            var uname = $('.layui-form input[name=password]').val()
            if (value !== uname) {
                return '两次输入的密码不一样'
            }
        },
        length: [/^\S{6,12}$/, '密码长度必须是6~12位且不能有空格'],

    });
    $('.layui-table tbody').on('click', '.layui-btn-normal', function (e) {
        var id = $(e.target).data('id');
        var index = layer.open({
            type: 1,
            title: '重置密码',
            content: $('#repwd-form-tpl').html(),
            area: ['500px', '250px']
        })
        $('#repwd-form').submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'put',
                url: 'admin/users/' + id,
                data: {
                    password: $('#repwd-form input[name=password]').val()
                },
                success: function (res) {
                    layer.msg(res.message)
                    layer.close(index)
                }
            })
        })
    })



})();