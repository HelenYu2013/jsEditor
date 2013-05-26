##编辑器##

暂时用在社交名片项目中。。

+ ifWidth: 300 iframe宽度
+ ifHeight: 400 iframe高度
+ menuObj: null 功能区按钮存放位置
+ menu:  功能区设置 此处为一个数组 字体、字号、字色 暂未实现
<pre>
menu:[
    {'type':'bold','name':'B'}, //粗体
    {'type':'italic','name':'I'},//斜体
    {'type':'underline','name':'U'},//下划线
    {'type':'justifycenter','name':'C'},//居中
    {'type':'justifyleft','name':'L'},//居左
    {'type':'justifyright','name':'R'},//居右
    {'type':'outdent','name':'outdent'},//悬起
    {'type':'indent','name':'indent'},//缩进
    {'type':'insertunorderedlist','name':'ul'},//无序列表
    {'type':'insertorderedlist','name':'ol'},//有序列表
    {'type':'createlink','name':'link'},//链接
    {'type':'insertimage','name':'img'},//图片
    {'type':'html','name':'HTML'},//源码
    {'type':'fontFamily','name':'fontFamily'},//字体
    {'type':'fontSize','name':'fontSize'},//字号
    {'type':'fontColor','name':'fontColor'}//字色
],
</pre>
+ callback: function(){} 回调
