var layer = layui.layer;
//================================列表展示
// 发出请求，拿到数据，渲染遍历列表
function getList() {
    $.ajax({
        url: "admin/links",
        success: function (res) {
            if (res.status == 0) {
                var str = '';
                // 遍历数据
                $.each(res.data, function (index, item) {
                    str += `<tr>
                    <td>${item.id}</td>
                    <td>
                      <div class="bg">
                      <img src="http://localhost:8888/uploads/${item.linkicon}">
                      </div>
                    </td>
                    <td>${item.linkname}</td>
                    <td>${item.linkurl}</td>
                    <td>${item.linkdesc}</td>
                    <td>
                      <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs edit">
                        编辑
                      </button>
                      <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                        删除
                      </button>
                    </td>
                  </tr>`;
                });

                // 完成后：
                $(".layui-table tbody").html(str);
            }
        }
    });
}
getList();

//=======================================删除
//删除
$('.layui-table tbody').on('click', '.delete', function () {
    alert(1);
    let id = $(this).attr('data-id');
    layer.confirm('确实要删除吗？', function (index) {
        $.ajax({
            type: 'delete',
            url: 'admin/links/' + id,
            success: function (res) {
                if (res.status === 0) {
                    // 删除成功
                    layer.close(index);
                    getList();
                }
            }
        })
    })
});
//======================================添加
//添加
$('#add-link').on('click', function () {
    //准备添加的弹窗字符串
    let add_str = `
    <form id="add-form" class="layui-form" style="margin: 15px 30px 0 0">
      <!-- 第一行：密码 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接名称</label>
        <div class="layui-input-block">
          <input type="text" name="linkname" required="" lay-verify="required" placeholder="请输入链接名称" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第二行：确认密码 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接地址</label>
        <div class="layui-input-block">
          <input type="text" name="linkurl" required="" lay-verify="required" placeholder="请输入链接地址" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第三行：链接描述 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接描述</label>
        <div class="layui-input-block">
          <input type="text" name="linkdesc" required="" lay-verify="required" placeholder="请输入链接描述" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第四行：上传图片 -->
      <div class="layui-form-item">
        <div class="layui-input-block icon-url">
          <button type="button" class="layui-btn layui-btn-sm" id="urlIcon">
            <i class="layui-icon"></i>上传图片
          </button>
          <input type="file" name="linkicon" id="linkFile" style="display: none;">
          <img id="preIcon" src="">
        </div>
      </div>
      <!-- 第三行：按钮 -->
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit="" lay-filter="formDemo">提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
    `;
    //配置弹窗
    layer.open({
        type: 1,
        title: '添加类别',
        content: add_str,
        area: ['700px', '450px'],
        success: function (dom, index) {
            // 本来样式很丑,用好看按钮去代替
            $("#urlIcon").click(function () {
                $("#linkFile").click();
            });

            // 给#file 注册change事件，当图片改变时，触发下面函数：
            // 文件域的内容改变的时候，更换剪裁区的图片
            $('#linkFile').change(function () {
                // 3.1 先找到文件对象
                var fileObj = this.files[0];

                // 3.2 JS语法内置URL构造函数：为选择的图片生成一个临时的url
                var url = URL.createObjectURL(fileObj);

                $('#preIcon').attr('src', url)
            });
            add_submit(index);

        }
    });

    function add_submit(index) {
        $("#add-form").on("submit", function (e) {
            e.preventDefault()
            var fd = new FormData(this)
            $.ajax({
                type: 'post',
                url: 'admin/links',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status === 0) {
                        // 关闭窗口
                        layer.close(index)
                        // 刷新列表
                        loadLinksInfo()
                    }
                }
            })

        })
    }

})
//==================================编辑
//编辑

$('.layui-table tbody').on('click', '.edit', function (e) {
    var id = $(this).attr('data-id');
    //弹窗
    let edit_str = `
    <form id="edit-form" lay-filter="editForm" class="layui-form" style="margin: 15px 30px 0 0">
      <!-- 第一行：密码 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接名称</label>
        <div class="layui-input-block">
          <input type="text" name="linkname" required="" lay-verify="required" placeholder="请输入链接名称" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第二行：确认密码 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接地址</label>
        <div class="layui-input-block">
          <input type="text" name="linkurl" required="" lay-verify="required" placeholder="请输入链接地址" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第三行：链接描述 -->
      <div class="layui-form-item">
        <label class="layui-form-label">链接描述</label>
        <div class="layui-input-block">
          <input type="text" name="linkdesc" required="" lay-verify="required" placeholder="请输入链接描述" autocomplete="off" class="layui-input">
        </div>
      </div>
      <!-- 第四行：上传图片 -->
      <div class="layui-form-item">
        <div class="layui-input-block icon-url">
          <button type="button" class="layui-btn layui-btn-sm" id="urlIcon">
            <i class="layui-icon"></i>上传图片
          </button>
          <input type="file" id="linkFile" style="display: none;" name="">
          <img id="preIcon" src="http://localhost:8888/uploads/aliyun.png">
        </div>
      </div>
      <!-- 第三行：按钮 -->
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit="" lay-filter="formDemo">提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
    `;
    var index = layer.open({
        type: 1,
        title: '编辑友情链接',
        content: edit_str,
        area: ['700px', '450px']
    })
    // 获取链接数据
    $.ajax({
        type: 'get',
        url: 'admin/links/' + id,
        success: function (res) {
            // 设置预览图片效果
            $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
            // 初始化表单数据
            delete res.data.linkicon
            //数据回显赋值
            form.val('editForm', res.data)

            // 改变文件的样式
            $('#urlIcon').click(function () {
                $('#linkFile').click()
            })
            // 监听文件选中事件
            let file = null
            $('#linkFile').change(function (e) {
                // 先找到文件对象
                var fileObj = this.files[0];

                // JS语法内置URL构造函数：为选择的图片生成一个临时的url
                var url = URL.createObjectURL(fileObj);
                file = e.target.files[0];
                $('#preIcon').attr('src', url);
            })

            // 绑定表单提交事件
            $('#edit-form').submit(function (e) {
                e.preventDefault()
                var fd = new FormData(this)
                if (file) {
                    fd.append('linkicon', file)
                }
                $.ajax({
                    type: 'put',
                    url: 'admin/links/' + id,
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res.status === 0) {
                            // 编辑成功
                            layer.close(index)
                            getList()
                        }
                    }
                })
            })
        }
    })
})