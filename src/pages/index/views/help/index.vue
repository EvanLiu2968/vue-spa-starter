<template>
  <div class="app-container">
    <h2 class="help-title">常见问题</h2>
    <ul>
      <li class="help-item">
        <h3 class="help-item-title">如何设置扫描仪？</h3>
        <p class="help-item-content">
          单击 “扫描仪设置” 按钮，弹出如下图所示界面，选定连接的扫描仪。扫描仪设置界面 扫描厂商不同，用户可以通过此处选择要使用的扫描仪，当软件第一次运行时，或更换一台新的扫描仪时，用户在扫描前必须先确定扫描仪来源选择的是否正确，否则扫描操作将无法进行。
        </p>
      </li>
      <li class="help-item">
        <h3 class="help-item-title">如何使用打印控件打印？</h3>
        <p class="help-item-content">
          在使用本系统打印功能前先下载所必需的打印控件：<br>
          <a href="/static/lodop/CLodop_Setup_for_Win32NT.exe">CLodop_Setup_for_Win32NT.exe</a><br>
          <a href="/static/lodop/install_lodop32.exe">lodop32位安装包</a> 或 <a href="/static/lodop/install_lodop64.exe">lodop64位安装包</a>
          <br>
          <br>
          安装后刷新浏览器即可使用，可选择使用浏览器默认打印和使用控件打印
          <br>
          <br>
          <img src="/static/lodop/demo1.jpg">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.help-title {
  font-size: 20px;
  font-weight: bold;
  padding:10px;
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
}
.help-item {
  margin: 20px;
  list-style-type: disc;
  margin-bottom: 20px;
  &-title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
  }
  &-content {
    line-height: 1.5;
  }
}
</style>
