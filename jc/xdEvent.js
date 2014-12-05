/*
事件中心
*/
function xdEventFun(options){
	var t=this,_options=options||{}
		,DO=document
		,isTouch=('ontouchstart' in window)
		,MES="mousedown",MEM="mousemove",MEE="mouseup"
		,TES="touchstart",TEM="touchmove",TEE="touchend"
		,CLICK="click"
		,_dragObj 		//可拖动的对象
		,_isDrag		//可拖动变量
		,_action=_options.action||"action"	//默认的标识
		,_button=_options.button||"all"
		,startY,endY
		,isMove=null
		,isDownMove=null
		,Listener=options.listener||DO
		,_winW=window.innerWidth,_winH=window.innerHeight
		,_left,_top
		,_X=0,_Y=0
		,_x=0,_y=0
		,_eventType=options.eventType||isTouch
		,getEvent=function(e){
			return (e.touches&&e.touches[0])||e
		}
		,getTouchType=function(e){
				return (e.touches&&e.changedTouches[0])||e
		}
		,sX=sY=eX=eY=oLeft=oTop=nLeft=nTop=0,mRun,mStop,mDOWN,mUP
		;			
		t.eventDown=_options.eventDown||function(){}
		t.eventMove=_options.eventMove||function(){}
		t.eventUp=_options.eventUp||function(){}		
		t.eventClick=_options.eventClick||function(){}
		t.eventEnd=_options.eventEnd||function(){}
		
		function unEvent(){
			delEvent(DO,TES,DD);
			delEvent(DO,TEM,DM);
			delEvent(DO,TEE,DU);
			delEvent(DO,MES,DD);
			delEvent(DO,MEM,DM);
			delEvent(DO,MEE,DU)
		}			
		function unBind(){
			unEvent()
			delEvent(_,TES,oDD);
			delEvent(_,MES,oDD);
		}
	t.handleEvent=function(e){
		var ele=e.srcElement||e.target;
			switch(e.type){
				case TES:case MES:	
					var attribute,argument;				
					do{
						if(ele.nodeType!==1)return false
						if(attribute=ele.getAttribute(_action))break			
						}while(ele=ele.parentNode)	
					if(!attribute)return false;										
					argument=attribute.split(".,");
					isMove=argument[0]==="drag"?1:0;//判断是否有拖动的标识
					if(isMove===1){
						_isDrag=true;
						touchStart(ele,e,argument)
						;
					}else{
						if(_button!=="all")
							_button===e.button&&eventDown(argument,ele,e)
						else
							eventDown(argument,ele,e)
					}
				break
				case TEM:case MEM:	
					(_isDrag&&isMove&&touchMove(e))||eventMove(ele,e)					
				break
				case TEE:case MEE:
					(isMove&&touchEnd(e))||eventUp(ele,e)
				break
				case CLICK:
					eventClick(ele,e)
				break
				}
			}
			
		if(_eventType){
		addEvent(Listener,TES,t,false);
		addEvent(Listener,TEM,t,false);
		addEvent(Listener,TEE,t,false);
		}else{
		addEvent(Listener,MES,t,false);
		addEvent(Listener,MEM,t,false);
		addEvent(Listener,MEE,t,false);	
		}
	   addEvent(Listener,CLICK,t,false);
//if(navigator.userAgent.toLowerCase().indexOf("window")<0){		
//	}
//DO.ondragstart=function(e){noPop(e)};	

/*事件中心=========================================*/
//触发事件===============================================		
function touchStart(ele,e,argument){			
	var ev=getEvent(e),p,sty,div,width,height
	,obj=argument[1]		
	_dragObj=obj==="this"?ele:DO.getElementById(obj)
	p=getPosition(_dragObj);//取这个元素的相对位置，防止取值差 注意这里是相对父级的位置
	sty=_dragObj.style;
	_dragObj.position=$.getStyle(_dragObj,"position");
	_X=ev.pageX;
	_Y=ev.pageY;
	_left=p.left;
	_top=p.top;
	width=p.width;
	height=p.height;
//	if(_dragObj.position!=="absolute"){//判断是不是绝对定位
//		if(pro.placeholder){	
//			div=document.createElement("div")
//			div.style.cssText="display:"+$.getStyle(_dragObj,"display")+"px;width:"+width+"px;height:"+height+"px;background:rgba(255,0,0,.3);border:1px dashed #000;box-sizing:border-box"
//			//产生一个临时的元素
//			_dragObj.parentNode.insertBefore(div,_dragObj.nextSibling)
//			t.placeholder=div
//			}						
//		sty.position="absolute";
//		sty.width=width+"px";
//		sty.height=height+"px";	
//		}
	t.touchStart&&t.touchStart.call(t,{ele:_dragObj,position:p,event:e,pageX:_X,pageY:_Y,top:_top,left:_left,width:width,height:height})
	noPop(e)
	return false
}
for(var _item in _options){
	t[_item]=_options[_item]
	}
//移动事件===============================================
function touchMove(e){	
	var ev=getEvent(e)
		,pageX=ev.pageX
		,pageY=ev.pageY
		,distX=pageX-_X
		,distY=pageY-_Y
		,top=_top+distY
		,left=_left+distX		
//		,sty=_dragObj.style;
//		sty.left=(left<0?0:left>_maxLeft?_maxLeft:left)+"px";
//		sty.top=(top<0?0:top>_maxTop?_maxTop:top)+"px";			
		t.touchMove&&t.touchMove.call(t,{ele:_dragObj,event:e,vX:distX,vY:distY,pageX:pageX,pageY:pageY,top:top,left:left})
}
//结束事件================================================		
function touchEnd(e){
	_isDrag=null;
	t.touchEnd&&t.touchEnd.call(t,{ele:_dragObj})
	window.getSelection().removeAllRanges();
	noPop(e);
	return false
}	
//按下事件=================================================	
function eventDown(argument,ele,e){
	t.eventDown(argument,ele,e)
	}
	
//移动事件================================================	
function eventMove(ele,e){
	var attribute,argument;				
	do{
		if(ele.nodeType!==1)return false
		if(attribute=ele.getAttribute(_action))break			
		}while(ele=ele.parentNode)	
	if(!attribute)return false;										
	argument=attribute.split(".,");
	t.eventMove(argument,ele,e)
	}
	
//点击事件================================================	
function eventClick(ele,e){
	var attribute,argument;				
	do{
		if(ele.nodeType!==1)return false
		if(attribute=ele.getAttribute(_action))break			
		}while(ele=ele.parentNode)	
	if(!attribute)return false;										
	argument=attribute.split(".,");
	t.eventClick(argument,ele,e)
	}	
	
//弹起事件=================================================	
function eventUp(ele,e){
	t.eventUp(ele,e)
	}	
function getPosition(_){
	return _.parentNode.tagName==="BODY"?_.getBoundingClientRect():{width:_.offsetWidth,height:_.offsetHeight,left:_.offsetLeft,top:_.offsetTop}
	}
function addEvent(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
function delEvent(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
function noPop(e){e.preventDefault();e.stopPropagation()};		
}