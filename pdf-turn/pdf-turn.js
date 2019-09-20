  /********************************************************/
 /**     HERE MAIN MODIFIED PART FOR turnjs SUPPORT     **/
/********************************************************/
/// requires jquery and turnjs
/// all code added in viewer.js (from pdfjs build) in order to support 
/// flipbook is commented with '$FB:' string to allow to find it easilly 

var bookFlip = {
	_width: [],		//flipbook pages width
	_height: [],	//flipbook pages height
	active: false,	//flipbook mode on
	__spread: NaN,	//spread mode backup to restore
	_evSpread: null,//spread mode changed default event handler
	_spread: NaN,	//spread page mode
	toStart: false,	//PDFjs require flipbook at start
	onLoad: true,	//start PDFjs into flipbook mode 
	_intoView: null,//link handler default function

	// event listeners when bookFlip need different handling 
	init: function(){
		$(() => {
			var bookFlip = $('.secondaryToolbarButton.scrollModeButtons').last().clone();
			bookFlip.attr('id','bookFlip').attr('title','Use Book Flip').attr('data-l10n-id','book_flip');
			bookFlip.removeClass().addClass('secondaryToolbarButton scrollModeButtons bookFlip');
			bookFlip.children().attr('data-l10n-id','book_flip_label').text('Book Flip');
			bookFlip.insertAfter($('.secondaryToolbarButton.scrollModeButtons').last());
		});
		
		$(document).on('rotationchanging', () => {bookFlip.rotate()});
		$(document).on('scalechanging', () => {bookFlip.resize()});
		$(document).on('pagechanging', () => {bookFlip.flip()});
		$(document).on('documentloaded', () => {bookFlip.stop()});
			
		$(document).on('scrollmodechanged', () => {
			var scroll = PDFViewerApplication.pdfViewer.scrollMode;
			if (scroll === 3)bookFlip.start();
			else bookFlip.stop();
			var button = PDFViewerApplication.appConfig.secondaryToolbar.bookFlipButton;
			button.classList.toggle('toggled', scroll === 3);
		});
		
		$(document).on('switchscrollmode',(evt)=>{
			var scroll = evt.originalEvent.detail.mode;
			PDFViewerApplication.pdfViewer._scrollMode = scroll;
			PDFViewerApplication.pdfViewer._updateScrollMode();
				PDFViewerApplication.eventBus.dispatch('scrollmodechanged', {
				mode: scroll
			});
		});
		
		$(document).on('switchspreadmode', (evt) => {
			bookFlip.spread(evt.originalEvent.detail.mode);
			PDFViewerApplication.eventBus.dispatch('spreadmodechanged', {
				source: PDFViewerApplication,
				mode: evt.originalEvent.detail.mode
			});
		});
		
		$(document).on('pagesloaded', () => {
			if(bookFlip.toStart){
				bookFlip.toStart = false;
				PDFViewerApplication.eventBus.dispatch('switchscrollmode', {
					mode: 3
				});
				if(this.onLoad)PDFViewerApplicationOptions.set('scrollModeOnLoad',3);
			}
		});

		$(document).on('documentloaded', () => {
			//this._evScroll = PDFViewerApplication.eventBus._listeners.switchscrollmode;
			PDFViewerApplication.eventBus._listeners.switchscrollmode = null;
			
			var scrollMode = PDFViewerApplicationOptions.get('scrollModeOnLoad');
			if (scrollMode === -1) {
				scrollMode = PDFViewerApplication.store.file.scrollMode;
			}
			if(scrollMode === 3) {
				bookFlip.toStart = true;
				$('#viewer').css({ opacity: 0 });
				PDFViewerApplication.store.file.scrollMode = 0;
				if(this.onLoad)PDFViewerApplicationOptions.set('scrollModeOnLoad',-1);
			}
		});

		$(document).on('baseviewerinit', () => {
			if(this.onLoad)PDFViewerApplicationOptions.set('scrollModeOnLoad',3);
			
			var button = document.getElementById('bookFlip');
			PDFViewerApplication.appConfig.secondaryToolbar['bookFlipButton'] = button;
			var btns = PDFViewerApplication.secondaryToolbar.buttons;
			btns.push({
				element: button,
				eventName: 'switchscrollmode',
				eventDetails: {
					mode: 3
				},
				close: true
			});
			var btn = btns[btns.length-1];
			btn.element.addEventListener('click', () => {	
				if (btn.eventName !== null) {
					var details = {
						source: PDFViewerApplication.secondaryToolbar
					};
					for (var property in btn.eventDetails) {
						details[property] = btn.eventDetails[property];
					}
					PDFViewerApplication.secondaryToolbar.eventBus.dispatch(btn.eventName, details);
				}
				if (close) {
					PDFViewerApplication.secondaryToolbar.close();
				}
			});
		});
	},
	// startup flipbook
	start: function(){
		if(this.active)return;
		
		$('#viewer').css({ opacity: 1 });
		$('.scrollModeButtons').removeClass('toggled');
		$('#bookFlip').addClass('toggled');
		
		this.__spread = PDFViewerApplication.pdfViewer.spreadMode;
		var selected = $('.spreadModeButtons.toggled').attr('id');
		this._spread = (this.__spread !== 2) ? 0 : 2;
		PDFViewerApplication.pdfViewer.spreadMode = 0;
		PDFViewerApplication.pdfViewer._spreadMode = -1;
		
		this._intoView = PDFViewerApplication.pdfViewer.scrollPageIntoView;
		PDFViewerApplication.pdfViewer.scrollPageIntoView = (data) => {return bookFlip.link(data)};
		
		$('.spreadModeButtons').removeClass('toggled');
		$('#' + selected).addClass('toggled');
		
		this._evSpread = PDFViewerApplication.eventBus._listeners.switchspreadmode;
		PDFViewerApplication.eventBus._listeners.switchspreadmode = null;
		
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		
		var parent = this;
		$('#viewer .page').each(function(){
			parent._width[$(this).attr('data-page-number')] = $(this).width() / scale;
			parent._height[$(this).attr('data-page-number')] = $(this).height() / scale;
		});
		
		$('#viewer').removeClass('pdfViewer');
		$('#viewer').addClass('bookViewer');
		$('#spreadOdd').attr('disabled','');
		
		var pages = PDFViewerApplication.pagesCount;
		for(var page = 3; page < pages + (pages%2); page ++){
			if(this._height[page]!=this._height[page-1] || this._width[page]!=this._width[page-1]){
				$('#spreadEven').attr('disabled','');
				this._spread = 0;
			}
		}
		
		this.active = true;
		
		$('#viewer').turn({
			elevation: 50,
			width:  this._width[PDFViewerApplication.page] * this._spreadMult() * scale,
			height: this._height[PDFViewerApplication.page] * scale,
			page: PDFViewerApplication.page,
			when: {
				turned: function(event, page) { 
					PDFViewerApplication.page = page;
					PDFViewerApplication.pdfViewer.update();
				}
			},
			display: this._spreadType()
		});
	},
	// shutdown flipbook
	stop: function(){
		if(!this.active)return;
		this.active = false;
		
		$('#bookFlip').removeClass('toggled');
		
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		
		$('#viewer').turn('destroy');
		$('#viewer').removeAttr('style');
		
		PDFViewerApplication.eventBus._listeners.switchspreadmode = this._evSpread;
		PDFViewerApplication.pdfViewer.spreadMode = this.__spread;
		
		PDFViewerApplication.pdfViewer.scrollPageIntoView = this._intoView;
		
		$('#viewer .page').removeAttr('style');
		$('#viewer').removeClass('shadow');
		$('#viewer').addClass('pdfViewer');
		$('#viewer').removeClass('bookViewer');
		
		var parent = this;
		$('#viewer .page').each(function(){
			var page = $(this).attr('data-page-number');
			$(this).css( 'width', parent._width[page] * scale).css( 'height', parent._height[page] * scale);
		});
		
	},
	// resize flipbook pages
	resize: function(){
		if(!this.active)return;
		var scale = PDFViewerApplication.pdfViewer.currentScale;
		var page = PDFViewerApplication.page;
		$('#viewer').turn('size', this._width[page] * this._spreadMult() * scale, this._height[page] * scale);
	},
	// rotate flipbook pages
	rotate: function(){
		if(!this.active)return;
		[this._height, this._width] = [this._width, this._height];
		this.resize();
	},
	// change flipbook spread mode
	spread: function(spreadMode){
		if(!this.active)return;
		this._spread = spreadMode;
		$('#viewer').turn('display', this._spreadType());
		this.resize();
	},
	// turn page
	flip: function(){
		if(!this.active)return;
		$('#viewer').turn('page', PDFViewerApplication.page);
		if(!PDFViewerApplication.pdfViewer.hasEqualPageSizes){
			this.resize();
		}
	},
	// follow internal links
	link: function(data){
		if(!this.active)return;
		PDFViewerApplication.page = data.pageNumber;
	},
	// load pages near shown page
	load: function(views){
		var arr = [];
		var page = PDFViewerApplication.page;
		var min = (this._spread === 0) ? 2 : (page%2) ? 4 : 3;
		var max = (this._spread === 0) ? 1 : (page%2) ? 2 : 3;
		for (var i = Math.max(page - min,0), ii = Math.min(page + max, views.length); i < ii; i++) {
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
