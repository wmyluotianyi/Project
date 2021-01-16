var form = layui.form;
form.verify({
    same: function (value) {
        var uname = $('.layui-form input[name=password]').val()
        if (value !== uname) {
            return '两次输入的密码不一样'
        }
    },
    length: [/^\S{6,12}$/, '密码长度必须是6~12位且不能有空格'],
});
$(".layui-form").on("submit", function (e) {
    e.preventDefault();
    var fd = $(this).serialize();
    $.ajax({
        type: 'post',
        url: "admin/users",
        data: fd,
        success: function (res) {
            layer.msg(res.message);
        }
    });
});