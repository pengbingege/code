var index = null, //初始化轮播图中每张图片对应的索引值
    slideTimer = null, //初始化轮播图定时器
    iconIndex = 0, //控制图标区第一行最右图标效果的参数
    showTimer = null, //倒计时定时器
    seckillIndex=-1000;//秒杀区索引
window.onload = function() {
    //选择城市
    selectCity();
    //轮播图效果
    sliderShow();
    //弹出详细分类区效果
    // popupDetail();
    // 公告栏滑动效果
    announceSlide();
    //图标导航区效果
    showPurchase();
    //秒杀区倒计时效果
    showTime();
    //秒杀区点击滑动效果
    seckillSlide();
}

function selectCity() {
    var headerLeftContent = document.getElementById('header_left_content'),
        headCity = document.getElementById('head_city'),
        yourCity = headerLeftContent.getElementsByClassName('your_city');
    for (var i = 0; i < yourCity.length; i++) {
        yourCity[i].onclick = confirmCity;
    }
}

function confirmCity() {

    var headerLeftContent = document.getElementById('header_left_content'),
        headCity = document.getElementById('head_city'),
        yourCity = headerLeftContent.getElementsByClassName('your_city');
    headCity.innerHTML = this.innerHTML;
}

function sliderShow() {
    //得到轮播图选择器的节点和图片节点
    var slider = document.getElementById("slider"),
        slideshowPic = document.getElementById('slideshow_pic');
    //除去节点子元素中的空元素
    delEmpty(slider);
    delEmpty(slideshowPic);
    //得到轮播图选择器数组
    var sliderList = slider.childNodes,
        picList = slideshowPic.childNodes;
    //初始化index，使得轮播图定时器从第一张图片开始
    index = sliderList.length - 1;
    //开启轮播图定时器
    slideTimer = setInterval(slideWork, 2000);
    //遍历选择器，给每个选择器的index的属性赋对应的i值
    //鼠标移入选择器触发关闭定时器并播放对应图片的函数
    //移出则触发重新开启选择器的函数
    for (var i = 0; i < sliderList.length; i++) {
        sliderList[i].index = i;
        sliderList[i].onmouseover = selectPic;
        sliderList[i].onmouseout = continueTimer;
    }
    //鼠标覆盖图片让图片静止
    for (var i = 0; i < picList.length; i++) {
        picList[i].onmouseover = clearTimer;
        picList[i].onmouseout = continueTimer;
    }
}
//轮播图函数
function slideWork() {
    //得到轮播图选择器和图片节点
    var slider = document.getElementById("slider"),
        slideshowPic = document.getElementById('slideshow_pic');
    //除去节点子元素中的空元素
    delEmpty(slider);
    delEmpty(slideshowPic);
    //得到选择器和图片的数组
    var sliderList = slider.childNodes,
        picList = slideshowPic.childNodes;
    //清除上一轮改变的选择器的背景色
    sliderList[index].style.background = "#fff";
    //隐藏上一轮出现的图片
    picList[index].style.display = "none";
    //如果索引已经到了最后一张图片，就赋值为0，让图片重新从第一张开始
    //否则索引加1,播放下一张图片
    index = index == sliderList.length - 1 ? 0 : index + 1;
    sliderList[index].style.background = "#db192a";
    picList[index].style.display = "block";
}
//播放选择器对应的图片
function selectPic() {
    //清除定时器
    clearInterval(slideTimer);
    //得到选择器和图片父元素的节点
    var slider = document.getElementById("slider"),
        slideshowPic = document.getElementById('slideshow_pic');
    //除去节点子元素中的空元素
    delEmpty(slider);
    delEmpty(slideshowPic);
    //得到选择器和图片的数组
    var sliderList = slider.childNodes,
        picList = slideshowPic.childNodes;
    //遍历所有的选择器和图片，并全部隐藏
    for (var i = 0; i < picList.length; i++) {
        picList[i].style.display = "none";
        sliderList[i].style.background = "#fff";
    }
    //播放选择器对应的图片
    picList[this.index].style.display = "block";
    //更改鼠标对应的选择器的背景色
    sliderList[this.index].style.background = "#db192a";
    //把图片索引值设为鼠标对应的选择器的index值
    //定时器开始时就会从下一张图片开始
    index = this.index;


}
//重新开启选择器
function continueTimer() {
    slideTimer = setInterval(slideWork, 2000);
}
//关闭定时器
function clearTimer() {
    clearInterval(slideTimer);
}

