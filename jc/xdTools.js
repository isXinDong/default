//创建xmlObj对象-----------------------------------
function xmlObj(){
	try{
		return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
		}catch(e){
		return new XMLHttpRequest()
	}	
}	
function isSupportWorks(){
	return (typeof(Worker) !== "undefined")?true:false;
}

function setAjax(a,b,c,d,e){
		return new function(){
			var t=this;
			t.method=a||"get";      
			t.action=b;      
			t.async=(c!=undefined?c:true);  
			t.cache=d||0;        
			t.callBack=(typeof(e)=="function"?e:0)         
			t.data="";	
			t.Data="";  
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.xmlObj=null;	
			t.send=function(xmlCache){
			var xmlhttp=t.xmlObj||xmlObj();
			  xmlhttp.open(t.method,t.action,t.async);
			  if(t.method.toUpperCase()=="POST"){
				  if(t.cache)xmlhttp.setRequestHeader("Cache-Control","no-cache");
				xmlhttp.setRequestHeader("Content-type","multipart/form-data; charset=UTF-8; text/html")
				 //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");
				 
				}else{
				if(t.cache){
					var c="cache="+Math.random()
						c=(t.action.indexOf("?")!=-1?"&":"?")+c
						t.action+=c
					}
					t.data=null
				}
				//xmlhttp.setRequestHeader("Content-type","charset=UTF-8; text/xml");
				  xmlhttp.onreadystatechange=function(){
					  switch(xmlhttp.readyState){					
						case 2:t.Send();break;						
						case 4:
						  if(xmlhttp.status===200||xmlhttp.status===304){
							  if(t.callBack)t.callBack.call(t,xmlhttp.responseText) ;//responseXML responseText
							  t.xmlObj=(xmlCache?xmlhttp:null);
								xmlhttp=null	 
							 }else{
							  if(typeof(t.Err)=="function")t.Err.call(t)
								}
						break
						default:
							if(xmlhttp.status===404){
								t.error&&t.error();
								xmlhttp.abort()
								}						
						break 
						}

					  }
				  xmlhttp.onerror=function(){
					  console.log(arguments)
					  }	  
				  xmlhttp.send(t.data);
				  t.stop=function(){
					xmlhttp.abort()
					}						  
				};
	
			}	
		}	
//function getSearch(name,str){
//	var s=str||location.search
//		,r=new RegExp(name+"=([^#&]+)","i"),result=s.match(r)||[];
//	return result[1]
//	}

function getSearch(str){
	var s=decodeURIComponent(str||location.search.substr(1)),fg=s.indexOf("&amp;")>-1?"&amp;":"&",arr=(s!==""&&s.split(fg))||[],arrL=arr.length,i=0,key=null,v=null,a=null,o={};
		if(arrL>0)for(;i<arrL;i++)
				e(arr[i])	
			else if(s!=="")
				e(s);
		function e(s){
			var a=s.indexOf("=");
			o[s.substring(0,a)]=s.substr(a+1)
			}		
		return o			
	};
