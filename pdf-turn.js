  /********************************************************/
 /**     HERE MAIN MODIFIED PART FOR turnjs SUPPORT     **/
/********************************************************/
/// requires jquery, modernizr and turnjs
/// all code added in viewer.js file (pdfjs directory) in order to support 
/// flipbook is commented with '%FB:' string to allow to find it easilly 

var bookFlip = {
	_width: NaN,	//flipbook width
	_height: NaN,	//flipbook height
	active: false,	//flipbook mode on
    _spread: NaN,	//spread page mode
	ready: false,	//libs correctly loaded
	_parity: false,	//virtual page for odd spread
    
	// load required script
	init: function () {
		if (Modernizr.csstransforms) {
			$.getScript('turnjs/turn.min.js')
				.done(function(){
					bookFlip.ready = true;
				});
		} else {
			$.getScript('turnjs/turn.html4.min.js')
				.done(function(){
					bookFlip.ready = true;
				});
		}
    },
	// startup flipbook
	start: function(){
		if(!this.ready || this.active)return;
		
		this._spread = PDFViewerApplication.pdfViewer._spreadMode;
		this._spread = (this._spread === undefined) ? 0 : this._spread;
		PDFViewerApplication.pdfViewer._spreadMode = 0;
		PDFViewerApplication.pdfViewer._updateSpreadMode();
		PDFViewerApplication.pdfViewer._spreadMode = -1;
		
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		this._width = $('#viewer .page').width() / scale;
		this._height = $('#viewer .page').height() / scale;
		$('#viewer').removeClass('pdfViewer');
		$('#viewer').addClass('bookViewer');
		$('#spreadOdd').attr('disabled','');
		
		this.active = true;
		
		$('#viewer').turn({
			elevation: 50,
			width:  this._width * this._spreadMult() * scale,
			height: this._height * scale,
			page: PDFViewerApplication.page,
			when: {
				turned: function(event, page) { 
					PDFViewerApplication.page = page;
					PDFViewerApplication.pdfViewer.update();
				}
			},
			display: this._spreadType()
		});
		
		return 0;
	},
	// shutdown flipbook
	stop: function(){
		if(!this.active)return;
		this.active = false;
		
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		
		$('#viewer').turn('destroy');
		$('#viewer').removeAttr('style');
		
		PDFViewerApplication.pdfViewer._spreadMode = this._spread;
		PDFViewerApplication.pdfViewer._updateSpreadMode();
		
		$('#viewer .page').removeAttr('style');
		$('#viewer').removeClass('shadow');
		$('#viewer').addClass('pdfViewer');
		$('#viewer').removeClass('bookViewer');
		$('#viewer .page').css( 'width', this._width * scale).css( 'height', this._height * scale);
		
		return this._spread;
	},
	// resize flipbook pages
	resize: function(){
		if(!this.active)return;
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		$('#viewer').turn('size', this._width * this._spreadMult() * scale, this._height * scale);
	},
	// change flipbook spread mode
	spread: function(spreadMode){
		if(!this.active)return;
		this._spread = spreadMode;
		$('#viewer').turn('display', this._spreadType());
		this.resize();
	},
	// turn page if changed by external buttons
	flip: function(){
		if(!this.active)return;
		$('#viewer').turn('page', PDFViewerApplication.page);
	},
	// load pages near shown page
	load: function(views){
		var arr = [];
		var page = PDFViewerApplication.page;
		var limit = (this._spread === 0) ? 1 : 2;
		for (var i = Math.max(page - limit - 1,0), ii = Math.min(page + limit, views.length); i < ii; i++) {
			arr.push({
				id: views[i].id,
				x: views[i].div.offsetLeft + views[i].div.clientLeft,
				y: views[i].div.offsetTop + views[i].div.clientTop,
				view: views[i],
				percent: 100
			});
		}
		return arr;
	},
	_spreadType: function(){
		return (this._spread === 0) ? 'single' : 'double';
	},
	_spreadMult: function(){
		return (this._spread === 0) ? 1 : 2;
	}
};

bookFlip.init();
