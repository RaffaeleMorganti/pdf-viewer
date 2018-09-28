# PDF Viewer
PDF viewer with flip-book interface integration to allow read files flipping pages like a book.

## Info
This is a web viewer written in javascript with no external dependencies. It works with almost every browser.

### Tested on:
* Google Chrome 69
* Firefox Quantum 62
* Microsoft Edge 42

Try it now [HERE](https://raffaelemorganti.github.io/pdf-viewer/)

## Requirements
Despite no external dependencies in order to build this project some external script are included:

* jQuery 3.3.1 downloaded [here](https://jquery.com/download/) (slim isn't enough).
* Modernizr 3.6.0 downloaded [here](https://modernizr.com/download/?-csstransforms-csstransforms3d-domprefixes-prefixes-setclasses-shiv-testallprops-testprop-teststyles) (with same configuration).
* PDF.js downloadble [here](https://mozilla.github.io/pdf.js/getting_started/#download) (note that used version is an homemade built of [this](https://github.com/mozilla/pdf.js/commits/54d6c2436c17b6d0efc6fb8e36f36358eba1a9e6) from GitHub).
* turn.js 4.1.0 downloaded [here](http://www.turnjs.com/) (jQuery and Modernizr included aren't used).

## Develop
If you want to add features feel free to make a PR.
To help you to understand how it works here a list of modified files in order to accomplish this result:

| Type | Files |
| --- | --- |
| JS |	pdf-turn.js<br/>pdfjs/viewer.js  |
| CSS | turnjs/turn.css<br/>pdfjs/viewer.css |
| HTML | index.html |

Other files come directly from other source without any edit. Please note that all minified code was not modified. External libraries files not used were deleted to make the source slimmer and clearer.  

## Known bugs
* __Current view__ doesn't work properly in __Book Flip__ mode
* __Document Outline__ links doesn't work properly in __Book Flip__ mode
* PDF internal anchors doesn't work properly in __Book Flip__ mode
* __Book Flip__ mode doesn't work properly with PDF with pages of different sizes

## License
This project is released under [MIT License](https://github.com/RaffaeleMorganti/pdf-viewer/blob/master/LICENSE) however some code come from external with following licenses:

* jQuery released under [MIT License](https://github.com/jquery/jquery/blob/master/LICENSE.txt)
* Modernizr released under [MIT License](https://github.com/Modernizr/Modernizr/blob/master/LICENSE)
* PDF.js released under [Apache License](https://github.com/mozilla/pdf.js/blob/master/LICENSE)
* turn.js released under [BSD License](https://github.com/blasten/turn.js/blob/master/license.txt)


