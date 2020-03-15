

$('body').mousemove(function (e) { 
  var moveX = (e.pageX * -1 /50);
  var moveY = (e.pageY * -1 /50);
  var moveXi = (e.pageX * -1 /200);
  var moveYi = (e.pageY * -1 /200);
  $(this).css('background-position', moveX + 'px ' +  moveY + 'px')
  $('.item1').css("transform", "translate(" + moveXi + "px ," +  moveYi + "px)");

   
 });


 







