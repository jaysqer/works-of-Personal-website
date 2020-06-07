// jquery 啟用
$(document).ready(function () {

  // hamburger control switch
  $(function () {
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
  var logoBlock = fullHeader.find('h1'); // logoBlock (logo和webName)
  var btnGoTop = $('.btnGo'); // btnGoTop 回到頂端
  var socialMedia = $('.socialMediasBlock'); // socialMedia 社交軟體連結
  console.log(logoBlock);
  $(window).resize(function () {
    k = fullHeader.offset().top;
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
        'visibility':'visible',
        'opacity':'1',
        'transform':'translateY(-20px)'
      });
      socialMedia.css({
        'visibility':'visible',
        'opacity':'1'
      });
    } else {
      btnGoTop.css({
        'visibility':'hidden',
        'opacity':'0',
        'transform':'translateY(20px)'
      });
      socialMedia.css({
        'visibility':'hidden',
        'opacity':'0'
      });
    };
  });

  // index.html latestAds最新消息 carousal自動輪播
  var latestAds = $('.latestAds');
  adsBlocks = latestAds.find('.adsWholeBlock');
  adsControls = latestAds.find('.adsControls .controlPart');
  adsWidth = latestAds.find('.adsWholeBlock .adsPart').eq(0).width();
  var timer = null;
  var iNow = 0;
  adsControls.on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    iNow = index;
    adsBlocks.animate({
      'left': -adsWidth * iNow,
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

  // services.html
  $(function () {
    // Tab 切換標籤
    $('.servicesTab li').on("click", function () {
      // 先移除所有Tab標籤的-on class，在對點擊的Tab標籤加上-on class
      $(this).parent().children().removeClass("-on");
      $(this).addClass("-on");

      $(".serviceItem").removeClass("-on");
      $(".serviceItem").eq($(this).index()).addClass("-on");
    });
    // carousel 輪播切換

  });

});
