var socket = io.connect('http://localhost:8082');

$(function initialize() {
  Crosswired.init();
});


var Crosswired = (function() {
  var el
    , config = {
      id: null,
      intersections: null
    };

  function init() {
    // getting the crossword vars from the window elements
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('static/js/getCrossword.js');
    document.head.appendChild(s);

    s.onload = function() {
      var configEl = document.getElementById('crossword-properties');
      config.id = configEl.getAttribute('data-crossword-id');
      config.intersections = JSON.parse(configEl.getAttribute('data-crossword-intersections'));
      socket.emit('join', { id: config.id });
      start();
    }
  }


  function start() {
    el = $('.crossword');
    $('input', el).on('keyup', function() {
      var name = this.name
        , val = this.value;

      socket.emit('crossword:letterchange', config.id, { name: name, val: val });
    });

    socket.on('crossword:letterchange', receivedLetter);
  }

  function receivedLetter(letter) {
    var intersection = config.intersections[letter.name];

    $('[name="' + letter.name + '"]', el).val(letter.val);
    if (intersection) { $('[name="' + intersection + '"]', el).val(letter.val); }
  }

  return {
    init: init
  }

})();