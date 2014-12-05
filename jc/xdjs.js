/*
xdjs: 心动js脚本库
版本：1.9 
最后一次修改是2011-12-1
把相应的功能模块化
2012-01-10 添加播放器 T.createFlash
2012-01-11 修改了tagSet()position参数，把原来的顺序修改成数字递增式
2012-01-12 修改了ajax类中的 back 返回参数，改为回调函数 callBack ,去掉 ajax.Over()的方法;
		   去掉返回结果this.Data， 改为直接参数输出。
		   修改了stop方法
2012-01-30 添加了opacity方法
		   添加了fileName方法
		   修改了domain方法
2012-02-24 修改noClick方法		

2013-11-18 新增getSearch([location])方法，取URL search字段   			
		   
*/
(function($$){
	var W=window,DO=document,DA=DO.all,DB=DO.body,DD=DO.documentElement,DC=DO.createElement,$={};
	function xdClass(obj){
		var T=this,_=obj||T;//如果没有参数哪将返回this
		
//DOM操作=========================================================================
		//删除对象属性并返回Boolean true/false
		T.delAtt=function(att){delAtt(T,att)}
		
		//返回对象自定义的属性
		T.getAtt=function(att){
			return getAtt(T,att)			
			};
			
		//设置标签的属性	
		T.setAtt=function(att,val){
			setAtt(T,att,val)
			}	
			
		//绑定事件
		T.addEvent=function(Eve,Fun,b){			
			if(!T["_"+Eve])T["_"+Eve]=[]
			//设置对应事件的一个数组变量，作用于下删除绑定事件时可以定位事件对应的方法
			addEvent(T,Eve,Fun,b)
			T["_"+Eve].push(Fun)
		};
		
		//删除事件
		T.delEvent=function(Eve){
			if(T["_"+Eve])delEvent(T,Eve,T["_"+Eve].pop());
			//删除最后一个事件
			};
			
		//取得一级子节点的集合					
		T.getChildNodes=function(tag){
			return getChildNodes(T,tag)
			}	
		
		//取得第一个子节点，非IE浏览器下要排除空节点		
		T.getFirstChild=function(tag){
			return getChild(T,tag)
			}	
				
		//取得最后一个子节点
		T.getLastChild=function(tag){
			return getChild(T,tag,1)
			}		
				
		//交换指定的标签对象
		T.swapNode=function(tag){
			swapNode(T,tag)
			}		
		
		//删除当前对象		
		T.removeNode=function(){
			removeNode(T)
			}		
		//创建标签
		T.createNode=function(tag,type,pos){
			return createNode(T,tag,type,pos)
			}		
		
		//获取对象属性
		T.getProperty=function(){
			return getProperty(T)
			}
			
		 //创建script标签
		T.createJS=function(content,type,pos){
			createJS(T,content,type,pos)
			 };
		
		//创建jsonp
		T.setJsonp=function(callback,type,pos,noSave){
			setJsonp(T,callback,type,pos,noSave)
			}
		
		//禁止选择文本
		T.noSelect=function(b){
			noSelect(_,b)
			}
			
		//禁止鼠标右键
		T.noContextMenu=function(b){
			noContextMenu(_,b)
			}
			
		//禁止复制
		T.noCopy=function(b){
			noCopy(_,b)
			}
		
		T.drag=function(run,B,ran){
			return drag(_,run,B,ran)
			}
				
		//创建下拉列表
		T.createSelect=function(opts,type,p){
			return createSelect(_,opts,type,p)
			}		
		
		//绑定列表事件
		T.events=function(event,fun){
			return events(T,event,fun)
			}		
				
		//获取指定对象的style
		T.getStyle=function(sty){
			return getStyle(_,sty)
			}		
		
		//创建style
		T.setStyle=function(css){
			setStyle(css,_)
			}
		//获取对象的宽高
		T.getObjWH=function(p){
			return getObjWH(_,p)
			}	
		
		//创建Link
		T.createLink=function(url){
			createLink(url,_)
			}		
		
		//创建Flash播放器
		T.createFlash=function(type,parme,ver,err,pos,boxType){
			createFlash(_,type,parme,ver,err,pos,boxType)
			}	
		T.onPropertyChange=function(fun,att){
			onPropertyChange(_,fun,att)
			}		
							
	T.number={		
	//返回小数点后的指定长度数字
		round:function(N){
			var n
			switch(N){
				case 0:n=Math.round(_);break;
				case -1:n=+(/^[^.]+/.exec(_.toString()));break
				default://判断返回截取值的类型
				var O=_.toString().split(".")//以 . 分割数值
				var C=O[0],F=O[1]			
				//判断截取数值的后一位小数
				if(F.substr(N,1)<5){
					n=Number(C+"."+F.substr(0,N))
					//如果小于5则截取到当前位置的数字 返回处理后的结果
					}else{	
					var e="0.",s
					for(var i=0;i<N-1;i++)e+=0 //设置N-1位小数
					e=e+1//取一个临时变量 如：0.0001
					s=(1+(+F.substr(0,N)))*e
					//计算得到小数点后面的数值的最大整数值
					//返回这个值的浮点运算值
					//s=(Math.ceil(F.substr(0,N)+"."+F.substr(N,1)))*e
					//取小数点后面第N位的数值，使之成为整数，再取后位使之成为小数
					//取这个数的整数,四写五入的方法
					//返回一个数值
					n=(s==1?Number(C)+s:Number(C+s.toString().substr(1,N+1)))
					}
				break
					}
			return n
				}
	//Number.Round(N)
	//返回截取小数点后指定长度位的数值; 四写五入
	//N: 截取数值的长度，默认为整数即没有小数点
	//Math.round((0.3*6))只能返回四五入后的整数
	}


//返回当前窗口可见宽高


//创建固定层并返回创建的对象
T.setFixedDiv=function(tag,T,L,ID,type){
	var tag=tag||"div",O,css="",id=ID?ID:"xdFixedDiv",ty="style|"+(type!=""?type:""),T=T||1,L=L||1
	/*
	tag:要创建的标签名称
	*/
	with(this){
	if(browserN="IE"&&browserV<7){
		 css="_position:absolute;_left:expression(documentElement.scrollLeft+"+L+");_top:expression(documentElement.scrollTop+"+T+")"
		setStyle("body{background-image:url(xd.jpg);background-attachment:fixed}")
	}else{css="position:fixed;top:"+T+"px;left:"+L+"px"}
		O=tagSet(tag,"id|"+id+","+ty+";"+css,"b2")
	return O
	}
 };	 
		
//创建style样式表
	T.styles=function(n){
		//返回操作styleSheets对象的方法
		var rule=(isNaN(n)?n:styleSheets[n])
		//判断n 返回的值一定是object
		return {
		rules:rule.rules,
		index:function(name){
			var l=rule.length
			for(var i=0;i<l;i++){
				if(l[i]==name)return i
				}
			},
//添加一条规则
		addRules:function(name,css,index){
			//index：在指定的样式表中上下文中的位置
			if(rule.addRule)
				rule.addRule(name,css,index);
				else
				rule.insertRule(name+"{"+css+"}",index)
			},
//删除指定的样式
		delRules:function(index){
			if(rule.removeRule)
				rule.removeRule(index);
			else
				rule.deleteRule(index)
			}
		}
	};
	
T.checkChange=function(checkbox){
	var check=_.checked;
	var box=checkbox,boxL=checkbox.length;
		for(var i=0;i<boxL;i++){
			box[i].checked=check
			}
	};	

//-------------------------------滚动条函数
T.scrollGet=function(T){
	 var v
	 switch(T){
		 case "w":
		 	v=(this.domMod=="C"?DE.scrollWidth:DB.scrollWidth)
		 break
		 case "h":
		 	v=(this.domMod=="C"?DE.scrollHeight:DB.scrollHeight)
		 break
		 case "l":
		 	v=(this.domMod=="C"?DE.scrollLeft:DB.scrollLeft)
		 break
		 case "t":
		 if(this.domMod=="C"){
		 	v=((browserN=="chrome"||browserN=="safari")?DB.scrollTop:DE.scrollTop)
		 }else{
			v=DB.scrollTop
			 }
		 break		 
		 }
	return v
 };

T.winType=function(t){
	 var v={}
	 if(this.domMod=="C"){
		 v={ "ww":DE.clientWidth ,//可见宽度,
			 "wh":DE.clientHeight,//可见高度度
			 "wl":window.screenLeft,//窗口位置
			 "wt":window.screenTop,//窗口位置
			 "sw":DE.scrollWidth,
			 "sh":DE.scrollHeight,
			 "sl":((browserN=="chrome"||browserN=="safari")?DB.scrollLeft:DE.scrollLeft),
			 "st":((browserN=="chrome"||browserN=="safari")?DB.scrollTop:DE.scrollTop)
		}
	}else{
			v.t=""
	}
	return v[t]		
	};
//返回窗口滚动条的XY坐标位置
T.scrollSet=function(str,n){if(str==0){return DE.scrollLeft=n}else{return DE.scrollTop=n}};
 //模拟事件	 
T.eventC=function(event){
	if(browserN=="msie")_[event]()
	else{
		var evt=DO.createEvent("MouseEvents");  
			evt.initEvent(event,true,true);
			_.dispatchEvent(evt)
	}
 };
//设置滚动条的位置
T.extend=function(n,f){
	// this[n]=f
	 f.apply(this)
/*	function b(){
		f.apply(f)
		}	
	 function d(){
		b()
	var i,s="",o=new F;
		for(i in o){
			f[i]=o[i]
			}
			//$("xdBug").value=s
		}
	d()	
	//f.apply(f)*/	
	};
T.setOpa=function(v){	
	opacity(_,v)
};
//鼠标滚轮事件		 
//binary 转 blob	
T.binaryToBlob=function(data){
    var bb=new BlobBuilder();
    var arr=new Uint8Array(data.length);
		for(var i=0,l=data.length;i<l;i++)
			arr[i]=data.charCodeAt(i);
		bb.append(arr.buffer);
    return bb.getBlob();
};	
//dataurl 转 binary 转 blob
T.dataUrlToBlob=function(dataurl){
    // data:image/jpeg;base64,xxxxxx
    var datas = dataurl.split(',', 2);
    var blob=T.binaryToBlob(atob(datas[1]));
		/*atob原生的base64解码 , atob(datas[1])复原二进制*/
		blob.fileType=datas[0].split(';')[0].split(':')[1];
		
    return blob;
};
//canvas 转 blob
T.toBlob=function(callback,type){
	var data=_.toDataURL(type);
	var blob=T.dataUrlToBlob(data);
	//blob.type=blob.fileType
	callback.call(T,blob)
	}	
}


//=========================================================================================================================
//返回浏览器的名称及版本号
Array.prototype.typeOf="array";
Object.prototype.typeOf="object";
//扩展insertAdjacentHTML 方法
if(window.HTMLElement){
	HTMLElement.prototype.typeOf="DOM";
	if(!HTMLElement.prototype.insertAdjacentElement){
	 HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode){
			switch (where){
				case 'beforeBegin':
					this.parentNode.insertBefore(parsedNode,this)
					break;
				case 'afterBegin':
					this.insertBefore(parsedNode,this.firstChild);
					break;
				case 'beforeEnd':
					this.appendChild(parsedNode);
					break;
				case 'afterEnd':
					if (this.nextSibling)this.parentNode.insertBefore(parsedNode,this.nextSibling);
						else this.parentNode.appendChild(parsedNode);
					break;
			 }
		 }

     HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr){
         var r = this.ownerDocument.createRange();
         r.setStartBefore(this);
         var parsedHTML = r.createContextualFragment(htmlStr);
         this.insertAdjacentElement(where,parsedHTML)
     }

     HTMLElement.prototype.insertAdjacentText = function (where,txtStr){
         var parsedText = document.createTextNode(txtStr)
         this.insertAdjacentElement(where,parsedText)
    	 }		
	}
}

