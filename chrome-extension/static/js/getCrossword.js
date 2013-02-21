var crossword = document.createElement('div');
crossword.id = 'crossword-properties';
crossword.setAttribute('data-crossword-id', crossword_identifier);
crossword.setAttribute('data-crossword-intersections', JSON.stringify(intersections));
document.body.appendChild(crossword);