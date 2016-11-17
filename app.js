$(function() {
  var eventName = '';
  /*
    name of conference
    conference | meetup
    workshop | presentation
  */
  var collections = [''];

  document.title = eventName;
  $('#title').append(eventName);
  $('#footer').append(eventName);


  $('#thankyou').hide();
  var name = $('#inputName');
  var email = $('#inputEmail');
  var company = $('#inputCompany');
  var canContact = $('#canContact');

  canContact.on('change', function() {
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
    } else {
      $(this).attr('value', 'false');
    }
  });

  $('form').submit(function(e) {
    var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
    var nameFlag = false;
    var emailFlag = false;
    var data = {};
    if ((name.val().length >= 2 && name.val())) {
      nameFlag = false;
      name.closest('.form-group').removeClass('has-error');
      data.name = name.val();
    } else  {
      nameFlag = true;
      name.closest('.form-group').addClass('has-error');
    }

    if (validEmail) {
      emailFlag = false;
      email.closest('.form-group').removeClass('has-error');
      data.email = email.val();
    } else {
      emailFlag = true;
      email.closest('.form-group').addClass('has-error');
    }

    if (company.val()) {
      data.company = company.val();
    }
    
    if (canContact.val()) {
      data.canContact = canContact.val();
    }

    if (!nameFlag && !emailFlag) {
      data.collections = collections;
      $.ajax({
        method: 'POST',
        url: '/ext/process.xqy',
        data: data
      }).done(function(result) {
        if (result) {
          $('form').hide();
          $('#thankyou').fadeIn();
          $('#thankyou').append('<p>Dear ' + name.val() + '. Thank you for registering.</p>')
        }
      });
    }


    e.preventDefault();
  });
  
});