# PDF Viewer
PDF viewer with flip-book interface integration to allow read files flipping pages like a book.

## Info
This is a web viewer written in javascript with no external dependencies. It works with almost every browser.

***Simply select FlipBook mode into dropdown menu to see how it works.***

Try it now [HERE](https://raffaelemorganti.github.io/pdf-viewer/)

## Requirements
Despite no external dependencies in order to build this project some external script are included:

* jQuery 3.4.1 downloaded [here](https://jquery.com/download/).
* Modernizr 3.6.0 downloaded [here](https://modernizr.com/download/?-csstransforms-csstransforms3d-domprefixes-prefixes-setclasses-shiv-testallprops-testprop-teststyles).
* PDF.js 2.1.266 downloaded [here](https://mozilla.github.io/pdf.js/getting_started/#download).
* turn.js 4.1.0 downloaded [here](http://www.turnjs.com/).

## Develop
If you want to add features feel free to make a PR.
To help you to understand how it works here a list of modified files in order to accomplish this result:

| Type | Files |
| --- | --- |
| JS | pdf-turn.js ***NEW***<br/> pdfjs/viewer.js  |
| CSS | turnjs/turn.css ***NEW***<br/> pdfjs/viewer.css |
| HTML | index.html |


Any change in files not listed as NEW is marked with a `$FB:` or `%FB:` comment. Files listed as NEW are build to accomplish final result.
Other files come directly from specified source without any edit. External libraries files not used were deleted to make the source slimmer and clearer.

## Known bugs
* __Book Flip__ mode doesn't work properly with PDF with pages of different sizes
* ~__Book Flip__ mode doesn't work properly if PDF loaded directly into this mode~ [solved](https://github.com/RaffaeleMorganti/pdf-viewer/issues/1#issuecomment-532190016)

## Other problems
* __Book Flip__ texts are not included in PDF.js locales, so are not translated to the user language. In order to solve this you should go in _'pdfjs/locale/YOUR_LANG'_ and add to the _'viewer.properties'_ file following lines:
```
book_flip.title = Flip pages like a book
book_flip_label = Flip book
```
* If you find any other bug open a new Issue

## License
This project is released under [MIT License](https://github.com/RaffaeleMorganti/pdf-viewer/blob/master/LICENSE) however some code come from external with following licenses:

* jQuery released under [MIT License](https://github.com/jquery/jquery/blob/master/LICENSE.txt)
* Modernizr released under [MIT License](https://github.com/Modernizr/Modernizr/blob/master/LICENSE)
* PDF.js released under [Apache License](https://github.com/mozilla/pdf.js/blob/master/LICENSE)
* turn.js released under [BSD License](https://github.com/blasten/turn.js/blob/master/license.txt)
