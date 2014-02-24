/*
  All custom scripts goes here !
*/

// Initiliaze WOW.js
$(document).ready(function(){
  wow = new WOW(
    {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0          // default
    }
  );
  wow.init();

  // Add window height for each section
  // $('section').each(function(){
  //   var $window_height = $(window).height();
  //   $(this).height($window_height);
  // });
});