function viewProfile() {
typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke && WeixinJSBridge.invoke("profile",{username:'心动',scene:"57"});
}	
if(document.addEventListener){
	addEvent=function(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
	delEvent=function(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
}else{
	addEvent=function(_,Eve,Fun){_.attachEvent("on"+Eve,Fun)};
	delEvent=function(_,Eve,Fun){_.detachEvent('on'+Eve,Fun||null)};	
}	
function noPop(e){
	e.preventDefault();
	e.stopPropagation();
	e.returnValue=false;
	e.cancelBubble=true
}
function wxfn(option){
	 var wxData=option||{}
    ,WeixinApi=(function (){
    "use strict";
    function weixinShareTimeline(data, callbacks) {
        callbacks = callbacks || {};
        var shareTimeline = function (theData) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.siteUrl + theData.link,
                "desc":theData.title,
                "title":theData.desc, // 注意这里要分享出去的内容是desc
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    case 'share_timeline:cancel':callbacks.cancel && callbacks.cancel(resp);break;
                    case 'share_timeline:confirm':
                    case 'share_timeline:ok':callbacks.confirm && callbacks.confirm(resp);break;
                    case 'share_timeline:fail':default:callbacks.fail && callbacks.fail(resp);break;
                }
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareTimeline(newData);
                };
                callbacks.ready && callbacks.ready(argv);
            } else {
                callbacks.ready && callbacks.ready(argv);
                shareTimeline(data);
            }
        });
    }
    function weixinSendAppMessage(data, callbacks) {
        callbacks = callbacks || {};
        var sendAppMessage = function (theData) {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.siteUrl + theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    // send_app_msg:cancel 用户取消
                    case 'send_app_msg:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // send_app_msg:confirm 发送成功
                    case 'send_app_msg:confirm':
                    case 'send_app_msg:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // send_app_msg:fail　发送失败
                    case 'send_app_msg:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    sendAppMessage(newData);
                };
                callbacks.ready && callbacks.ready(argv);
            } else {
                callbacks.ready && callbacks.ready(argv);
                sendAppMessage(data);
            }
        });
    }
    function weixinShareWeibo(data, callbacks) {
        callbacks = callbacks || {};
        var shareWeibo = function (theData) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content":theData.desc,
                "url":theData.siteUrl + theData.link
            }, function (resp) {
                switch (resp.err_msg) {
                    // share_weibo:cancel 用户取消
                    case 'share_weibo:cancel':
                        callbacks.cancel && callbacks.cancel(resp);
                        break;
                    // share_weibo:confirm 发送成功
                    case 'share_weibo:confirm':
                    case 'share_weibo:ok':
                        callbacks.confirm && callbacks.confirm(resp);
                        break;
                    // share_weibo:fail　发送失败
                    case 'share_weibo:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp);
                        break;
                }
                callbacks.all && callbacks.all(resp);
            });
        };
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            if (callbacks.async && callbacks.ready) {
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    shareWeibo(newData);
                };
                // 然后就绪
                callbacks.ready && callbacks.ready(argv);
            } else {
                // 就绪状态
                callbacks.ready && callbacks.ready(argv);
                shareWeibo(data);
            }
        });
    }
    function weixinGeneralShare(data, callbacks) {
        callbacks = callbacks || {};
        var generalShare = function (general,theData) {
            general.generalShare({
                "appid":theData.appId ? theData.appId : '',
                "img_url":theData.imgUrl,
                "link":theData.siteUrl + theData.link,
                "desc":theData.desc,
                "title":theData.title,
                "img_width":"640",
                "img_height":"640"
            }, function (resp) {
                switch (resp.err_msg) {
                    case 'general_share:cancel':
                        callbacks.cancel && callbacks.cancel(resp ,general.shareTo);
                        break;
                    case 'general_share:confirm':
                    case 'general_share:ok':
                        callbacks.confirm && callbacks.confirm(resp ,general.shareTo);
                        break;
                    case 'general_share:fail':
                    default:
                        callbacks.fail && callbacks.fail(resp ,general.shareTo);
                        break;
                }
                callbacks.all && callbacks.all(resp ,general.shareTo);
            });
        };
        WeixinJSBridge.on('menu:general:share', function (general) {
            if (callbacks.async && callbacks.ready){
                window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
                if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0){
                    window["_wx_loadedCb_"] = new Function();
                }
                callbacks.dataLoaded = function (newData) {
                    window["_wx_loadedCb_"](newData);
                    generalShare(general,newData);
                };
                callbacks.ready && callbacks.ready(general,general.shareTo);
            } else {
                callbacks.ready && callbacks.ready(general,general.shareTo);
                generalShare(general,data);
            }
        });
    }
    function addContact(appWeixinId,callbacks){
        callbacks = callbacks || {};
        WeixinJSBridge.invoke("addContact", {
            webtype: "1",
            username: appWeixinId
        }, function (resp) {
            var success = !resp.err_msg || "add_contact:ok" == resp.err_msg || "add_contact:added" == resp.err_msg;
            if(success) {
                callbacks.success && callbacks.success(resp);
            }else{
                callbacks.fail && callbacks.fail(resp);
            }
        })
    }
    function imagePreview(curSrc,srcList) {
        if(!curSrc || !srcList || srcList.length == 0){return;}
        WeixinJSBridge.invoke('imagePreview', {
            'current' : curSrc,
            'urls' : srcList
        });
    }
    function showOptionMenu() {WeixinJSBridge.call('showOptionMenu'); }
    function hideOptionMenu() {WeixinJSBridge.call('hideOptionMenu');}
    function showToolbar(){WeixinJSBridge.call('showToolbar');}
    function hideToolbar() {WeixinJSBridge.call('hideToolbar');}
    function getNetworkType(callback) {
        if (callback && typeof callback == 'function') {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
                callback(e.err_msg);
            });
        }
    }
    function closeWindow() {
        WeixinJSBridge.call("closeWindow");
    }
    function wxJsBridgeReady(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var wxReadyFunc = function () {
                readyCallback(Api);
            };
            if (typeof window.WeixinJSBridge == "undefined"){
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
                    document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
                }
            }else{
                wxReadyFunc();
            }
        }
    }
    return {
        version         :"2.0",
        ready           :wxJsBridgeReady,
        shareToTimeline :weixinShareTimeline,
        shareToWeibo    :weixinShareWeibo,
        shareToFriend   :weixinSendAppMessage,
        generalShare    :weixinGeneralShare,
        addContact      :addContact,
        showOptionMenu  :showOptionMenu,
        hideOptionMenu  :hideOptionMenu,
        showToolbar     :showToolbar,
        hideToolbar     :hideToolbar,
        getNetworkType  :getNetworkType,
        imagePreview    :imagePreview,
        closeWindow     :closeWindow
    };
})();
WeixinApi.ready(function(Api) {
    var wxCallbacks = {
        ready : function() {      },
        cancel : function(resp) {       },
        fail : function(resp) {       },
        confirm : function(resp) {
			typeof(wxData.shareDone)==="function"&&wxData.shareDone()
			},
        all : function(resp,shareTo) {    }
    };
    Api.shareToFriend(wxData, wxCallbacks);
    Api.shareToTimeline(wxData, wxCallbacks);
    Api.shareToWeibo(wxData, wxCallbacks);
    var elOptionMenu = document.getElementById('optionMenu');
    elOptionMenu.click(); // 先隐藏
    elOptionMenu.click(); // 再显示
    var elToolbar = document.getElementById('toolbar');
    elToolbar.click(); // 先隐藏
    elToolbar.click(); // 再显示
});
} 
window.requestAnimFrame=(function(){
return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function( callback ){window.setTimeout( callback, 1000 / 60 )}})();
