// import  Motus  from './node_modules/motus';

// const myAnimation = new Motus.Animation(
//     new Point(100),
//     new Point(1800),
//     document.getElementById('example'),
//     {
//       50: {
//           rotate: ['200deg']

//       },
//       100: {
//         rotate: ['200deg']       
//      }
     
//   }
// );

// addAnimation(myAnimation);

// function sendMail(ev) { 
//   var link = "mailto:me@example.com"
//   + "?cc=myCCaddress@example.com"
//   + "&subject='Contact request'"
//   + "&body=" + escape(document.getElementById('msg').value)
// ;

// window.location.href = link;
//  }




 $('body').mousemove(function (e) { 
  var moveX = (e.pageX * -1 /50);
  var moveY = (e.pageY * -1 /50);
  var moveXi = (e.pageX * -1 /200);
  var moveYi = (e.pageY * -1 /200);
  $(this).css('background-position', moveX + 'px ' +  moveY + 'px')
  $('.item1').css("transform", "translate(" + moveXi + "px ," +  moveYi + "px)");

   
 });