function getBrowser(){
		var agent=navigator.userAgent.toLowerCase()		
		,OS,BN
		,os=["windows","ipad","ipod","iphone","android"],osL=os.length
		,bn=["(msie).([^;]+)","(firefox).([^\\s]+)","(safari).([^\\s]+)","(chrome).([^\\s]+)","(opera).([^\\s]+)"],bnL=bn.length
		,i=0;
		for(;i<osL;i++){
			n=os[i]
			if(agent.indexOf(n)>-1){  
				OS=n
				break
			}
		}
		for(i=0;i<bnL;i++){
			var re=new RegExp(bn[i]).exec(agent)
			 if(re){
				 return {N:re[1],V:re[2],OS:OS,touch:isTouch};
				 break 
			 }
		}
		return {N:"未知",V:0,OS:"0",touch:0}			
	 }
var browser=getBrowser()
	,browserN=browser.N,browserV=browser.V
	,isTouch="ontouchstart" in window
	,evtS="mousedown",evtM="mousemove",evtE="mouseup",evtC="click"
	,addEvent=Function,delEvent=Function,getAtt=Function,noPop=Function
	,getFunName=Function
	,addRule=function(styleObj,selector,css,index){
		styleObj.insertRule(selector+"{"+css+"}",index||0)	
	}
	,domMode=document.compatMode=="CSS1Compat"?"C":"B"
	,BlobBuilder,wURL,createObjectURL,MutationObserver,onPropertyChange
	,styleBG={border:["borderWidth","borderStyle","borderColor"]
					,background:["backgroundColor","backgroundImage","backgroundRepeat","backgroundAttachment","backgroundPosition"]} 
	,opacity=function(_,a){return _.style.opacity=a/100}
	,cssPrefix=(function(){  
    var style=document.documentElement.style,key=',webkit,Moz,o,ms,khtml'.split(','),i=0 ,il=key.length,cs;
		for(;i<il;i++){
			cs=key[i]
			if(cs+"Animation" in style){
				return cs
				break
				}
			}
	})()
	,getCurrentStyle=window.getComputedStyle?function(_){return window.getComputedStyle(_,null)}:function(_){return _.currentStyle}
	,tempTime=setInterval(function(){if(DO.body){DA=DO.all;DB=DO.body;DD=DO.documentElement;DC=DO.createElement;clearInterval(tempTime)}},0)
	,getStyleFun=function(_,sty){//	重新组合css样式，如margin-top
		if(styleBG[sty]){
			var type=styleBG[sty],str="",i=0,l=type.length,s;
				for(;i<l;i++){//循环取得对像的背景属性
					s=getCurrentStyle(_)[type[i]]
					if(s)str+=s+" "
					}
			}else{
				str=getCurrentStyle(_)[sty]
			}
		return str
	}
