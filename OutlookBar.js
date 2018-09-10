DBFX.RegisterNamespace("DBFX.Web.Controls");
DBFX.RegisterNamespace("DBFX.Web.NavControls");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");

DBFX.Web.NavControls.OutlookBar = function (b) {
    var dm = DBFX.Web.Controls.Control("OutlookBar");
    dm.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.OutlookBarDesigner");
    dm.ClassDescriptor.Serializer = "DBFX.Serializer.OutlookBarSerializer";

    //显示模式-1、显示所有；0-只显示缩略图
    dm.mode = 1;
    dm.curClickE = undefined;
    dm.preClickE = undefined;
    dm.curOverE = undefined;
    dm.preOverE = undefined;

    dm.VisualElement = document.createElement("DIV");
    // dm.VisualElement.className = "OutlookBar";


    //切换控制视图按钮位置：左上、中上、右上、左下、中下、右下
    //切换控制视图按钮位置：top-left、top-center、top-right、bottom-left、bottom-center、bottom-right
    dm.controlBtnPosition = "bottom-left";
    Object.defineProperty(dm, "ControlBtnPosition", {
        get: function () {
            return dm.controlBtnPosition;
        },
        set: function (v) {
            dm.controlBtnPosition = v;
            switch (dm.controlBtnPosition) {
                case "top-left":
                    dm.ControlVP = "top";
                    dm.ControlImgHP = "flex-start";
                    break;
                case "top-center":
                    dm.ControlVP = "top";
                    dm.ControlImgHP = "center";
                    break;
                case "top-right":
                    dm.ControlVP = "top";
                    dm.ControlImgHP = "flex-end";
                    break;
                case "bottom-center":
                    dm.ControlVP = "bottom";
                    dm.ControlImgHP = "center";
                    break;
                case "bottom-left":
                    dm.ControlVP = "bottom";
                    dm.ControlImgHP = "flex-start";
                    break;
                case "bottom-right":
                    dm.ControlVP = "bottom";
                    dm.ControlImgHP = "flex-end";
                    break;
                default:
                    break;
            }
        }
    });

    //设置切换显示按钮水平位置flex-start、flex-end、center
    dm.controlImgHP = "flex-start";
    Object.defineProperty(dm, "ControlImgHP", {
        get: function () {
            return dm.controlImgHP;
        },
        set: function (v) {
            dm.controlImgHP = v;
            dm.Control.style.justifyContent = dm.controlImgHP;
        }
    });
    //设置切换显示按钮垂直位置top、bottom
    dm.controlVP = "bottom";
    Object.defineProperty(dm, "ControlVP", {
        get: function () {
            return dm.controlVP;
        },
        set: function (v) {
            dm.controlVP = v;
            if(v == "top"){
                dm.ItemsPanel.style.top = parseFloat(dm.headerHeight)+parseFloat(dm.controlHeight)+"px";
                dm.ItemsPanel.style.bottom = "0px";
                dm.Header.style.top = parseFloat(dm.controlHeight)+"px";
                dm.Control.style.top = "0px";
            }else {
                dm.ItemsPanel.style.top = parseFloat(dm.headerHeight)+"px";
                dm.ItemsPanel.style.bottom = parseFloat(dm.controlHeight)+"px";
                dm.Header.style.top = "0px";
                dm.Control.style.top = "";
                dm.Control.style.bottom = "1px";
            }
        }
    });

    dm.controlText = "";
    Object.defineProperty(dm, "ControlText", {
        get: function () {
            return dm.controlText;
        },
        set: function (v) {
            dm.controlText = v;
            dm.ControlLabel.innerText = dm.controlText;
        }
    });

    //TODO:切换按钮所在行高度
    dm.controlHeight = "35px";
    Object.defineProperty(dm, "ControlHeight", {
        get: function () {
            return dm.controlHeight;
        },
        set: function (v) {
            dm.controlHeight = v;
            dm.Control.style.height = parseFloat(dm.controlHeight)+"px";
            dm.ControlBtnPosition = dm.controlBtnPosition;
        }
    });


    //TODO:头部：图片、标题、副标题
    dm.headerImgUrl = "";
    Object.defineProperty(dm, "HeaderImgUrl", {
        get: function () {
            return dm.headerImgUrl;
        },
        set: function (v) {
            dm.headerImgUrl = v;
            dm.HeaderImage.src = v;
        }
    });

    //头部：背景色 字体大小 字体颜色、高
    dm.headerHeight = "44px";
    Object.defineProperty(dm, "HeaderHeight", {
        get: function () {
            return dm.headerHeight;
        },
        set: function (v) {
            dm.headerHeight = v;
            dm.Header.style.height = parseFloat(dm.headerHeight)+"px";
            dm.ControlBtnPosition = dm.controlBtnPosition;
        }
    });

    dm.headerBgC = "#3879f9";
    Object.defineProperty(dm, "HeaderBgC", {
        get: function () {
            return dm.headerBgC;
        },
        set: function (v) {
            dm.headerBgC = v;
            dm.Header.style.backgroundColor = dm.headerBgC;
        }
    });

    dm.headerTextC = "#f9f9f9";
    Object.defineProperty(dm, "HeaderTextC", {
        get: function () {
            return dm.headerTextC;
        },
        set: function (v) {
            dm.headerTextC = v;
            dm.HeaderText.style.color = dm.headerTextC;
        }
    });

    dm.headerTextS = "16px";
    Object.defineProperty(dm, "HeaderTextS", {
        get: function () {
            return dm.headerTextS;
        },
        set: function (v) {
            dm.headerTextS = v;
            dm.HeaderText.style.fontSize = dm.headerTextS;
        }
    });

    //TODO:一级菜单：背景色（默认、选中）、字体颜色（默认、选中）、高
    dm.firstClassBgc = "green";
    Object.defineProperty(dm, "FirstClassBgc", {
        get: function () {
            return dm.firstClassBgc;
        },
        set: function (v) {
            dm.firstClassBgc = v;
            dm.Items.forEach(function (item) {
                console.log(item);
                item.ItemBar.style.backgroundColor = v;
            })
        }
    });
    //TODO:二级菜单：背景色（默认、选中）、字体颜色（默认、选中）、高
    //TODO:三级菜单：背景色（默认、选中）、字体颜色（默认、选中）、高


    dm.OnCreateHandle();
    //重写构造函数
    dm.OnCreateHandle = function () {
        dm.VisualElement.innerHTML = "<DIV class=\"OutlookBar\"><DIV class=\"OutlookBar_Header\"><IMG class=\"OutlookBar_HeaderImage\"></IMG><Label class=\"OutlookBar_HeaderText\"></Label><Label class=\"OutlookBar_HeaderSubText\"></Label></DIV><DIV class=\"OutlookBar_Body\"></DIV><DIV class=\"OutlookBar_Control\"><IMG class=\"OutlookBar_ControlImage\"></IMG><LABEL class=\"OutlookBar_ControlText\"></LABEL></DIV></DIV>";
        dm.ControlImage = dm.VisualElement.querySelector("IMG.OutlookBar_ControlImage");
        dm.ControlLabel = dm.VisualElement.querySelector("LABEL.OutlookBar_ControlText");
        dm.Control = dm.VisualElement.querySelector("DIV.OutlookBar_Control");
        dm.ItemsPanel = dm.VisualElement.querySelector("DIV.OutlookBar_Body");
        dm.BodyDiv = dm.VisualElement;

        dm.Header = dm.VisualElement.querySelector("DIV.OutlookBar_Header");
        dm.HeaderImage = dm.VisualElement.querySelector("IMG.OutlookBar_HeaderImage");
        dm.HeaderText = dm.VisualElement.querySelector("LABEL.OutlookBar_HeaderText");
        dm.HeaderSubText = dm.VisualElement.querySelector("LABEL.OutlookBar_HeaderSubText");

        dm.HeaderImage.src = "./moretree.png";
        dm.HeaderText.innerText = "深蓝软件";
        //TODO:主题图片
        dm.ControlImage.src = "Themes/" + app.CurrentTheme + "/Images/hammenu.png";

        // dm.ControlImage.src = "./drawermenu.png";
        dm.ControlImage.onclick = dm.SwitchMenuMode;
        // dm.ControlLabel.innerText = dm.controlText;
        dm.ControlLabel.innerText = "深蓝软件砚台智能云";

    }



    //TODO:切换显示模式
    dm.SwitchMenuMode = function () {
        dm.Items.forEach(function (item) {
            if(dm.mode == 1){
                item.hideItemToIcon();
            }else{
                item.showIconToItem();
            }
        });

        if(dm.mode == 0){
            dm.Width= dm.MenuWidth;
            dm.ControlLabel.style.display = "inline-block";
            dm.ItemsPanel.style.overflow = "auto";
            dm.HeaderImage.style.marginLeft = "16px";
            dm.HeaderText.style.display = "";
            dm.Control.style.justifyContent = dm.controlImgHP;
            dm.mode = 1;
        }else {

            dm.MenuWidth = dm.ClientDiv.style.width;
            dm.Width = "50px";
            dm.ControlLabel.style.display = "none";
            dm.ItemsPanel.style.overflow = "hidden";
            dm.HeaderImage.style.marginLeft = "2px";
            dm.HeaderText.style.display = "none";
            dm.Control.style.justifyContent = "center";
            dm.mode = 0;
        }
    }


    dm.Items = new Array();
    //清空所有Item
    dm.Clear = function () {
        dm.ItemsPanel.innerHTML = "";
        dm.Items = new Array();
    }


    //添加item
    dm.AddItem = function (item) {
        item.OutlookBar = dm;
        dm.Items.push(item);
        dm.ItemsPanel.appendChild(item.VisualElement);
    }

    dm.GetText = function () {
        return dm.HeaderText.innerText;
    }

    dm.SetText = function (v) {
        dm.HeaderText.innerText = v;
    }

    //数据源
    dm.itemSource =undefined;
    Object.defineProperty(dm, "ItemSource", {
        get: function () {
            return dm.itemSource;
        },
        set: function (v) {
            dm.itemSource = v;
            dm.CreateOutlookBar();
        }
    });


    //创建抽屉菜单
    dm.CreateOutlookBar = function () {
        //置空
        dm.Clear();
        //遍历数据源 创建添加item
        if (Array.isArray(dm.itemSource)) {
            for(var i=0;i<dm.itemSource.length;i++){
                var item = dm.itemSource[i];
                //创建dmItem
                var dmItem = new DBFX.Web.NavControls.OutlookBarItem(dm);
                dmItem.Text = item["Text"];
                dmItem.ImageUrl = item["ImageUrl"];
                // dmItem.ImageUrl = "./moretree.png";
                dmItem.dataContext = item;
                dmItem.OnClick = DBFX.Serializer.CommandNameToCmd(item.OnClick);
                dm.AddItem(dmItem);
                dmItem.CreateSubItems(item.Items);
            }
        }
    }

    dm.OnOutlookBarItemClicked = function (item) {
        if (dm.OutlookBarItemClicked != undefined && typeof dm.OutlookBarItemClicked =="function")
            dm.OutlookBarItemClicked(item);

        if (dm.OutlookBarItemClicked != undefined && dm.OutlookBarItemClicked.GetType() == "Command") {
            dm.OutlookBarItemClicked.Sender = item;
            dm.OutlookBarItemClicked.Execute();

        }

        if (item.OnClick != undefined) {
            if (item.OnClick.GetType!=undefined && item.OnClick.GetType() == "Command") {
                item.OnClick.Sender = item;
                item.OnClick.Execute();
            }
            else
                item.OnClick(item);
        }

        //导航到新页面
        if (item.dataContext != undefined && item.dataContext.ResourceUri != undefined && item.dataContext.ResourceUri != "") {

            if (item.dataContext.ResourceText == undefined)
                item.dataContext.ResourceText = item.dataContext.Text;
                app.LoadAppResource(item.dataContext.ResourceUri, item.dataContext.ResourceText, item.dataContext, item.dataContext.Mode);
        }

    }

    dm.onload = function () {
        var ve  = dm.VisualElement;
        ve.style.width = "30px";
        ve.style.height = "100px";
        // ve.style.overflow = "hidden";
        ve.style.border = "1px solid blue";
        ve.style.boxSizing = "border-box";
    };

    dm.OnCreateHandle();
    dm.onload();

    return dm;
}
DBFX.Serializer.OutlookBarSerializer = function () {
    //系列化
    this.Serialize = function (c, xe, ns) {
        DBFX.Serializer.SerialProperty("ControlBtnPosition", c.ControlBtnPosition, xe);
        DBFX.Serializer.SerialProperty("ControlHeight", c.ControlHeight, xe);
        DBFX.Serializer.SerialProperty("HeaderImgUrl", c.HeaderImgUrl, xe);
        DBFX.Serializer.SerialProperty("HeaderHeight", c.HeaderHeight, xe);
        DBFX.Serializer.SerialProperty("HeaderBgC", c.HeaderBgC, xe);
        DBFX.Serializer.SerialProperty("HeaderTextC", c.HeaderTextC, xe);
        DBFX.Serializer.SerialProperty("HeaderTextS", c.HeaderTextS, xe);
        //序列化方法
        DBFX.Serializer.SerializeCommand("OutlookBarItemClicked", c.OutlookBarItemClicked, xe);

    }

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        DBFX.Serializer.DeSerialProperty("ControlBtnPosition", c, xe);
        DBFX.Serializer.DeSerialProperty("ControlHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("HeaderImgUrl", c, xe);
        DBFX.Serializer.DeSerialProperty("HeaderHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("HeaderBgC", c, xe);
        DBFX.Serializer.DeSerialProperty("HeaderTextC", c, xe);
        DBFX.Serializer.DeSerialProperty("HeaderTextS", c, xe);
        //对方法反序列化
        DBFX.Serializer.DeSerializeCommand("OutlookBarItemClicked", xe, c);
    }


}
DBFX.Design.ControlDesigners.OutlookBarDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/OutlookBarDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;
            //设计器中绑定事件处理
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{EventName:"OutlookBarItemClicked",EventCode:undefined,Command:od.dataContext.OutlookBarItemClicked,Control:od.dataContext}];
        }, obdc);
    }

    //事件处理程序
    obdc.DataContextChanged = function (e) {
        obdc.DataBind(e);
        if(obdc.EventListBox != undefined){
            obdc.EventListBox.ItemSource = [{EventName:"OutlookBarItemClicked",EventCode:undefined,Command:obdc.dataContext.OutlookBarItemClicked,Control:obdc.dataContext}];
        }
    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "抽屉菜单";
    return obdc;
}


