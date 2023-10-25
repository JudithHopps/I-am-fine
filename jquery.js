$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#toTop").fadeIn();
      var sidebar = $("#sidebar");
      if (sidebar.length > 0) {
        $("#toTop").css("left", sidebar.offset().left);
      }
    } else {
      $("#toTop").fadeOut();
    }
  });

  $("#toTop").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});