//清除节点中空的子元素
function delEmpty(elem) {
    var elem_child = elem.childNodes;
    for (var i = 0; i < elem_child.length; i++) {
        if (elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
            elem.removeChild(elem_child[i])
        }
    }
}
// 公告栏滑动效果
function announceSlide() {
    //得到公告栏节点
    var announcement = document.getElementById('announcement'),
        //得到滑动块节点
        slideBox = document.getElementById('announcement_slide'),
        //得到公告栏两个标题的节点
        ah1 = document.getElementById('ah_1'),
        ah2 = document.getElementById('ah_2');
    //鼠标移动到标题转换公告栏内容
    ah1.onmouseover = showAnnouncement1;
    ah2.onmouseover = showAnnouncement2;
}
//展示公告栏1
function showAnnouncement1() {
    //得到公告栏节点
    var announcement = document.getElementById('announcement'),
        //得到滑动块节点
        slideBox = document.getElementById('announcement_slide'),
        //得到公告区节点
        announcementContent = announcement.getElementsByClassName('announcement_content');
    slideBox.style.transform = "translateX(0)";
    announcementContent[0].style.display = 'block';
    announcementContent[1].style.display = 'none';


}
//展示公告栏2
function showAnnouncement2() {
    //得到公告栏节点
    var announcement = document.getElementById('announcement'),
        //得到滑动块节点
        slideBox = document.getElementById('announcement_slide'),
        //得到公告区节点
        announcementContent = announcement.getElementsByClassName('announcement_content');
    slideBox.style.transform = "translateX(48px)";
    announcementContent[0].style.display = 'none';
    announcementContent[1].style.display = 'block';
}