//OutlookBarItem
DBFX.Web.NavControls.OutlookBarItem = function (dm) {
    var dmItem = DBFX.Web.Controls.Control("OutlookBarItem");
    dmItem.ClassDescriptor.Serializer = "DBFX.Serializer.OutlookBarItemSerialer";
    dmItem.VisualElement = document.createElement("DIV");
    dmItem.OutlookBar = dm;
    dmItem.Offsetx = 2;
    dmItem.Items = new Array();

    dmItem.class = 0;
    dmItem.OnCreateHandle();
    dmItem.OnCreateHandle = function () {
        dmItem.VisualElement.innerHTML = "<DIV class=\"OutlookBarItem\"><DIV class=\"OutlookBarItemBar\"><IMG class=\"OutlookBarItemECImage\" /><IMG class=\"OutlookBarItemImage\" /><LABEL class=\"OutlookBarItemText\"></LABEL></DIV><DIV class=\"OutlookBarItemsPanel\"></DIV></DIV>";
        dmItem.ClientDiv = dmItem.VisualElement.querySelector("DIV.OutlookBarItem");
        dmItem.ItemBar = dmItem.VisualElement.querySelector("DIV.OutlookBarItemBar");
        dmItem.ItemsPanel = dmItem.VisualElement.querySelector("DIV.OutlookBarItemsPanel");
        dmItem.ECImage = dmItem.VisualElement.querySelector("IMG.OutlookBarItemECImage");
        dmItem.ItemImage = dmItem.VisualElement.querySelector("IMG.OutlookBarItemImage");
        dmItem.TextLabel = dmItem.VisualElement.querySelector("LABEL.OutlookBarItemText");
        dmItem.ECImage.src = "Themes/" + app.CurrentTheme + "/Images/OutlookBar/empty.png";
        // dmItem.ECImage.src = "./moretree.png";
        dmItem.mode = 1;


        dmItem.originBgc = "";
        // dmItem.ItemBar.onmouseover = function (e) {
        //
        //     dm.curOverE = this;
        //     if(dm.curOverE != dm.curClickE){
        //         dm.curOverE.style.backgroundColor = "#cbcbcb";
        //     }
        // }
        //
        // dmItem.ItemBar.onmouseleave = function (e) {
        //     // dmItem.preOverE.style.backgroundColor = "";
        //     if(dm.curOverE != undefined){
        //         dm.preOverE = dm.curOverE;
        //     }
        //
        //     if(dm.preOverE != undefined && dm.curClickE != dm.preOverE){
        //         dm.preOverE.style.backgroundColor = "";
        //     }
        // }

        //
        dmItem.ItemBar.onclick = function (e) {

            e.preventDefault();

            if(dm.curClickE != undefined){
                dm.preClickE = dm.curClickE;
            }
            if(dm.preClickE != undefined){
                dm.preClickE.style.backgroundColor = "";
            }
            dm.curClickE = this;
            console.log(dmItem.Items.length);


            if(dm.mode == 1){
                //TODO:通过判断是否有子元素执行操作
                if(dmItem.Items.length == 0){
                    this.style.backgroundColor = dmItem.SelectedBgC;
                }
                if(dmItem.mode == 1){
                    dmItem.ItemsPanel.style.display = "none";
                    // dmItem.ECImage.src = "./Collapsed.png";
                    // dmItem.ECImage.src = "./Collapsed.png";
                    dmItem.mode = 0;
                }else {
                    dmItem.ItemsPanel.style.display = "";
                    // dmItem.ECImage.src = "./Expanded.png";
                    dmItem.mode = 1;
                }
            }else {
                // this.style.backgroundColor = dmItem.SelectedBgC;
            }

            dmItem.OnMenuItemClick(e);

        }

        // dmItem.ItemImage.style.height = "40px";

    }

    dmItem.OnMenuItemClick = function (e) {
        if(dmItem.OutlookBar != undefined){
            dmItem.OutlookBar.OnOutlookBarItemClicked(dmItem);
        }
    }

    dmItem.Clear = function () {
        dmItem.ItemsPanel.innerHTML = "";
        dmItem.Items = new Array();
    }

    dmItem.CreateSubItems = function (subItems) {
        if(Array.isArray(subItems)){
            dmItem.class = dmItem.class + 1;
            for(var i=0;i<subItems.length;i++){
                var item = subItems[i];
                var dItem = new DBFX.Web.NavControls.OutlookBarItem(dm);
                dItem.class = this.class;

                dItem.ClientDiv.className = "OutlookBarItem" + this.class;

                dItem.Text = item["Text"];
                dItem.ImageUrl = item["ImageUrl"];
                // dItem.ImageUrl = "./moretree.png";
                dItem.OnClick = DBFX.Serializer.CommandNameToCmd(item.OnClick);
                dItem.dataContext  = item;
                dmItem.AddItem(dItem);
                dItem.CreateSubItems(item.Items);
            }
            // this.class ++;
        }

    }

    dmItem.AddItem = function (item) {
        item.OutlookBar = dmItem.OutlookBar;
        dmItem.Items.push(item);
        dmItem.ItemsPanel.appendChild(item.VisualElement);
        item.OffsetX = dmItem.Offsetx + 30;
        // dmItem.ECImage.src = "Themes/" + app.CurrentTheme + "/Images/dmItem/expanded.png";
        // dmItem.ECImage.src = "./Expanded.png";
        // dmItem.ECImage.onclick = function (e) {
        //
        // }
    }

    dmItem.SetText = function (v) {
        dmItem.TextLabel.innerText = v;
    }

    dmItem.GetText = function () {
        return dmItem.TextLabel.innerText;
    }

    //默认背景色
    dmItem.defaultBgC = "";
    Object.defineProperty(dmItem, "DefaultBgC", {
        get:function () {
            return dmItem.defaultBgC;
        },
        set:function (v) {
            dmItem.defaultBgC = v;
        }
    });

    //选中背景色
    dmItem.selectedBgC = "#9ab3cb";
    Object.defineProperty(dmItem, "SelectedBgC", {
        get:function () {
            return dmItem.selectedBgC;
        },
        set:function (v) {
            dmItem.selectedBgC = v;
        }
    });


    //item图片地址
    Object.defineProperty(dmItem, "ImageUrl", {
        get:function () {
            return dmItem.ItemImage.src;
        },
        set:function (v) {

            if(v != undefined){
                v = v.replace("http://wfs.dbazure.cn", "https://wfs.dbazure.cn");
            }
            dmItem.ItemImage.src = v;
        }
    });

    //item  轴偏移量
    Object.defineProperty(dmItem, "OffsetX", {
        get: function () {

            return dmItem.Offsetx;
        },
        set: function (v) {
            dmItem.Offsetx = v;
            dmItem.ItemImage.style.marginLeft = dmItem.Offsetx + "px";
        }

    });

    dmItem.hideItemToIcon = function () {
        dmItem.ECImage.style.display = "none";
        dmItem.TextLabel.style.display = "none";
        if(dmItem.mode == 1){
            dmItem.ItemsPanel.style.display = "none";
        }

    }

    dmItem.showIconToItem = function () {
        dmItem.ECImage.style.display = "inline-block";
        dmItem.TextLabel.style.display = "inline-block";
        if(dmItem.mode == 1){
            dmItem.ItemsPanel.style.display = "";
        }
    }


    dmItem.OnCreateHandle();
    dmItem.onload = function () {
        var ve  = dmItem.VisualElement;
        // ve.style.height = "90px";
        // ve.style.width = "400px";
        // ve.style.border = "1px solid red";

    }
    dmItem.onload();
    return dmItem;
}


