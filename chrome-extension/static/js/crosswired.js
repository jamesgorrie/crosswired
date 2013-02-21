var socket = io.connect('http://gnm41087.int.gnl:8082');

$(init);

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
    start();
  }
}


function start() {
  console.log('starting');
  el = $('.crossword');
  $('input', el).on('keyup', function() {
    var name = this.name
      , val = this.value;

    socket.emit('crossword:letterchange', { name: name, val: val });
  });

  socket.on('crossword:letterchange', function (letter) {
    var intersection = config.intersections[letter.name];

    $('[name="' + letter.name + '"]', el).val(letter.val);
    if (intersection) { $('[name="' + intersection + '"]', el).val(letter.val); }
  });
}
