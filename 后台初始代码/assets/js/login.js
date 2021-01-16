 // 粒子线条背景
 $(document).ready(function () {
     $('.layui-container').particleground({
         dotColor: '#7ec7fd',
         lineColor: '#7ec7fd'
     })
 })
 var layer = layui.layer;

 $('.layui-form').on('submit', function (e) {
     // 阻止默认
     e.preventDefault();
     // 收集数据
     var data = $(this).serialize();

     $.ajax({
         type: "post",
         url: "api/login",
         data: data,
         success: function (res) {
             if (res.status == 0) {
                 layer.msg(res.message);
                 location.href = "./index.html";
                 localStorage.setItem("mytoken", res.token);
             } else {
                 layer.msg('登陆失败！');
             }
         }
     });
 })