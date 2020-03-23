import '../sass/app.scss';

import $ from 'jquery';

$(document).ready(function () {
  let flash = $('.flash');
  if (flash.length > 0) {
    flash.addClass('show');
    setTimeout(function () {
      flash.removeClass('show');
    }, 3000)
  }
});