// 如果以function(){} 的方式定义方法，在全局中则只会以最后一次定义的方法定义
//对象事件操作-------------------------
var mutationString=["MutationObserver","MozMutationObserver","WebKitMutationObserver"]
while(i=mutationString.shift()){
	if(i in window){MutationObserver=window[i]}
}

if(MutationObserver){
	onPropertyChange=function(obj,fun,att){	
	var MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver
		,observer=new MutationObserver(function(){fun.call(obj)})
		,p=att||"";	
		observer.observe(obj,{
			attributes:true,
			//characterData:true,
			//childList:true,
			//attributeOldValue:true,
			// attributeFilter:[p]//只监听value属性,提高性能
		});	
	}
};
addEvent=function(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
delEvent=function(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};	
noPop=function(e){
	return e.preventDefault?function(e){e.preventDefault();e.stopPropagation()}
	:function(e){e.returnValue=false;e.cancelBubble=true};
}
if(Function.name){
	getFunName=function(f){return f.name}
	}else{
	getFunName=function(f){
		var n,str=f.toString(),i=str.indexOf("(");
			n=str.substring(8,i)
		return n
		}
	};
if(isTouch){
	evtS="touchstart";evtM="touchmove";evtE="touchend"
	}
switch(browserN){
	case "msie":
		opacity=function(_,a){return _.style.filter="alpha(opacity="+a+")"};
		cssPrefix="ms";
		addEvent=function(_,Eve,Fun){_.attachEvent("on"+Eve,Fun)};
		delEvent=function(_,Eve,Fun){_.detachEvent('on'+Eve,Fun||null)};	
		noPop=function(e){e.returnValue=false;e.cancelBubble=true}
		onPropertyChange=function(obj,fun){
			$.addEvent(obj,"propertychange",fun)
		}
		addRule=function(styleObj,selector,css,index){
			styleObj.addStyle(selector,css,index||0)	
		}
	break
	case "firefox":
	//	BlobBuilder=MozBlobBuilder;
		wURL=W.URL;
		cssPrefix="moz";
		MutationObserver=window.MozMutationObserver;
	break
	case "opera":
		cssPrefix="o";
		wURL=false//createBlobURL
	break
	case "chrome":
//		BlobBuilder=WebKitBlobBuilder;
		wURL=W.webkitURL;
		cssPrefix="webkit";
		MutationObserver=window.WebKitMutationObserver;
	break
	case "safari":
		cssPrefix="webkit";
	break
	}
//设置css前缀属性
browser.cssPrefix=cssPrefix;
/*扩展================================================================================================================================*/
function extend(){
	var tt=this;
	tt.browser=browser;
	tt.addEvent=addEvent;
	tt.addRule=addRule	
	tt.cookieGet=cookieGet;
	tt.cookieSet=cookieSet;
	tt.cookieDel=cookieDel;
	tt.cloneNode=cloneNode;
	tt.delEvent=delEvent;	
	tt.delAtt=delAtt;
	tt.domLoaded=domLoaded;
	tt.domReady=domReady;
	tt.getAtt=getAtt;
	tt.setAtt=setAtt;
	tt.getChildNodes=getChildNodes;	
	tt.getFirstChild=getChild;
	tt.getLastChild=function(_,tag,index){return getChild(_,tag,index)};	
	tt.swapNode=swapNode;
	tt.createNode=createNode
	tt.removeNode=removeNode;
	tt.getProperty=getProperty;
	tt.createJS=createJS;
	tt.setJsonp=setJsonp;
	tt.rgb2hex=rgb2hex;
	tt.noSelect=noSelect;
	tt.noContextMenu=noContextMenu;
	tt.noCopy=noCopy;
	tt.pageName=pageName;
	tt.domain=domain;
	tt.flashPlayer=flashPlayer;
	tt.createSelect=createSelect;
	tt.getFunName=getFunName;
	tt.getStyle=getStyle;
	tt.setStyle=setStyle;
	tt.createLink=createLink;
	tt.getObjWH=getObjWH;
	tt.typeOf=typeOf;
	tt.mouseWheel=mouseWheel;
	tt.getSearch=getSearch;
	tt.isTouch=isTouch;
	tt.events=events;
	tt.evtS=evtS;
	tt.evtM=evtM;
	tt.evtE=evtE;
	tt.cssPrefix=cssPrefix;
	tt.onPropertyChange=onPropertyChange;
	tt.trim=trim;
	tt.nextSibling=nextSiblingFun;
	tt.fullW2helfW=function(str,n){
		var news="",l=str.length;// "65281"是"！"，"65373"是"｝"65248"是转换码距"
		for(var i=0;i<l;i++){
			t1=str.charCodeAt(i);//返回这个位置字符的Unicode值
			if(n)
			news+=((t1>=34&&t1<127)?String.fromCharCode(t1+65248):str.charAt(i))//全角转半角
			else
			news+=((t1>=65281&&t1<65375)?String.fromCharCode(t1-65248):str.charAt(i))//半角转全角
		}
		return news		
	};
	tt.drag=drag;
	
//数组的一些方法
	tt.array=function(oldArr){
//多数组合成		
		return {
		concat:function(){
		//数组合成，隐性参数
		var a=arguments,l=a.length;
		//arguments 需要合成的数组项目
		for(var i=0;i<l;i++){
			Array.prototype.push.apply(oldArr,a[i])
			}
		},
//复制数组
		clone:function(newArr){
			//arr=[] 
			/*
			为什么不采用赋空值的方法？
			如果此时赋空值，哪么下面的操作将不会是原数组而是新的变量
			*/
			for(;oldArr.length;oldArr.shift())oldArr.shift()	
			Array.prototype.push.apply(oldArr,newArr)
		},
//删除指定的数组元素
		del:function(o,g){
		//o要删除的元素，
		//g可选要删除的方式
		//0:默认为空，即按顺序删除找到的第一个相同元素,
		//1删除数组中所有相同的元素 
		//-1删除数组中最后一个相同的元素,
		var g=g||0,arr=(g==-1?oldArr.reverse():oldArr);
		for(var i=0,l=oldArr.length;i<l;i++){
			if(oldArr[i]==o){
				oldArr.splice(i,1)//删除当前索引上的元素
				if(g!=0)
					break
					i-- //后退一位
				}
			}
		//this.obj=(g==-1?_.reverse():_)	
		g==-1?oldArr.reverse():oldArr
		},				
//返回元素在数组中的索引				
	index:function(o){
		var l=oldArr.length,i=0
		for(;i<l;i++)	
			if(oldArr[i]==o)
				return i;
		},
//返回数组中指定元素的个数				
	items:function(o){
		for(var s=0,i=0,l=oldArr.length;i<l;i++){
			if(oldArr[i]==o)s++
			}
		return s
		},
//删除数组中重复的元素				
	filter:function(){
		for(var i=0;i<oldArr.length;i++){
		//	alert(i+"\n要删除的: "+_[i]+"\n"+_+"\n"+_.length)
			for(var s=i+1;s<oldArr.length;s++){
				if(oldArr[i]==oldArr[s]){
			//	alert(_[i]+"==="+_[s]+"\n"+_)
					oldArr.splice(s,1)
					//记录这次已删除了
					s-=1
					}
				}
			}
		//this.obj=_
	},
//对数组进行排序				
	sort:function(){
		oldArr.sort(function(){var arg=arguments;return arg[0]-arg[1]})
		//对比核心		
		}				
	}
}
	tt.getSearch=getSearch;
	tt.splitType=splitType;//分割属性	
	tt.subStr=function(str,L,u){
			//L是要截取的字节数
			//只汉字[\u3E00-\u9FFF]
			//所有双字节字符[\x00-\xff]
			var i=I=N=S=0,V,U=u||"",l=str.length;
			var re=new RegExp("[^\x00-\xff]","")
			//正则的双字节判断
			if(/[^\x00-\xff]/g.test(str)){
				//判断是否存在双字节
				while(i<l){
				//alert(i+"\n"+this.charAt(i)+"\n"+re.test(this.charAt(i)))
				//强烈提醒：测试时不要重复使用/[^\x00-\xff]/g.test(this.charAt(i))
				//不管是alert(/[^\x00-\xff]/g.test())还是其它方式测试，正则都运行了一次
				if(re.test(str.charAt(i))){I+=2}else{I+=1}
				//如果当前的字符串为双字节加2单字节加1
				if(I>L){V=str.substr(0,i)+U;break}
				//判断是否在取值范围内,超长即跳出
				i++
				}
			 if(!V)V=str.substr(0,L)
			}else{//如果目标字符串不存在双字节字符则直接截取
				V=(str.length>L)?str.substr(0,L)+U:this
			}	
			return V		
		}
	tt.setAjax=function(a,b,c,d,e){
		return new function(){
			var t=this;
			t.method=a||"get";      //请求的方法 POST GET
			t.action=b;      //请求对象的地址如果是以方式则需要加参数
			t.async=(c!=undefined?c:true);  //true:异步 false:同步 默认是异步
			t.cache=d||0;        //是否缓存 0:缓存 1:不缓存 默认是缓存
			t.callBack=(typeOf(e)=="function"?e:0)         //是否输出数据 1:输出 0:不输出
			t.data="";	//data 用于post提交时的数据
			t.Data="";  //Data 用于返回结果后的数据
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.xmlObj=null;	
			t.send=function(xmlCache){
			var xmlhttp=t.xmlObj||xmlObj();
			  xmlhttp.open(t.method,t.action,t.async);
			/*
			创建或设置对象 ，尤其注意如果 xmlhttp对象在初始建立，在页面加载同时发送请求，xmlhttp.readyState会返回0，这个问题容易引起错误
			所以初始化些对象时一定是在第一次调用时在同一区域创建			
			*/
			  if(t.method.toUpperCase()=="POST"){
				  if(t.cache)xmlhttp.setRequestHeader("Cache-Control","no-cache")
				  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
				}else{
				if(t.cache){
					var c="cache="+Math.random()
						c=(t.action.indexOf("?")!=-1?"&":"?")+c
						t.action+=c
					}
					t.data=null
				}
				 
				  xmlhttp.onreadystatechange=function(){
					  switch(xmlhttp.readyState){					
						case 2:t.Send();break;
						
						case 4:
						  if(xmlhttp.status===200||xmlhttp.status===304){
							  if(t.callBack)t.callBack.call(t,xmlhttp.responseText) ;
							  t.xmlObj=(xmlCache?xmlhttp:null);
								xmlhttp=null	 
							 }else{
							  if(typeOf(t.Err)=="function")t.Err.call(t)
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
		};	
	
	//禁止事件冒泡	
	tt.noPop=function(e){noPop(e);return false};	
	
	}
/*extend结束了------------------------------------------------------*/	


//FUNCTION ==============================================================================================================================

window.$=function(arg,selector,tag,label){
	var _,D=document,o=(typeof(arg)=="string"?D.getElementById(arg):arg),sel=selector||0;
		//判断arg的属性，如果是字符串则
		switch(sel){
			case 0:
				_=o;
			break
			case 1:
				_=D.getElementsByName(arg)
			break
			case 2:
			if(D.getElementsByClassName){
				_=o.getElementsByClassName(tag)
				}else if(D.querySelector){
				_=o.querySelectorAll("."+tag)
				}else{
					var tags=o.getElementsByTagName(label?label:"*"),tl=tags.length,_=[],q=0,_tag,reg=new RegExp;
						reg.compile(t+"\\s"+t+"|"+t+"\\s|\\s"+t+"\\s","ig")
					for(var i=0;i<tl;i++){
						_tag=tags[i];
						if(_tag.className){
							_[q]=_tag;
							q+=1
						}
						reg.test()
					}
				}
			break
			case 3:
				switch(tag){
					case "checkbox":case "radio":case "number":case "range":case "color":case "text":
						var t=o.getElementsByTagName("input"),tl=t.length,i=0,_=[];
							for(;i<tl;i++){
								if(t[i].type==tag)_.push(t[i])
								}
							t=null;	
					break;
					default:
						_=o.getElementsByTagName(tag);
					break	
					}
			break
			}
	
		
	//if(!selector)
	xdClass.apply(_);
	return _?_:null;
}

//返回对象所属类型
function typeOf(_){
			var a=typeof(_)
				if(a=="object"){
					if(_===null){
						a=null
					}else{		
						a=_.typeOf||"DOM"
					}
				}
			return a
		};	
if(!window.JSON){
	window.JSON={
		parse:function(str){return eval("("+str+")")},
		stringify:function(obj,value){
			var i,str="",cont;
			for(i in obj){
				cont=obj[i];
				
			//	str+="{"+i+":";
				//typeOf()
				
				}
			return 
			}		
		}
	}	



//对象属性操作------------------------------------------------
function getAtt(_,att){
	return att=="class"?_.className:_.getAttribute(att)
	}
//删除指定属性	
function delAtt(_,att){
	_.removeAttribute(att)
	}
//设置对象指定属性	
function setAtt(_,att,val){
	if(typeOf(att)=="object"){
		for(var i in att){
			if(att.propertyIsEnumerable(i))
				Att(i,att[i])	
			}
		}else{	
			Att(att,val)
		}
	function Att(att,val){
			switch(att){
				case "style":_.style.cssText=val;break;
				case "classname":_.className=val;break;
				case "html":_.innerHTML=val;break;
				default:_.setAttribute(att,val);break
			}
		}	
	};
	
//获取对象属性--------------------------------------------
function getProperty(_){
	var w=_.offsetWidth,h=_.offsetHeight,l=0,t=0;	
	do{
		l+=_.offsetLeft;
		t+=_.offsetTop;		
		}while(_=_.offsetParent)
	return {width:w,height:h,left:l,top:t};	
	}


//获取子一级子节点----------------------------------------
function getChildNodes(_,tag){
	var nodes=[],node=_.firstChild;//找到第一个子节点
	if(tag){
		//指定标签
		tag=tag.toUpperCase();
		while(node){ 
			if(tag==node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}else{
		//任何标签
		while(node){ 
			if(node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}
		return (nodes==""?null:nodes); 	
	};
	
//取第一个字节点----------------------------------------
function getChild(_,tag,index){
	var node=index?_.lastChild:_.firstChild;//找到第一个子节点
	if(tag){
		tag=tag.toUpperCase();
		while(node){
			if(node.tagName==tag)break
			node=index?node.previousSibling:node.nextSibling;
		}
	}else{
		while(!node.tagName){			
			node=index?node.previousSibling:node.nextSibling;
		}
	}
		return node	||null
	}	
function nextSiblingFun(_){
		while(_=_.nextSibling){
			if(_.nodeType===1)return _	
		}
		return null
	}
	
//交换标签----------------------------------------------
function swapNode(_,tag){
	var box1=_.parentNode,box2=tag.parentNode,//取得对象的父级节点
	p1=_.nextSibling,p2=tag.nextSibling;//取得节点的位置
	box1.insertBefore(tag,p1);
	box2.insertBefore(_,p2);
	}
	
//删除标签-----------------------------------------------
function removeNode(_){
	var box=_.parentNode
	box.removeChild(_)
	
	}
	
//创建新标签---------------------------------------------
function createNode(_,tag,type,position){
    //type属性包含了标签所有的属性和CSS样式以及事件
	var p=position||0; //b1:标签开始的前面,b2:标签开始的后面,e1:标签结束的前面,e2:标签结束的后面
	var node=(typeof(tag)=="string"?DO.createElement(tag):tag)//创建标签对象
		if(type)setAtt(node,type)
	//目标框架即在哪个标签中添加这个标签
	//在创建对象后立即添加属性，可以减少错误
		switch(p){ 
			case "p1": //标签开始的前面
				_.parentNode.insertBefore(node,_); 
				break; 
			case "p2": //标签开始的后面
				_.insertBefore(node,_.firstChild); 
				break; 
			case "p3"://标签结束的前面
				_.appendChild(node)
				break; 
			case "p4"://标签结束的后面
				if(_.nextSibling)//如果父级标签有兄弟节点 
					_.parentNode.insertBefore(node,_.nextSibling); 
					//父级标签的兄弟标签位置
				else 
					_.parentNode.appendChild(node); 
					//父级标签内，即标签结束前
			break;
			default:
			var child=getChildNodes(_)
				if(child){//判断是否有子节点
					if(child[p])_.insertBefore(node,child[p]); 
				}else{
				_.parentNode.insertBefore(node,_.nextSibling)
				}
			break
			 
		} 
	return node
	//返回这个标签对象
 };

//复制节点
function cloneNode(_,b){
	return _.cloneNode(b)
	}

//创建script标签-----------------------------------
function createJS(_,content,type,p){
	var js=createNode(_,"script",type,p);
		js.text=content;
	}
	
//创建link标签-----------------------------------	
function createLink(url,_){
	var link=DO.createElement("link")
		link.href=url;
		link.rel="stylesheet";
		_?_.appendChild(link):DD.firstChild.appendChild(link)
	}

//使用jsonP的方法-----------------------------------
function setJsonp(_,callback,action,type,p,noSave){	
	return new function(){
	var js=createNode(_,"script",type,p||"p3")
		,fun=(typeof(callback)=="function"?callback:Function);
		
	 js.onreadystatechange=js.onload=function(e){
		 var read=js.readyState
		 if(read){
			if(read=="loaded")fun(1)
		 }else{
			 fun(e,js.src)
			 }
		 if(noSave)removeNode(js)	 
		 }
	js.onerror=err
	function err(status){
		fun(0,js.src);removeNode(js)
		}
	this.send=function(){
		js.src=action;
		}	
	}
}

//创建select选项列表----------------------------------------
function createSelect(box,opts,type,p){
	var sel=createNode(box,"select",type,p);
		if(typeOf(opts[0])!="object")opts=arr2opt(opts);
		for(var i=0,l=opts.length;i<l;i++){
			opt=opts[i];
			sel.options[i]=new Option(opt.v,opt.t)
		}
	return sel
	}

//创建style------------------------------------------------
function setStyle(css,_){
	var sty=DO.createElement("style")
	sty.setAttribute("type","text/css");
	sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css
	_?_.appendChild(sty):DD.firstChild.appendChild(sty);
}
	
//创建xmlObj对象-----------------------------------
function xmlObj(){
	try{
		return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
		}catch(e){
		return new XMLHttpRequest()
	}	
}

//禁止选择文本-------------------------------------------------
function noSelect(_,b){
var v=(b?["","",""]:[function(){return false},"on","none"]);
			_.onselectstart=v[0];
	if(typeOf(_)!="DOM")_=_.documentElement
	switch(browserN){
		case"opera":
			_.unselectable=v[1]
		break
		case"chrome":case"safari":
			_.style.WebkitUserSelect=v[2]
		break
		case"firefox":
			_.style.MozUserSelect=v[2]
		break
	}
	//window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
};

//获取指定页面的域----------------------------------------
function domain(str){
	var s=str||location.host;
		return s.replace(/[\w]\/.+|:[^\/].+/g,'')	
	}

//当前页面名称--------------------------------------------
function pageName(str){
		return unescape(str?str.replace(/^.*\/+|[?#].*/g,""):location.pathname.replace(/^.*\/+/g,""))
	}

// 禁止右键-----------------------------------------------
function noContextMenu(_,b){
	_.oncontextmenu=function(){return (b?"":false)}
	};
	
//禁止复制------------------------------------------------
function noCopy(_,b){
	_.oncopy=function(){return (b?"":false)}
	}
	
//颜色转换------------------------------------------------
function rgb2hex(rgb,n){
	//n：默认为空 rgb转hax
	//为1 hax转rgb
	var str="",c;
		if(!n){
		rgb.replace(/(\d+)/g,function($1){
									   c=(+$1).toString(16);
									   //将当前值转换成16进制的值
									   str+=($1<16?"0"+c:c)
									   //执行拼接
									  })
			str="#"+str						  
		}else{
			c=rgb.replace("#","")
			//去掉颜色值中的#
			c.replace(c.length<6?/./g:/../g,function($1){
				str+=","+parseInt($1.length<2?$1+$1:$1,16).toString(10)
				})
				if(n==1)str="rgb("+str.substr(1)+")"
				else
				str=str.substr(1)
			//去掉第一个 ， 
			}
		return str
	}
	
//去字符串两的空格
function trim(str){
	return str.replace(/^\s+|\s+$/g,"")
	}
//String.Trim(N)
//字符串空格去除函数
//N:可选项,去空格类型,默认去除首尾空格
//1:去左边空格，2：去右边空格	


//数组转options----------------------------------------------
function arr2opt(arr){
	for(var i=0,l=arr.length,opts=[],opt;i<l;i++){
		opt=arr[i]
		if(typeOf(opt)=="object")opt=JSON.stringify(opt) 
		//判断如果是对象刚转换成字符串
		opts[i]={v:opt,t:opt}
		}
		return opts
	}

//events------------------------------------------------------
function events(lists,evt,fun){
	var i=0,l=lists.length;
		for(;i<l;i++){
		(function(i){
			lists[i]["on"+evt]=function(e){fun.call(this,e||event,i)}
			//addEvent(lists[i],events,function(e){fun.call(lists[i],e,i)})
			}(i))
	}
}



//getStyle获取css内容----------------------------------------
function getStyle(_,sty){
	return getStyleFun(_,sty)	
	}	
	



//获取当前浏览器中falsh播放器的版本
function flashPlayer(){
	var avo,v,ve;
	if(browserN=="msie"){
		try{
			avo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			v=avo.GetVariable("$version");
			ve=v.replace(/[a-z\s]/ig,"").split(",")
			}catch(e){
				ve=0
				}
	}else{
		var a=navigator.plugins["Shockwave Flash 2.0"],b=navigator.plugins["Shockwave Flash"];
		if(a||b){
			v=(b||a).description;ve=v.replace(/[a-z]/ig,"").replace(/^[\s]+/ig,"").match(/\d+/ig)
		}else{
			ve=0
		}
	}return ve
}
//版本号对比	
function versionComparison(a,b,c){
		var d=(typeOf(a)=="array"?a:a.match(/[a-z0-9A-Z]+/g));
		var f=b.toString().split("."),v=false,l=d.length,i=0,c=(c=="<"?0:1);
		//默认对比参数c是 > 即如果 c = < 则对比取反
		for(i;i<l;i++){
			if(+d[i]>+f[i]){
				v=true;
				break
			}
		}
		return c?v:!v
	};	
function locusCount(p,S,E){
	var tem,s=S,e=E,_=[],i=-1;
		if(p<1){
		if(p<=0)return false
			for(;s!=e;){
				tem=p*(e-s)
				tem=(tem>0?Math.ceil(tem):Math.floor(tem)) 
				s+=tem;
				_[i+=1]=s;
			}
		}else{
			tem=Math.ceil((e-s)/p);
			if(e<s){
					for(;s>e;s+=tem){_[i+=1]=s}
				}else{
					for(;s<e;s+=tem){_[i+=1]=s}
				}
		};
		if(_[_.length-1]!=e)_.push(e)
			return _
	};	
//获取对象的宽高
function getObjWH(_,p){
		var wh={}
		if(typeOf(_)=="DOM"){
			wh={w:_.offsetWidth,h:_.offsetHeight}
		}else{
			wh.w=DD.scrollWidth;
		 	wh.h=Math.max(document.body.scrollHeight,DD.scrollHeight)		
		}
		//如果有参数则根据参数返回反之返回对象	
		 return wh[p]||wh
	 // this.domMod//松散兼容模式返回	
	}	

//-------------------------------------------------------------------------------------------------

//绑定对象拖动的方法	
function drag(_,obj,run,B,ran){
/*     R:0\1 初始运行状态，默认为不可拖动
	   B:0\1\2 设置绑定鼠标键值，默认是0即鼠标左键
	  为了不导致对象拖动时失去焦点所以要定制全局鼠标变量
	   F:{DM:function(){}
	     DD:function(){}
		 DU:function(){}
		 }
	  ran:移动范围限定，默认为0即没有限定
	  ran:{L:left,
		  R:right,
		  T:top,
		  B:bottom
		  }   
	  */
	//  return new function(){
			/*
				Fun	程序运行时触发的函数
				sX/sY  鼠标按下的位置
				eX/eY  鼠标移动时的实时位置
				oLeft/oTop 对象当前Left/Top的位置
				nLeft/nTop 对象需要停止的Left/Top位置
				ini: 初始化的一个值，限定
				DB.setCapture(false);DB.attachEvent("onlosecapture",DU)方法只使用一次,这个方法在this.DU()内
			*/
		var evtS,evtM,evtE,evtC="click",DO=document,Fun,sX=sY=eX=eY=oLeft=oTop=nLeft=nTop=0,theObj=obj||_;
		 if(isTouch){evtS="touchstart";evtM="touchmove";evtE="touchend"}else{evtS="mousedown";evtM="mousemove";evtE="mouseup"}				
			  var T={B:B||0,range:ran||0
			  ,run:function(){
				  addEvent(_,evtS,oDD);
				  if(typeof(T.mRun)=="function")T.mRun.call(_)
			  }
			  ,stop:function(){
				  unBind();
				  if(typeof(T.mStop)=="function")T.mStop.call(_)
				  }
			  ,unBind:function(fun){
					unBind();
					T=null;
					if(typeof(fun)=="function")fun()
				  }
				}		
			,mRun,mStop,mDOWN,mUP
			//对应相关事件
			,DM=function(e){				
				var ev=e,range=T.range,RA=range,sXP,eXP,sYP,eYP,x,y;
				if(typeOf(range)=="array"){
					RA=range[0]
					};
				if(isTouch){ev=e.touches[0]}	
					x=ev.pageX;y=ev.pageY;
					eX=x-sX;eY=y-sY					
					//对象移动值=计算对象当前位置与鼠标移动值的和
					nLeft=oLeft+eX,nTop=oTop+eY
					//调用对象移动函数
					switch(RA){
						case "XY":
							//限定鼠标移动范围
							sYP=range[1];eXP=range[2];eYP=range[3];sXP=range[4]

							if(nLeft<sXP)
								nLeft=sXP
							else if(nLeft>eXP)
								nLeft=eXP
							theObj.style.left=nLeft+"px"
							if(nTop<sYP)
								nTop=sYP
							else if(nTop>eYP)
								nTop=eYP
							theObj.style.top=nTop+"px"				
							
						break;
						case "X":
							sXP=range[1];eXP=range[2];
							if(nLeft<sXP)
								nLeft=sXP
							else if(nLeft>eXP)
								nLeft=eXP
							theObj.style.left=nLeft+"px"
						break
						case "Y":
							sYP=range[1];eYP=range[2];
							if(nTop<sYP)
								nTop=sYP
							else if(nTop>eYP)
								nTop=eYP
							theObj.style.top=nTop+"px"
						break
						default:
					//做自由移动
						theObj.style.left=nLeft+"px"
						theObj.style.top=nTop+"px"
						break
					}	
					if(typeof(T.mMOVE)=="function")T.mMOVE.call(theObj,e,eX,eY,nLeft,nTop)
					noPop(e)
					return false
			}
		
			//鼠标弹起
			,DU=function(e){
				//针对IE释放setCapture鼠标事件捕获
				if(DA)DB.releaseCapture();
					//注销绑定的全局鼠标事件
					unEvent()
					if(typeof(T.mUP)=="function")T.mUP.call(theObj,e)
				//	noSelect(DB,1)
			}
	
			//鼠标按下
			,DD=function(e){//记录鼠标起点位置
				var ev=e
				if(isTouch){ev=e.touches[0]}
				sX=ev.pageX;sY=ev.pageY
				
				if(DA){
					T.ini=0
				//只执行下面的方法一次
				//这样设置是为了捕获鼠标移出浏览器窗口后的动作事件
				//如果使用setCapture(true)会出现页面假死现象
					DB.setCapture(false)
					//DB.attachEvent("onlosecapture",T.DU)
				}else{
					//禁止非IE的鼠标事件，选择页面上的内容
					window.getSelection().removeAllRanges()
				}
				//禁止鼠标选择文本window.getSelection?window.getSelection().removeAllRanges():
				//stopDefault(e)//取消事件冒泡相当于禁用了文字选中功能
				noPop(e)
				return false
			}
	
		//对象上的鼠标事件=========================
			,oDD=function(e){
				if(mouseButton(e)==T.B){
					var position=theObj.getBoundingClientRect()
					//判断是否是指定的鼠标键值
					oLeft=position.left
					oTop=position.top
					theObj.style.position="absolute"
					//注册添加全局鼠标事件
					addEvent(DO,evtE,DU)
					addEvent(DO,evtM,DM)
					addEvent(DO,evtS,DD)
					//noSelect(DB,1)
					//禁止鼠标选择文字
					if(typeof(T.mDOWN)=="function")T.mDOWN.call(theObj,e)
				}
			}	
			//解除事件绑定
			function unEvent(){
				delEvent(DO,evtS,DD);
				delEvent(DO,evtM,DM);
				delEvent(DO,evtE,DU);
			}
			//解除所有事件
			function unBind(){
				unEvent()
				delEvent(_,evtS,oDD);
				}
	//运行
			if(run)T.run()	
			//addEvent(document,evtM,stopDefault)
			//document.onselectstart=function(){return false}
			return T
	 // }
};
//参数 可选 
//如果定义var obj=D("obj")[1].drag(1)则输出的是this
//反之分两步 
//1、var obj=D("obj")[1]
//2、obj.drag()
//如果需要改变属性可以使用obj.type
//对外输出属性与方法
//run :是否可以运行拖动
//range :限制移动范围	 	 

//分割对象的属性
function splitType(e,cl){
	var i,s="",sp=cl||"\n",num=1;
	for(i in e){
		switch(i){
			case "outerHTML":case"innerHTML":case "textContent":case "outerText":
				s+=cl+(num++)+"."+i+"..内容"
			break
			default:
				s+=cl+(num++)+"."+i+".."+e[i]
			break
			}
		//if(!Object.prototype.propertyIsEnumerable(i))
		}
	return s	
};	
//DOM加载完成的方法
function domLoaded(fun){
		addEvent(DO,"DOMContentLoaded",fun)
	}
function domReady(dom,fun){
	var i=0,time=setInterval(function(){
		if((i++)>5000){alert(dom+"加载超时或失败");
			clearInterval(time);
			}
		if(eval(dom)){
			clearInterval(time);			
			fun();
			arguments[0]=null;arguments[1]=null
			}		
		},1)	
	}	
//鼠标滚轮事件	
function mouseWheel(_,fun,speed){
	 var T=this,_=_,count=0;T.rFun=fun||Function;
		//rFun 滚动时要触发的函数
		 T.speed=(isNaN(speed)?3:speed);//设置鼠标滚动的灵敏度，默认为3，最小为0
		 var Fun=function(e){
			var p={}
			 if(count>T.speed){
				 count=0
				 p.s=e.detail||-(e.wheelDelta) //获取原始键值
				 p.k=(p.s>0?1:-1)
				 T.rFun.call(p)
				 noPop(e)			 
				 return false
			}
			count+=1
		 }	
		 var Eve=(browserN=="FF"?"DOMMouseScroll":"mousewheel");	 
		 T.run=function(){addEvent(_,Eve,Fun)}	 
		 T.stop=function(){delEvent(_,Eve,Fun)}
		 return T
 };	
//创建flash播放器---------------------------------------------------
function createFlash(_,type,parme,ver,err,pos,boxType){
	var v1=flashPlayer(),ver=ver||0,htm,p="",plug=DA?"classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' ":"type='application/x-shockwave-flash' ";
	if(v1){
		if(versionComparison(v1,ver)){//对比版本
			if(typeOf(type)=="object"){
				var attribute="";
				for(var i in type){
					if(type.propertyIsEnumerable(i)){
						attribute+=i+"='"+type[i]+"' "
						}
					}
				}

				if(typeOf(parme)=="object"){
					for(var e in parme){
						if(parme.propertyIsEnumerable(e)){
							p+='<param name="'+(e=="src"?"movie":e)+'" value="'+parme[e]+'">';
							};
						}
					}				
				htm='<object '+plug+attribute+'>'+p+'<param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="quality" value="high" /></object>'

			var div=createNode(_,"div",{html:htm},pos);
			var swf=div.childNodes[0];
			if(boxType){
				setAtt(div,boxType)
				setAtt(div,boxType)
			}else{
				div.parentNode.insertBefore(swf,div)
				div.parentNode.removeChild(div)					
			}
				return swf
		}else{
			htm=str.b()||""
			}
	}else{
		htm=str.a()||""
	}
//this.htm=htm;this.id=id
} 

//获取当前页面的search部分
//function getSearch(name,str){
//	var s=str||location.search
//		,r=new RegExp(name+"=([^#&]+)","i"),result=s.match(r)||[]
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
	
function cookieSet(key,val,time,tPath,tDomain){
	var d=new Date(),t
	switch(time){
	case 1:t=86400;break;//日
	case 2:t=2678400;break;//月
	case 3:t=32140800;break;//年
	case 4:t=1000000000;break;//相对的无限
	default :t=time}//以外的用秒计算
	d.setTime(d.getTime()+(t*1000));
	var expires=(t?"; expires="+d.toGMTString():"");
	var path=(tPath?"; path="+tPath:"");
	var domain =(tDomain?"; domain="+tDomain:"");
	DO.cookie=escape(key)+"="+escape(val)+expires+path+domain
 };	 
 
//读取cookie如果键值存在返回key，反之返回null
function cookieGet(key){
	 var V=document.cookie
	 var Reg1=new RegExp("\\b"+key+"=[^;]+","g");
	 var Reg2=new RegExp("\\b"+key+"=","g");
	 var k=V.match(Reg1)
	 if(!k)return "null"
	 var val=k.toString().replace(Reg2,"")
	 //val=(key.length>1?val.split(","):val)
	 return unescape(val)
 };
//删除指定的cookie
//删除指定的cookie
function cookieDel(key,path,domain){
	var a1=path,a2=domain;
	var expires="; expires="
	var path=(a1?"; path="+a1:"");
	var domain=(a2?"; domain="+a2:"");
	DO.cookie=escape(key)+"=null"+expires+path+domain
 };	
//统一鼠标按键值
function mouseButton(e){var k=e.button;if(e.button==undefined)return 0;return browserN=="msie"?[0,0,2,3,1][k]:k};

//日期操作的方法
function dateMethod(date){
	/*
	如果只有年份哪么返回的将是8小时的
	如：new Date("2012") >> Sun Jan 01 2012 08:00:00 GMT+0800 (中国标准时间)
	如果指定了日期则返回当前日的零时
	如：new Date("2012-1-1") >> Sun Jan 01 2012 00:00:00 GMT+0800 (中国标准时间)
	*/
	function isDate(date){return Date.parse(date)};
	function dateDiff(D,nD){
		var H=D.getHours(),nH=nD.getHours(),M=D.getMinutes(),nM=nD.getMinutes()
				 ,num=nD-D,day=(num/864e5).toString(),hour=nH-H,minutes=nM-M,s;
				if((s=day.indexOf("."))>-1)day=+day.substr(0,s)
				if(hour<0)hour+=24
				//计算实际显示的小时差
				//console.log("相隔："+day+"天====\n"+hour+"小时===="+H+"==="+nH+"\n"+minutes+"分钟==="+M+"==="+nM)
				return [day,hour,minutes]
		}
	function firstDayOFmonth(D){
		var y=D.getFullYear(),m=D.getMonth()
		return new Date(y,m).getDay()
		}	
	if(isDate(date)){
		var D=new Date(date),year=D.getFullYear();
	 return t={
		 theDays:function(part){	
		 //返回指定日期中的天数
		 	var s=365
		 	switch(part){
				case "year":
				//当前年有多少天
				 	if(t.isLeapYear())s=366
				break	
				case "month":	
				//当前月有多少天
					s=[31,(t.isLeapYear()?29:28),31,30,31,30,31,31,30,31,30,31][month]
			    break
				case "weekOFyear":
				//当前日期是当年的第几周
					var tYear=new Date(year,0,1)
						,days=dateDiff(tYear,D)[0]
					//计算与当年的第一天的日期差
						,day=tYear.getDay()
					//判断1月1日是周几
						,s=Math.floor((days-(7-day))/7)+(day==0?2:1)
					//计算相隔的日期差减去 (7-day)起始周开始的日期	与7天的倍数,如果1月1日是起始日期则2反之+1
					//	alert(day+"\n"+days+"\n"+(7-day))
				break
				case "weekOFmonth":
				//当前日期是当月的第几周
					var m=D.getMonth(),d=D.getDate(),nD=new Date(year,m,1)
						,day=nD.getDay()
						s=Math.floor((d-(7-day))/7)+(day==0?2:1)
				break
				}
				return s
			}
		 ,firstDayOFmonth:function(){
			 //返回当前月份的第一天是周几
			return firstDayOFmonth(D)
			 }	
		 ,isLeapYear:function(){	
		 //判断是否是闰年
			return (year%400==0||(year%4==0&&year%100!=0))
			}
		 ,dateDiff:function(nDate){
			 //如果没有指定时间则取默认值8:00
			 if(isDate(nDate)){
				return dateDiff(D,new Date(nDate))				 
				 }
			 }	
		}
	}else{
		return{}
		}
		
function dateAdd(num,name,dt){//计算新的时间
	var date=dt?new Date(dt):new Date(),_second=1000,_minute=60*_second,_hour=60*_minute,_day=24*_hour,_week=7*_day
		,year,month,week,day;
		switch(name){
			case "year":
				date=getTD(date,"FullYear",num)
			break
			case "month":
				date=getTD(date,"Month",num)
			break
			case "week":
				date=getTD(date,"Time",num*_week)		
			break
			case "day":
				date=getTD(date,"Time",num*_day)
			break
			}
			return input(date)
	function getTD(_date,fun,range){		
			var d=_date["get"+fun]()+range					
				,date=new Date();
				date["set"+fun](d)	
				,year=date.getFullYear()
				,month=date.getMonth()+1
				,day=date.getDate();
				return date		
		}
	function input(_date){//输出指定格式
		var year=_date.getFullYear()
			,month=_date.getMonth()+1
			,day=_date.getDate();	
		return year+"-"+month+"-"+day;	
		}	
	}
	//console.log(dateAdd(10,"year"))
	//console.log(dateAdd(10,"month"))
	//console.log(dateAdd(1,"week"))
	console.log(dateAdd(1,"day"))
}
//console.log(dateMethod("2012-12-30").firstDayOFmonth())
//console.log(dateMethod("2012-5-6").theDays("weekOFmonth"))
//console.log(dateMethod("2012-12-30").theDays("weekOFyear"))
//console.log(dateMethod("2013-05-1").dateDiff("2012"))
extend.apply($);
//console.log($)
$$&&(window[$$]=$);
})("$");
