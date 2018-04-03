// version 1.0.0	-> 2018.04.03 = 1397.01.14


$(document).ready(function () {
	// usage Example :
	if ($('.slideFade').length > 0) {
		ErkinSlide = new class_slideFade('home_top10_slide');
	}
});

function class_slideFade (id) {
	/*
	 * every slideFade must have an ID attribute
	 * ***************************
	 * you can also add "autoStart" class;
	******************************/
	
	var self = this;
	
	/*****************************/
	
	this.init = function () {
		if ($('.slideFade#' + id).length > 0) {
			self.slide_init();
		}
		else {
			console.log('slideFade element not found');
		}
	};
	
	/*****************************/
	
	this.slide_id = id;
	this.slide_active = '';
	this.slide_count = '';
	this.slide_interval = '';
	this.slide_interval_time = 5000;
	
	this.slide_init = function() {
		//console.log('slide_init');
		
		self.update_vars();
		self.next_prev();
		
		if ($('.slideFade#' + self.slide_id).hasClass('autoStart') == true  &&  $('.slideFade#' + self.slide_id + ' > .ul > .li').length > 1) {
			self.slide_start();
		}
		/*if ($('.slideFade#' + self.slide_id + ' > .slide_thumbs_con > .ul > .li').length > 0) {
			self.slide_thumbClick();
		}*/
		
	};
	this.update_vars = function() {
		self.slide_count = $('.slideFade#' + self.slide_id + ' > .ul > .li').length;
		self.slide_active = $('.slideFade#' + self.slide_id + ' > .ul > .li.active').data('item');
	};
	this.slide_start = function() {
		//console.log('slide_start');
		self.slide_interval = setInterval(self.slide_goTo, self.slide_interval_time);
	};
	this.slide_stop = function() {
		//console.log('slide_stop');
		clearInterval(self.slide_interval);
	};
	this.goNext = function() {
		self.slide_stop();
		self.slide_goTo();
	};
	this.goPrev = function() {
		self.slide_stop();
		
		var item_prev = self.slide_active - 1;
		if (item_prev <= 0) {
			item_prev = self.slide_count;
		}
		self.slide_goTo(item_prev);
	};
	this.slide_goTo = function(item_go_to) {
		//console.log('slide_goTo');
		
		var next_item;
		
		if (self.slide_active < self.slide_count) {
			next_item = self.slide_active + 1 ;
		}
		else {
			next_item = 1;
		}
		
		if (item_go_to > 0 && item_go_to <= self.slide_count) next_item = item_go_to;
		
		$('.slideFade#' + self.slide_id + ' > .ul > .li').fadeOut(400);
		$('.slideFade#' + self.slide_id + ' > .ul > .li.item_' + next_item).fadeIn(400);
		
		$('.slideFade#' + self.slide_id + ' > .ul > .li').removeClass('active');
		$('.slideFade#' + self.slide_id + ' > .ul > .li.item_' + next_item).addClass('active');
		
		$('.slideFade#' + self.slide_id + ' > .slide_thumbs_con > .ul > .li').removeClass("active");
		$('.slideFade#' + self.slide_id + ' > .slide_thumbs_con > .ul > .li.item_' + next_item).addClass("active");
		
		self.slide_active = next_item;
	};
	/*this.slide_thumbClick = function() {
		//console.log('slide_thumbClick');
		
		$('.slideFade#' + self.slide_id + ' > .slide_thumbs_con > .ul > .li').click(function(e) {
			if (e.which == 1) {
				self.slide_stop();
				self.slide_goTo($(this).data("item"));
			}
		});
	};*/
	this.next_prev = function() {
		$('.slideFade#' + self.slide_id + ' .button.next').click(function(e) {
			self.goNext();
		});
		$('.slideFade#' + self.slide_id + ' .button.prev').click(function(e) {
			self.goPrev();
		});
	};
	
	/*****************************/
	
	// After All Methods :
	var __construct = function(that) {
		that.init();
	}(self)
}
