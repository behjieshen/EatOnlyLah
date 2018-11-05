$(document).ready(function() {
  modalController();
  optionButtonController();

  var responseData;

  $('.subscribe-form').submit(function(e) {
    e.preventDefault();
    $.post('/subscribe', $(this).serialize());
    $('.bmr-results-content p').text(
      'Congrats! You are now subscribed to our fitness tips!'
    );
    $('.subscribe-form input').attr('disabled', 'true');
    $('.subscribe-form')[0].reset();
  });

  // when form is submit
  $('.bmr-form').submit(function(e) {
    e.preventDefault();
    var data = getFormData($(this));
    responseData = $(this).serialize();
    $('.others').attr('value', responseData);
    $.post('/', $(this).serialize());
    var bmr;
    if (data.gender == 'male') {
      bmr = 66 + 13.75 * data.weight + 5 * data.height - 6.8 * data.age;
    } else {
      bmr = 655 + 9.6 * data.weight + 1.8 * data.height - 4.7 * data.age;
    }
    switch (data.activity) {
      case 'lightly-active':
        bmr *= 1.1;
        break;
      case 'moderately-active':
        bmr *= 1.275;
        break;
      case 'very-active':
        bmr *= 1.35;
        break;
      case 'extra-active':
        bmr *= 1.525;
        break;
      default:
        break;
    }

    switch (data.goal) {
      case 'build-muscle':
        bmr += 200;
        break;
      case 'lose-fat':
        bmr -= 200;
        break;
      case 'tone':
        bmr -= 100;
        break;
      default:
        break;
    }
    var finalBMR = Math.round(bmr);
    $('.bmr-results-content')
      .children('h6')
      .text(`${finalBMR} calories`);
    transitionToResults();

    $('.bmr-results-content span').click(function() {
      $('.bmr-form')[0].reset();
      $('.bmr-form').css('display', 'block');
      $('.bmr-results').css('display', 'none');
      $('.bmr-results-content').css('display', 'none');
      $('.bmr-results-content p').text(
        'Subscribe if you want fitness tips without searching the whole Internet.'
      );
      $('.subscribe-form input').attr('disabled', 'false');
    });
  });

  function optionButtonController() {
    $('.bmr-option-button').click(function() {
      // remove all option in same category
      $(this)
        .siblings('.bmr-option-button')
        .removeClass('active');
      // make current button to be active
      $(this).addClass('active');
      // get the text of button
      var text = $(this)
        .children('span')[0]
        .textContent.toLowerCase()
        .replace(' ', '-');
      // handle the checkbox appropirately
      $(this)
        .siblings('select')
        .children('option')
        .removeAttr('selected');
      $(`[value=${text}]`).attr('selected', 'true');
    });
  }

  function transitionToResults() {
    $('.bmr-form').css('display', 'none');
    $('.bmr-results').css('display', 'block');
    $('.spinner, .bmr-loading').css('display', 'block');
    $('.bmr-results-content').css('display', 'none');

    setTimeout(function() {
      $('.bmr-results-content').css('display', 'block');
      $('.spinner, .bmr-loading').css('display', 'none');
    }, 2000);
  }

  // change formdata to json format
  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

  // Close and open modal
  function modalController() {
    // open modal
    $('.bmr-modal-trigger').click(function() {
      $('.bmr-modal').addClass('active');
    });

    // close modal when click on X button
    $('.bmr-modal-close').click(function() {
      $('.bmr-modal').removeClass('active');
    });

    // close modal when click on overlay
    $('.bmr-modal').mouseup(function(e) {
      var container = $('.bmr-modal');
      if (container.is(e.target) && container.has(e.target).length === 0) {
        $('.bmr-modal').removeClass('active');
      }
    });
  }
});
