# PDF Viewer
PDF viewer with flip-book interface integration to allow read files flipping pages like a book.

## Info
This is a web viewer written in javascript with no external dependencies. It works with almost every browser.

Try it now [HERE](https://raffaelemorganti.github.io/pdf-viewer/)

Into dropdown menu select FlipBook mode to see how it works.

## Requirements
Despite no external dependencies in order to build this project some external script are included:

* jQuery 3.3.1 downloaded [here](https://jquery.com/download/).
* Modernizr 3.6.0 downloaded [here](https://modernizr.com/download/?-csstransforms-csstransforms3d-domprefixes-prefixes-setclasses-shiv-testallprops-testprop-teststyles).
* PDF.js 2.0.943 downloaded [here](https://mozilla.github.io/pdf.js/getting_started/#download).
* turn.js 4.1.0 downloaded [here](http://www.turnjs.com/).

## Develop
If you want to add features feel free to make a PR.
To help you to understand how it works here a list of modified files in order to accomplish this result:

| Type | Files |
| --- | --- |
| JS | ***NEW*** pdf-turn.js<br/> pdfjs/viewer.js  |
| CSS | ***NEW*** turnjs/turn.css<br/> pdfjs/viewer.css |
| HTML | index.html |


Any change in files not listed as NEW is marked with a `$FB:` or `%FB:` comment. Files listed as NEW are build to accomplish final result.
Other files come directly from specified source without any edit. External libraries files not used were deleted to make the source slimmer and clearer.

## Known bugs
* __Book Flip__ mode doesn't work properly with PDF with pages of different sizes
* __Book Flip__ mode doesn't work properly if PDF loaded directly into this mode

## License
This project is released under [MIT License](https://github.com/RaffaeleMorganti/pdf-viewer/blob/master/LICENSE) however some code come from external with following licenses:

* jQuery released under [MIT License](https://github.com/jquery/jquery/blob/master/LICENSE.txt)
* Modernizr released under [MIT License](https://github.com/Modernizr/Modernizr/blob/master/LICENSE)
* PDF.js released under [Apache License](https://github.com/mozilla/pdf.js/blob/master/LICENSE)
* turn.js released under [BSD License](https://github.com/blasten/turn.js/blob/master/license.txt)
