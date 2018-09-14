'use strict';

document.addEventListener("DOMContentLoaded", function () {

  var bodyTag = document.querySelector('body');

  // Sticky Header

  var headroom = new Headroom(document.querySelector('#header'));
  headroom.init();

  // Samples slider
  var samplesSlider = document.getElementById('samples-slider');
  if (samplesSlider) {
    tns({
      container: samplesSlider,
      mode: "gallery",
      items: 1,
      controls: false,
      speed: 600
    });
  }

  var requestPopup = document.getElementById('request-popup');
  var fader = document.getElementById('fader');

  if (fader && requestPopup) {

    requestPopup.querySelector('.close-cross').onclick = function () {
      fader.classList.add('hidden');
      requestPopup.classList.add('hidden');
    };

    fader.onclick = function () {
      fader.classList.add('hidden');
      requestPopup.classList.add('hidden');
    };

    var requestPopupOpeners = document.querySelectorAll('.open-request-sample-popup');
    if (requestPopupOpeners.length > 0) {
      requestPopupOpeners.forEach(function (link) {
        link.onclick = function (event) {
          event.preventDefault();
          fader.classList.remove('hidden');
          requestPopup.classList.remove('hidden');
        };
      });
    }

    var tabsetLinks = requestPopup.querySelectorAll('.tabset span');
    tabsetLinks.forEach(function (el) {
      el.onclick = function (event) {
        event.preventDefault();
        if (!el.classList.contains('active')) {
          var activeLink = requestPopup.querySelector('.tabset .active');
          var target = el.getAttribute('data-src');
          var prevTarget = activeLink.getAttribute('data-src');

          activeLink.classList.remove('active');
          el.classList.add('active');
          requestPopup.querySelector(prevTarget).classList.add('hidden');
          requestPopup.querySelector(target).classList.remove('hidden');
        }
      };
    });
  }

  // Smooth scroll
  new SmoothScroll('.nav a', { updateURL: false, offset: 70 });

  customSelect('select');

  document.getElementById('state').onchange = changeEventHandler;

  function changeEventHandler(event) {
    if (event.target.value) {
      if (event.target.classList.contains('error')) {
        event.target.classList.remove('error');
        event.target.parentElement.classList.remove('error-holder');
      }
    }
  }

  document.getElementById('request-sample-form').onsubmit = submitEventHandler;
  document.getElementById('request-quote-form').onsubmit = submitEventHandler;

  function submitEventHandler(event) {
    event.preventDefault();
  }

  validate.init({
    afterShowError: function afterShowError(field) {
      field.parentElement.classList.add('error-holder');
    },
    afterRemoveError: function afterRemoveError(field) {
      field.parentElement.classList.remove('error-holder');
    },
    onSubmit: function onSubmit(form, fields) {
      var popup = document.getElementById('request-popup');
      popup.classList.add('submitted');
      popup.querySelector('.request-text-sent .button').onclick = function () {
        fader.classList.add('hidden');
        requestPopup.classList.add('hidden');
        popup.classList.remove('submitted');
      };
    }
  });
});