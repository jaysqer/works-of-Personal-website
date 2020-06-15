// jquery 啟用 全部寫一起時
$(document).ready(function () {

  // hamburger control switch
  $(function () { // 同樣是jquery引用，單個寫時
    $(".hamburger").on("click", function () {
      $(this).toggleClass("is-active");
    });
  });

  // hamburger show header
  $(function () {
    $(".hamburger").on("click", function () {
      $(".phoneHeader .nav").toggleClass("showMenu");
    });

  });

  // header 當下滑到header時 header變為固定
  var fullHeader = $('.fullHeader'); // fullHeader 滿版的header
  var k = fullHeader.offset().top; // 取header與視窗頂端距離的定值
  var s = $(document).scrollTop();
  var logoBlock = fullHeader.find('h1'); // logoBlock (logo和webName)
  var btnGoTop = $('.btnGo'); // btnGoTop 回到頂端
  var socialMedia = $('.socialMediasBlock'); // socialMedia 社交軟體
  $(window).resize(function () {
    k = fullHeader.offset().top;
    console.log(k)
  });
  $(window).scroll(function () {
    s = $(document).scrollTop();
    if (s > k) {
      // header 改為固定
      fullHeader.css({
        'position': 'fixed',
        'top': '0'
      });
      fullHeader.find('.navBlock').css('transform', 'translateX(0px)');
      // logo出現在header上
      logoBlock.css({
        'opacity': '1',
        'visibility': 'visible',
      })
    } else {
      fullHeader.css({
        'position': 'relative',
        'top': 'unset'
      });
      fullHeader.find('.navBlock').css('transform', 'translateX(-215px)');
      // logo消失在header上
      logoBlock.css({
        'opacity': '0',
        'visibility': 'hidden',
      })
    }
  });

  // goTop 回到頂端
  btnGoTop.click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
  })
  $(window).scroll(function () {
    if ($(this).scrollTop() > k) {
      btnGoTop.css({
        'visibility': 'visible',
        'opacity': '1',
        'transform': 'translateY(-20px)'
      });
      socialMedia.css({
        'visibility': 'visible',
        'opacity': '1'
      });
    } else {
      btnGoTop.css({
        'visibility': 'hidden',
        'opacity': '0',
        'transform': 'translateY(20px)'
      });
      socialMedia.css({
        'visibility': 'hidden',
        'opacity': '0'
      });
    };
  });

  // index.html latestAds最新消息 carousal自動輪播
  var latestAds = $('.latestAds');
  adsBlocks = latestAds.find('.adsWholeBlock');
  adsControls = latestAds.find('.adsControls .controlPart');
  // adsWidth = latestAds.find('.adsWholeBlock .adsPart').eq(0).width();
  var timer = null;
  var iNow = 0;
  adsControls.on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    iNow = index;
    adsBlocks.animate({
      'left': -100 * iNow + '%',
    });
  });
  function autoPlay() {
    timer = setInterval(function () {
      iNow++;
      if (iNow > adsControls.length - 1) {
        iNow = 0;
      }
      adsControls.eq(iNow).trigger('click');
    }, 5000);
  };
  autoPlay();
  latestAds.hover(
    function () {
      clearInterval(timer);
    },
    function () {
      autoPlay();
    }
  );

  // index.html Collections作品 lightBox燈箱
  $('.cancelBlock').on('click', function () {
    $('.worksLightBoxBlock').css('display', 'none');
    $('.collectionsLightBoxBlock').css({
      'transform': 'translateY(-50px)',
      'visibility': 'hidden',
      'opacity': 0,
    });
  });
  var works = document.querySelectorAll('.worksBlock');
  for (let i = 0; i < works.length; i++) {
    works[i].onclick = function () {
      $('.worksLightBoxBlock').eq(i).css('display', 'block');
      $('.collectionsLightBoxBlock').css({
        'transform': 'translateY(0px)',
        'visibility': 'visible',
        'opacity': 1,
      });
    }
  }

  // index.html Services服務 changeImage小圖換大圖
  var servicesOption = $('.servicesSelect');
  var imageBigger = $('.servicesImage');
  var serviceContent = $('.servicesContent');
  servicesOption.find('.selectsImage').hover(function () { // hover後
    // 小圖換大圖
    $('.selectsImage').removeClass('active');
    $(this).addClass('active');
    var originalArr = $(this).attr('src').split('/');
    originalName = originalArr[originalArr.length - 1].split('.', 1);
    imageBigger.attr('src', './img/index/services/' + originalName + 'Bigger.jpg');

    // 換服務內容 
    serviceContent.css({
      'opacity': 0,
      'visibility': 'hidden',
      'transform': 'translateX(50px)'
    });
    serviceContent.eq($(this).parent().index()).css({
      'opacity': 1,
      'visibility': 'visible',
      'transform': 'translateX(0px)'
    });
  });

  //collections.html
  var collections = $('.collections'); // 有共同使用的class名稱時，可以用分頁的main.class 去找
  $(function () {
    //carousel 輪播 文字內容向下切換 和 圖片向右切換
    $('.carouselItems').eq(0).addClass('active');
    var total = $('.carouselItems').length;
    var current = 0;
    collections.find('.rightArrow').on('click', function () {
      var next = current;
      current = current + 1;
      setSlide(next, current);
    });
    collections.find('.leftArrow').on('click', function () {
      var prev = current;
      current = current - 1;
      setSlide(prev, current);
    });
    function setSlide(prev, next) {
      var slide = current;
      if (next > total - 1) { //當 next 的索引值 > length-1 時，會重置到第一個
        slide = 0;
        current = 0;
      }
      if (next < 0) { // 當 next 的索引值 < 0 時，會重置到最後一個
        slide = total - 1;
        current = total - 1;
      }
      $('.carouselItems').eq(prev).removeClass('active');
      $('.carouselItems').eq(slide).addClass('active');
    };

  });


  // services.html
  var services = $('.services');
  $(function () {
    // Tab 切換標籤
    $('.servicesTab li').on("click", function () {
      // 先移除所有Tab標籤的-on class，在對點擊的Tab標籤加上-on class
      $(this).parent().children().removeClass("-on");
      $(this).addClass("-on");

      $(".serviceItem").removeClass("-on");
      $(".serviceItem").eq($(this).index()).addClass("-on");
    });
    // carousel 輪播切換 點擊向左右移動一次 混加了 js 去寫
    var itemsLength = services.find('.itemRelatedsContent').find('.itemRelated').length / 4;
    var itemWidth = services.find('.itemRelatedsContent').find('.itemRelated').width() + 19;
    var itemRelatedsContent = services.find('.itemRelatedsContent');
    var currentLeftOffset = itemRelatedsContent.css('left') ? parseInt(itemRelatedsContent.css('left')) : 0;
    var itemRelatedsCarouselWidth = services.find('.itemRelatedsCarousel').width() + 10; // 因為 padding 有誤差值 10px
    // var itemRelatedsContentLeft = parseInt(services.find('.itemRelatedsContent').css('left'));
    var movez;
    var limit;
    $(window).resize(function () {
      carouselRwdz();
    });
    function carouselRwdz() {
      itemRelatedsContent.css('left', '0px');
      currentLeftOffset = itemRelatedsContent.css('left') ? parseInt(itemRelatedsContent.css('left')) : 0;
      itemWidth = services.find('.itemRelatedsContent').find('.itemRelated').width() + 19;
      itemRelatedsCarouselWidth = services.find('.itemRelatedsCarousel').width() + 10;
      movez = 0;
      if (itemRelatedsCarouselWidth >= 955) {
        limit = itemsLength - 4;
        services.find('.rightArrow').off('click').on('click', next);
        // services.find('.leftArrow').on('click', prev); // 起始設定無法往左按(上一個)
      } else if (itemRelatedsCarouselWidth >= 720) {
        limit = itemsLength - 3;
        services.find('.rightArrow').off('click').on('click', next);
      } else if (itemRelatedsCarouselWidth >= 480) {
        limit = itemsLength - 2;
        services.find('.rightArrow').off('click').on('click', next);
      } else if (itemRelatedsCarouselWidth >= 310) {
        limit = itemsLength - 1;
        services.find('.rightArrow').off('click').on('click', next);
      } else {
        services.find('.rightArrow').off('click');
        services.find('.leftArrow').off('click');
      }
    }
    carouselRwdz();
    function next() {
      movez++;
      // console.log(movez);
      totalLeft = currentLeftOffset - (movez * itemWidth);
      itemRelatedsContent.css('left', totalLeft + 'px');
      services.find('.leftArrow').off('click').on('click', prev);
      if (movez == limit) {
        // $(this).css('display', 'none');
        $(this).off('click', next);
      }
    };
    function prev() {
      movez--;
      services.find('.rightArrow').off('click').on('click', next);
      totalLeft = currentLeftOffset - (movez * itemWidth);
      itemRelatedsContent.css('left', totalLeft + 'px');
      // services.find('.rightArrow').css('display', 'flex');
      if (movez == 0) {
        $(this).off('click', prev);
      }
    }
  });

  // aboutUs.html
  var aboutUs = $('.aboutUs');
  $(function () {
    var studioOffice = aboutUs.find('.studioOfficeContent').find('.studioOfficePart');
    studioOffice.eq(0).addClass('active');
    var timer;
    var iNow = 0;
    function studioOfficeCarousel() {
      timer = setInterval(function () {
        iNow++;
        if (iNow == studioOffice.length) {
          iNow = 0;
        }
        studioOffice.eq(iNow).addClass('active').siblings().removeClass('active');
      }, 4000);
    };
    studioOfficeCarousel();

  });
});
