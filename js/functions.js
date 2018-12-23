$(document).ready( function() {
  //initialisation wow.js
  new WOW().init();

  //script go to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      && 
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



  var error_name = false, error_email = false, error_message = false;

  function alertMessage(id, errorClass, text) {

    return $(id).next(errorClass).html(text).show();
  }

  $(document).on('keyup', '#name', function () {

    var name = $(this).val();
    var filter = /[aA-zZ -]+$/

    if(name === ''){

      alertMessage(this, '.error-name', 'Taper votre nom et prénom');
      error_name = false;

    }else if(!filter.test(name)){

      alertMessage(this, '.error-name', 'Caractères non autorisé');
      error_name = false;

    }else if(name.length < 5){

      alertMessage(this, '.error-name', 'Taper 5 caractères au moins');
      error_name = false;

    }else{

      $('.error-name').hide();
      error_name = true;
    }
  });



  $(document).on('keyup', '#email', function () {

    var email = $(this).val();
    var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(email === ''){

      alertMessage(this, '.error-email', 'Entrer votre e-mail');
      error_email = false;
    }else if(!filter.test(email)){

      alertMessage(this, '.error-email', 'Votre e-mail est incorrect');
      error_email = false;
    }else{

      $('.error-email').hide();
      error_email = true;
    }
  });

  $(document).on('keyup', '#message', function () {

    var message = $(this).val();
    if(message === ''){

      alertMessage(this, '.error-message', 'Taper quelque phrase');
      error_message = false;
    }else if( message.length < 20){

      alertMessage(this, '.error-message', 'Taper 20 caractères au moins');
      error_message = false;
    }else{

      $('.error-message').hide();
      error_message = true;
    }
  });


  $(document).on('submit', '#submit', function () {

    var name = $(this).find('#name').val();
    var email = $(this).find('#email').val();
    var message = $(this).find('#message').val();

    if (error_name === false || error_email === false || error_message === false) {

      if (name === '') {

        $('.error-name').html('Ce champs est obligatoire').show();
      }

      if (email === '') {
        $('.error-email').html('Ce champs est obligatoire').show();
      }

      if (message === '') {
        $('.error-message').html('Ce champs est obligatoire').show();
      }

      return false;
    }else{

      $.ajax({
        url: 'class/sendEmail.php',
        type: 'POST',
        dataType: 'json',
        data:$(this).serialize(),
        success: function (data) {

          if(data.message){

            $('.alert').html(data.message).show();
            $('#name').add('#message, #email').val('');
          }
        }
      });
      return false;
    }
  });










});