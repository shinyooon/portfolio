
$(document).ready(function(){
    navControl();
    resize();
});

$(window).load(function() {
    init();
    masonryControl();
    imgSizingControl();
});

function resize(current, next) {
    $(window).resize(function() {
        getWindowSize();
        init();
        imgSizingControl();
    });
}

function getWindowSize() {
    var d = document, root = d.documentElement, body = d.body;
    var wid = window.innerWidth || root.clientWidth || body.clientWidth, hi = window.innerHeight || root.clientHeight || body.clientHeight;
    var $item = $(".item");
    // if(wid>900){
        // $item.each(function(){
            // var idx = $(this).index();
            // if(idx%3==1){
                // console.log(idx);
                // $item.eq(idx).css("width","34%"); 
            // }
        // });
    // }
    return [wid, hi];
}
var browserSize = [];
function init() {
    browserSize = getWindowSize();
    $page = $(".page");

    var headerHeight = $("#header").height();
    console.log(" headerHeight : " + headerHeight);
    $("#contents .page").css({
        "width" : browserSize[0],
        "height" : browserSize[1] - headerHeight
    });
    $("#wrap").css({
        "width" : browserSize[0],
        "height" : browserSize[1]
    });
    pagePosition(currentPage);
    $page.eq(currentPage).css({
        transform : "matrix(1, 0, 0, 1, 0, 0)"
    });
}

var $page = null;
function pageControl(currentPage, nextPage) {
    pageReset(nextPage);
    pagePosition(nextPage);
    $page.eq(currentPage).css({
        transition : "transform 1s ease",
        "z-index" : 2
    });

}

function pagePosition(way){
    if (way == 0) {
        $page.eq(1).css({
            transform : "matrix(1, 0, 0, 1, " + browserSize[0] + ", 0)"
        });
        $page.eq(2).css({
            transform : "matrix(1, 0, 0, 1, " + browserSize[0] + ", 0)"
        });
    } else if (way == 1) {
        $page.eq(0).css({
            transform : "matrix(1, 0, 0, 1, " + (-browserSize[0]) + ", 0)"
        });
        $page.eq(2).css({
            transform : "matrix(1, 0, 0, 1, " + (browserSize[0]) + ", 0)"
        });
    } else if (way == 2) {
        $page.eq(0).css({
            transform : "matrix(1, 0, 0, 1, " + (-browserSize[0]) + ", 0)"
        });
        $page.eq(1).css({
            transform : "matrix(1, 0, 0, 1, " + (-browserSize[0]) + ", 0)"
        });
    }
}

function pageReset(nextPage) {
    $page.css({
        transform : "none !important",
        "z-index" : 1
    });
    $page.eq(nextPage).css({
        transition : "transform 1s ease",
        transform : "matrix(1, 0, 0, 1, 0, 0)",
        "z-index" : 3
    });
}
function imgSizingControl(){
    var $item = $(".item");
    $item.each(function(){
        var $item_img = $(this).children("img");
        var item_w = $(this).width();
        var item_h = $(this).height();
        var img_w = $item_img.width();
        var img_h = $item_img.height();
        //console.log("item_width : " + item_w + ", item_height : " + item_h +"\n" +"img_w : "+img_w+", img_h : " +img_h );
        if(item_w>img_w){
        $item_img.css({
            "width" : "100%",
            "height" : "auto"
        });
        }else if(item_h>img_h){
            $item_img.css({
                "width" : "auto",
                "height" : "100%"
            });
        }
    });
    
}

var currentPage = 0;
var nextPage = 0;
function navControl() {
    $("#nav li a").click(function() {
        var $page = $(".page");
        nextPage = $(this).parent().index();
        //console.log(currentPage, nextPage);
        pageControl(currentPage, nextPage);
        currentPage = nextPage;
    });

}


function masonryControl() {
    var $container = $('#container');
    // initialize
    $container.masonry({
        itemSelector : '.item'
    });
}