//图标导航区效果
function showPurchase() {
    //得到图标导航区节点
    var purchase = document.getElementById('purchase'),
        //得到第一行图标
        purchaseLine1 = purchase.getElementsByClassName('purchase_line1'),
        //得到第一行图标下的每个文本节点
        purchaseText = purchase.getElementsByClassName('purchase_text');
    //鼠标移动到第一行的每个图标显示隐藏的购买区
    for (var i = 0; i < purchaseLine1.length; i++) {
        purchaseLine1[i].index = i;
        purchaseLine1[i].onmouseenter = showPurchaseDetail;
    }


}
//展示图标导航区隐藏页
function showPurchaseDetail(e) {
    if (iconIndex == 1) {
        iconIndex = 0;
        return;
    } else {
        //得到鼠标覆盖的对象并考虑兼容性
        e = e || window.event;
        //得到图标导航区节点
        var purchase = document.getElementById('purchase'),
            //得到第一行图标
            purchaseLine1 = purchase.getElementsByClassName('purchase_line1'),
            //得到对象的index值
            eindex = e.target.index,
            //得到隐藏页的节点
            purchaseDetail = document.getElementById('purchase_detail'),
            //得到隐藏页中的每个页面
            purchaseDetailList = purchaseDetail.getElementsByClassName('purchase_detail_list'),
            //得到关闭隐藏页的按钮节点
            closePurchase = document.getElementById('close_purchase');


        //初始化第一行每个图标增加的class,以及每个隐藏区
        for (var i = 0; i < purchaseLine1.length; i++) {
            purchaseLine1[i].classList.remove('purchase_line1_on');
            purchaseDetailList[i].style.display = 'none';
            purchaseDetailList[i].classList.remove('pdl_show');
        }
        //整个图标区增加效果为向上移动的class
        purchase.classList.add('purchase_on');

        //增加让隐藏页增加向上移动的class
        purchaseDetail.classList.add('purchase_detail_on');
        //让鼠标移到的那个图标增加一个class，效果为增加红色的上边框
        e.target.classList.add('purchase_line1_on');
        //让隐藏区中和鼠标移到的图标对应顺序的页面展示
        purchaseDetailList[eindex].style.display = 'block';
        purchaseDetailList[eindex].classList.add('pdl_show');
        //得到隐藏页标题中js增加的的class
        var pdlShow = purchaseDetail.getElementsByClassName('pdl_show'),
            //得到每个隐藏页标题的节点
            purchaseItem = pdlShow[0].getElementsByClassName('purchase_item');
        //鼠标移到每个隐藏页标题会切换页面
        for (var i = 0; i < purchaseItem.length; i++) {
            purchaseItem[i].index = i;
            purchaseItem[i].onmouseenter = changePage;
        }
        closePurchase.onclick = closePurchasePage;
    }
}
//改变鼠标指向的隐藏页背景并切换页面
function changePage(e) {
    //得到隐藏页的节点
    purchaseDetail = document.getElementById('purchase_detail'),
        //得到隐藏页标题中js增加的的class
        pdlShow = purchaseDetail.getElementsByClassName('pdl_show'),
        //得到每个隐藏页标题的节点
        purchaseItem = pdlShow[0].getElementsByClassName('purchase_item'),
        //得到标题相应页面的节点
        rechargeList = pdlShow[0].getElementsByClassName('recharge_list');
    e = e || window.event;
    //初始化标题的class
    for (var i = 0; i < purchaseItem.length; i++) {
        purchaseItem[i].classList.remove('purchase_item_bg');
    }
    e.target.classList.add('purchase_item_bg');
    //初始化每个页面，全部隐藏
    for (var i = 0; i < rechargeList.length; i++) {
        rechargeList[i].classList.add('rl_hide');
    }
    //展示鼠标对应标题索引的页面
    rechargeList[e.target.index].classList.remove('rl_hide');
}
//关闭并重置隐藏页状态
function closePurchasePage() {
    //得到图标导航区节点
    var purchase = document.getElementById('purchase'),
        //得到隐藏页的节点
        purchaseDetail = document.getElementById('purchase_detail'),
        //得到第一行图标
        purchaseLine1 = purchase.getElementsByClassName('purchase_line1');
    //阻止关闭时鼠标还在图标区又触发的打开行为
    iconIndex = 1;
    //整个图标区移除效果为向上移动的class
    purchase.classList.remove('purchase_on');
    //移除让隐藏页增加向上移动的class
    purchaseDetail.classList.remove('purchase_detail_on');
    //移除第一行图标的红色的上边框class
    for (var i = 0; i < purchaseLine1.length; i++) {
        purchaseLine1[i].classList.remove('purchase_line1_on');
    }
}
//倒计时效果
function showTime() {
    var cdItem1 = document.getElementById('cd_item1'),
        cdItem2 = document.getElementById('cd_item2'),
        cdItem3 = document.getElementById('cd_item3'),
        startTime = new Date(),
        endTime = new Date('2017/7/1,0:0:0'),
        //倒计时剩余时间，是一个总的秒数，整数
        leftTime = parseInt((endTime.getTime() - startTime.getTime()) / 1000),
        //剩余小时数
        h = parseInt(leftTime / (60 * 60) % 24),
        //剩余分钟数
        m = parseInt(leftTime / 60 % 60),
        //剩余秒数
        s = parseInt(leftTime % 60);

    //改变个位数时的格式为0开始 
    if (leftTime >= 0) {
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        cdItem1.innerHTML = h;
        cdItem2.innerHTML = m;
        cdItem3.innerHTML = s;
        timer = setTimeout(showTime, 500);
    } else {
        clearTimeout(timer);
    }
}
//改变个位数时的格式为0开始
function checkTime(i) {
    return i < 10 ? "0" + i : i;
}
//秒杀区点击滑动
function seckillSlide() {
    var seckillList=document.getElementById('seckill_list'),
        seckillSliderBox=document.getElementById('seckill_slider_box'),
        seckillContentLeft=document.getElementById('seckill_content_left');
        ssLeft=document.getElementById('seckill_slider_left'),
        ssRight=document.getElementById('seckill_slider_right');
    //鼠标移到滑动区显示滑动按钮
    seckillContentLeft.onmouseenter=showSSbox;
    seckillContentLeft.onmouseleave=hideSSbox;
    //向左滑动
    ssLeft.onclick=slideLeft;
    //向右滑动
    ssRight.onclick=slideRight;
}
//显示滑动按钮
function showSSbox() {
    seckillSliderBox=document.getElementById('seckill_slider_box');
    seckillSliderBox.style.display='block';
}
//隐藏滑动按钮
function hideSSbox() {
    seckillSliderBox=document.getElementById('seckill_slider_box');
    seckillSliderBox.style.display='none';
}
function slideLeft() {
    var seckillList=document.getElementById('seckill_list'),
        seckillContentLeft=document.getElementById('seckill_content_left');
    seckillIndex+=1000;
    seckillContentLeft.classList.remove('scl_temp');
    seckillList.style.transform='translateX('+seckillIndex+'px'+')';
    if(seckillIndex==0){
        setTimeout(function(){
            seckillIndex=-4000;
            seckillContentLeft.classList.add('scl_temp');
            seckillList.style.transform='translateX('+seckillIndex+'px'+')';
        },900)        
    }   
}
function slideRight() {
    var seckillList=document.getElementById('seckill_list'),
        seckillContentLeft=document.getElementById('seckill_content_left');
    seckillIndex-=1000;
    seckillContentLeft.classList.remove('scl_temp');
    seckillList.style.transform='translateX('+seckillIndex+'px'+')';
    if(seckillIndex==-5000){
        setTimeout(function(){
            seckillIndex=-1000;
            seckillContentLeft.classList.add('scl_temp');
            seckillList.style.transform='translateX('+seckillIndex+'px'+')';
        },900)        
    }   
}
// 弹出分类区
// function popupDetail() {
//  //得到左侧分类区包裹层的节点
//  var mainLeft = document.getElementById('main_left'),
//  //得到左侧分类区的集合
//      mainLeftList = mainLeft.getElementsByClassName('main_left_list');
//  //鼠标覆盖到每个分类会弹出对应的详细的分类区
//  for (var i = 0; i < mainLeftList.length; i++) {
//      mainLeftList[i].index=i;
//      mainLeftList[i].onmouseover=popup;
//      mainLeftList[i].onmouseout=popback;
//  }

// }
// 弹出详细分类页
// function popup(e) {
//得到事件并考虑兼容性
//  e=event || window.event;
//  //得到详细分类页包裹层的节点
//  var mainLeft = document.getElementById('main_left'),
//  //得到详细分类页的集合
//  listPage=mainLeft.getElementsByClassName('list_page');
//  //得到鼠标对象的index值
//  eindex=e.target.index;
//  //展示鼠标覆盖的对应详细分类
//  listPage[eindex].style.display='block';
// }

//隐藏详细分类页
// function popback(e) {
//  //得到事件并考虑兼容性
//  e=event || window.event;
//  //得到详细分类页包裹层的节点
//  var mainLeft = document.getElementById('main_left'),
//  //得到详细分类页的集合
//  listPage=mainLeft.getElementsByClassName('list_page');
//  //得到鼠标对象的index值
//  eindex=e.target.index;
//  //隐藏鼠标覆盖的对应详细分类
//  listPage[eindex].style.display='none';
// }
