//基础方法
var n = {
    $: function(id){
        return document.getElementById(id);
    },

    extend: function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
};
//编辑器组件
(function(window, undefined){
    //默认参数
    var defaultConfig = {
        defaultIframeContent: '',
        ifWidth: 300,
        ifHeight: 400,
        menuObj: null,
        menu:[
            {'type':'bold','name':'B'},
            {'type':'italic','name':'I'},
            {'type':'underline','name':'U'},
            {'type':'justifycenter','name':'C'},
            {'type':'justifyleft','name':'L'},
            {'type':'justifyright','name':'R'},
            {'type':'outdent','name':'outdent'},
            {'type':'indent','name':'indent'},
            {'type':'insertunorderedlist','name':'ul'},
            {'type':'insertorderedlist','name':'ol'},
            {'type':'createlink','name':'link'},
            {'type':'unlink','name':'unlink'},
            {'type':'insertimage','name':'img'},
            {'type':'html','name':'HTML'},
            {'type':'fontFamily','name':'fontFamily'},
            {'type':'fontSize','name':'fontSize'},
            {'type':'fontColor','name':'fontColor'}
        ],
       callback: function(){}
    };
    var Editor = function(target, opts){
        this.target = target;
        this.defaultIframeContent = opts.defaultIframeContent;
        this.ifWidth = opts.ifWidth;
        this.ifHeight = opts.ifHeight;
        this.menuObj = opts.menuObj;
        this.menu = opts.menu;
        this.before = opts.before;
        this.callback = opts.callback;

        this.switchEditMode = true;

        this.init();
    }
    Editor.prototype = {
        init: function(){
            this.before.call(this);
            this.target.style.display = "none";
            this.createIframe();
            this.createMenu();
            this.bindEvent();
            this.callback.call(this);
        },
        createIframe: function(){
            var self = this;
            self.iframe = document.createElement("iframe");
            self.iframe.style.width = self.ifWidth;
            self.iframe.style.height = self.ifHeight;
            self.iframe.frameBorder=0;
            self.target.parentNode.insertBefore(self.iframe, self.target);
            self.iframeDocument = self.iframe.contentDocument || self.iframe.contentWindow.document;
            self.iframeDocument.designMode = "on";
            self.iframeDocument.open();
            var html = '<html><head><style type="text/css">body{ font-family:arial; font-size:13px;background:#f1f1f1 }</style>' +
                            '</head><body>'+self.defaultIframeContent+'</body></html>';
            self.iframeDocument.write(html);
            self.iframeDocument.close();
        },
        /**
         * 功能区
         */
        createMenu: function(){
            var newArr = [],
                self = this,
                len = self.menu.length,
                i = 0;
            for(; i < len; i++){
                newArr.push('<sub data-type="'+self.menu[i]['type']+'" class="nsEditor'+self.menu[i]['type']+'">'+self.menu[i]['name']+'</sub>');
            }
            self.menuObj.innerHTML =  newArr.join('');
        },
        /**
         * 事件绑定
         */
        bindEvent: function(){
            var self = this;
            self.on(self.menuObj, 'click', function(ev){
                var oTarget = self.proxy(ev, 'SUB');
                if(oTarget.tagName.toUpperCase() === "SUB") {
                    self.changeStyle(oTarget.getAttribute('data-type'));
                }
            });
            self.on(self.iframe.contentWindow.document, 'keyup',  self.keyup);
            self.on(self.iframe.contentWindow.document, 'blur',  self.blur);
        },
        keyup: function(e){},
        blur: function(e){},
        /**
         * 给当前文档或者选中内容添加样式
         * @param command
         */
        changeStyle: function(command){
            var self = this;
            switch(command){
                case 'createlink':
                    var value = prompt('请输入超链接:', 'http://');
                        self.iframeDocument.execCommand(command,false,value);
                        break;
                case 'image':
                    var value = self.imageUpload();
                    self.iframeDocument.execCommand(command,false,value);
                    break;
                case "html"://查看源码
                    if(self.switchEditMode){//切换到textarea
                        self.cssRules(self.iframe, 'display', 'none');
                        self.cssRules(self.target, 'display', 'block');
                        self.target.value = self.iframeDocument.body.innerHTML;
                        self.target.focus();
                        self.switchEditMode = false;
                    }else{//切换到iframe
                        self.cssRules(self.iframe, 'display', 'block');
                        self.cssRules(self.target, 'display', 'none');
                        self.iframeDocument.body.innerHTML = self.target.value;
                        self.iframe.contentWindow.focus();
                        self.switchEditMode = true;
                    }
                    break;
                default:
                    self.iframeDocument.execCommand(command,false,'');
                    self.iframe.contentWindow.focus();
            }
        },
        imageUpload: function(){
            return prompt('请输入图片地址:', 'http://');
        },
        cssRules: function(el, rule, val){
            el.style[rule] = val;
        },
        on: function(element, type, handler) {
            element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler);
        },
        /**
         * 简单的事件代理实现
         * @param e
         * @param tagName
         * @returns {*|Object}
         */
        proxy: function(e, tagName){
            e = e || window.event;
            var oTarget = e.target || e.srcElement;
            oTarget.parentNode.tagName.toUpperCase() === tagName && (oTarget = oTarget.parentNode);
            return oTarget;
        }
    }
    window.editor = function(target, opts){
        opts = n.extend(defaultConfig, opts);
        new Editor(target,opts);
    }
}(this));
