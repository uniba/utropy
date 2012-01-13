jQuery(function($) {
  $('.danger').live('click', function(e) {
    return confirm('really?');
  });
});
