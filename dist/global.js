/* http://lorem.in  @author Loeify@gmail.com */ 
var API={section_height:0,section_pos:"#home",scroll_mark:!0,slider_pos:0,work_pos:"#00"};API.pageControl=function(a,b){if(a){var b="#"+$("#"+b).next()[0].id;if("#pot"==b)return}else{if(!$(API.section_pos).prev()[0])return;var b="#"+$(API.section_pos).prev()[0].id}var c=API.pageInfo(b);API.sectionMove(c.pos*API.section_height),API.section_pos=b,history.pushState(null,c.title,c.url),document.title=c.title},API.pageInfo=function(a){var b,c,d;switch(a){case"#home":b=0,c="Lorem Ipsum 2014",d="/";break;case"#portfolio":b=1,c="Portfolio | Lorem Ipsum 2014",d="/portfolio/";break;case"#about":b=2,c="About | Lorem Ipsum 2014",d="/about/"}return{pos:b,title:c,url:d}},API.setSize=function(a){$(a).css("height",window.innerHeight),$(a).css("width",window.innerWidth)},API.loadImage=function(a,b){$('<img class="db abs" src="/static/image/works/'+a+"/"+b+'.jpg" />').css({opacity:0}).appendTo("#"+a+b).load(function(){$(this).css({opacity:1,marginLeft:-$(this).width()/2+"px",marginTop:-$(this).height()/2+"px"})})},API.touchDevice=function(){return!!("ontouchstart"in window)},API.sectionMove=function(a,b){var b=b||function(){};$("body, html").animate({scrollTop:a},700,"easeInOutQuint",function(){b()})},API.tapPlot=function(a,b,c){$(a).hammer({prevent_default:!0}).on("tap",function(a){var d=a.position[0].x,e=a.position[0].y;$(b).css({visibility:"visible",width:"30px",height:"30px",left:d-15+"px",top:e-15+"px",opacity:.4}).animate({height:"40px",width:"40px",opacity:0,left:"-=5px",top:"-=5px"},300,function(){$(b).css("visibility","hidden")}),a.target.id&&c(a.target.id,d)})},API.sliderMove=function(a,b){$(a).animate({left:-b*window.innerWidth},700,"easeInOutQuint",function(){0==b&&$(a).css("left",0)})},API.sliderControl=function(a,b){b?API.slider_pos++:API.slider_pos--;var c=$(a).length;return API.slider_pos>c-1?void(API.slider_pos=c-1):API.slider_pos<0?void(API.slider_pos=0):void API.sliderMove("#slider",API.slider_pos)},API.sliderInfo=function(a){var b,c,d;switch(a){case 0:b="Guo.Lu — Website",c="A WordPress theme for picture showcase. use Isotope for magical layouts. use basket.js for caching & loading scripts with localStorage. use history API & ajax for page jump without refreshing",url="http://guo.lu",d=4;break;case 1:b="Jaku Icon — Website",c="Jaku Icon showcase, all icons via http://jakurepo.com/ All icons are the property of their respective artists and may not be modified, sold, or redistributed without their consent",url="http://jaku.guo.lu",d=5}return{title:b,content:c,url:url,sum:d}},API.fullImage=function(a,b,c){var d=window.innerHeight,e=window.innerWidth,f=c/b;return d/e>f?$(a).height(d).width(d/f):$(a).width(e).height(e*f),$(a).css("left",(e-$(a).width())/2),$(a).css("top",(d-$(a).height())/2),{w:$(a).width(),h:$(a).height()}};var CanvasImage=function(a,b){this.element=a,this.image=b,this.element.width=this.image.width,this.element.height=this.image.height,this.context=this.element.getContext("2d"),this.context.drawImage(this.image,0,0)};CanvasImage.prototype.blur=function(a){this.context.globalAlpha=.5;for(var b=-a;a>=b;b+=2)for(var c=-a;a>=c;c+=2)this.context.drawImage(this.element,c,b),c>=0&&b>=0&&this.context.drawImage(this.element,-(c-1),-(b-1));this.context.globalAlpha=1},$(function(){function a(a,b){for(var c='<div class="info item bb w h rel"><div class="infoinner w h bb abs"><h3>'+a.title+"</h3><p>"+a.content+'</p><a class="abs link" target="_blank" href="'+a.url+'">'+a.url+'</a><div class="next abs"></div></div></div>',d=0;d<a.sum;d++)c+='<div id="'+b+d+'" class="item image w h rel"></div>';$("#slider").append(c)}function b(a,b){for(var c=0;b>c;c++)API.loadImage(a,c)}function c(){API.section_height=window.innerHeight,API.setSize("#home, #portfolio, #about"),""!=API.section_pos&&(API.sectionMove(API.pageInfo(API.section_pos).pos*API.section_height),$("#slider").css("width",$(".item").length*window.innerWidth),API.sliderMove("#slider",API.slider_pos),$(".item").each(function(){$(this).css("width",window.innerWidth).find("img").css({marginLeft:-$(this).find("img").width()/2+"px",marginTop:-$(this).find("img").height()/2+"px"})}),$("#orimg").length&&(API.fullImage("#blur",f,g),e=API.fullImage("#orimg",f,g)))}var d=API.sliderInfo(0);work_1=API.sliderInfo(1),a(d,0),a(work_1,1);var e,f=1e3,g=702;$("#blur").each(function(){var a=this,b=new Image;b.src="/static/image/about.jpg",b.onload=function(){if($("#about > div").prepend('<img class="rel" src="'+b.src+'" id="orimg" />'),e=API.fullImage("#orimg",f,g),!API.touchDevice()){var c=new CanvasImage(a,this);c.blur(5),API.fullImage("#blur",f,g),$("#blurimg").hover(function(){$("#blur, #orimg").animate({width:e.w+30+"px",height:e.h+30*g/f+"px"})},function(){$("#blur, #orimg").animate({width:e.w+"px",height:e.h+"px"})})}}}),c(),$(window).on("resize orientationchange",function(){setTimeout(c,0)}),setTimeout(function(){c(),b(0,d.sum),b(1,work_1.sum),o()},0),window.scrollTo(0,0),$("#home").css("top",0),API.tapPlot("#home, #portfolio, #about, .link","#pot",function(a,b){"portfolio"==a?API.slider_pos<$(".item").length-1&&b/window.innerWidth>.5?API.sliderControl(".item",!0):API.slider_pos>0&&b/window.innerWidth<.5?API.sliderControl(".item",!1):API.pageControl(!0,a):API.pageControl(!0,a)});var h=window.location.pathname;-1!=h.indexOf("portfolio")&&API.pageControl(!0,"home"),-1!=h.indexOf("about")&&API.pageControl(!0,"portfolio"),$(document).keydown(function(a){40==a.keyCode&&API.pageControl(!0,API.section_pos.split("#")[1]),38==a.keyCode&&API.pageControl(!1,API.section_pos.split("#")[1]);var b=window.location.pathname;-1!=b.indexOf("portfolio")&&(39==a.keyCode&&API.sliderControl(".item",!0),37==a.keyCode&&API.sliderControl(".item",!1))}),$("#home, #portfolio, #about").on("mousewheel DOMMouseScroll",function(a){a.preventDefault();var b=a.originalEvent.wheelDelta||-1*a.originalEvent.detail,c=500;("MacIntel"==navigator.platform||"MacPPC"==navigator.platform)&&(c=1e3),API.scroll_mark&&(API.scroll_mark=!1,0>b&&API.pageControl(!0,API.section_pos.split("#")[1]),b>0&&API.pageControl(!1,API.section_pos.split("#")[1]),setTimeout(function(){API.scroll_mark=!0},c))}),window.addEventListener("popstate",function(){var a=window.location.pathname;a=a.substring(1,a.length-1),"/"==a&&(a="home");var b=API.pageInfo("#"+a);API.sectionMove(b.pos*API.section_height,function(){document.title=b.title})}),$("html").hammer({prevent_default:!0}).on("swipe",function(a){"up"==a.direction&&API.pageControl(!0,API.section_pos.split("#")[1]),"down"==a.direction&&API.pageControl(!1,API.section_pos.split("#")[1]),-1!=window.location.pathname.indexOf("portfolio")&&("left"==a.direction&&API.sliderControl(".item",!0),"right"==a.direction&&API.sliderControl(".item",!1))}),$("section").css("visibility","visible");for(var i=0,j=60,h=new Array,k=new Array,m=0;2>m;m++)h[m]=document.getElementById("i"+m),l=h[m].getTotalLength(),k[m]=l,h[m].style.strokeDasharray=l+" "+l,h[m].style.strokeDashoffset=l;var n=0,o=function(){var a=i/j;if(a>1)window.cancelAnimationFrame(n);else{i++;for(var b=0;b<h.length;b++)h[b].style.strokeDashoffset=Math.floor(k[b]*(1-a));n=window.requestAnimationFrame(o)}};console.log("https://github.com/LoeiFy")});