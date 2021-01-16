var form = layui.form;
var str = location.search.slice(1);
var arr = str.split("=");
var id = arr[1];
// console.log(id);
function loadUserInfo() {
    $.ajax({
        type: 'get',
        url: 'admin/users/' + id,
        success: function (res) {
            if (res.status === 0) {
                form.val('editForm', res.data)
            } else {
                layer.msg(res.message)
            }
        }
    })
}
loadUserInfo();
$('.layui-form').on("submit", function (e) {
    e.preventDefault();
    var fd = $(this).serialize();
    $.ajax({
        type: 'put',
        url: 'admin/users',
        data: fd,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                location.href = "/Project/后台初始代码/user/user.html";
            }
        }
    })
})