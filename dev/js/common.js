// hamburger control switch
$(function(){
    $(".hamburger").on("click", function(){
      $(this).toggleClass("is-active");
    });
});

// hamburger show header
$(function(){
  $(".hamburger").on("click", function(){
    $(".phoneHeader").toggleClass("showMenu");
  });
  
}); 