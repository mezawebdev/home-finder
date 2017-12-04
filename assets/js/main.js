//(function(document, window) {

	'use strict';

	//------------------
	//	   Global 
	//------------------
	var fadeSpeed = 250;

	//------------------
	//	   Classes
	//------------------
	class Listing {
		constructor(id, type, seller, price, beds, baths, squareft, lotsize, hometype, month, day, tags, zip, city, address, picturesrc) {
			this.id = id;
			this.type = type;
			this.seller = seller;
			this.price = price;
			this.beds = beds;
			this.baths = baths;
			this.squareft = squareft;
			this.lotsize = lotsize;
			this.hometype = hometype;
			this.month = month;
			this.day = day;
			this.tags = tags;
			this.zip = zip;
			this.city = city;
			this.address = address;
			this.picturesrc = picturesrc;
			this.liked = false;
			//this.element = element;
		}
		init() {
			this.render();
			this.cacheDOM();
			this.updateData();
			this.setEvents();
		}
		render() {
			list.listDOM.append(list.template);
		}
		cacheDOM() {
			this.mainElement = $("#list .listing:last-child");
			this.monthElement = $("#list .listing:last-child .listing-date .listing-month");
			this.dayElement = $("#list .listing:last-child .listing-date .listing-day");
			this.pictureElement = $("#list .listing:last-child .listing-picture");
			this.priceElement = $("#list .listing:last-child ul li.listing-price");
			this.addressElement = $("#list .listing:last-child ul li.listing-address");
			this.squareFeetElement = $("#list .listing:last-child ul li.listing-square-feet");
			this.likeButtonElement = $("#list .listing:last-child button.like-button");
		}
		setEvents() {
			var that = this;

			// On Click
			this.mainElement.on("click", function() {
				list.toggleLoadingScreen();
				iWindow.render(that);
				iWindow.show();
				list.toggleLoadingScreen();
			});

			this.likeButtonElement.on("click", function(e) {
				e.stopPropagation();
				that.like();
			});
		}
		updateData() {
			this.monthElement.html(this.month.toUpperCase());
			this.dayElement.html(this.day);
			this.priceElement.html("$" + this.price);
			this.addressElement.html(this.address);
			this.squareFeetElement.html(this.squareft + "sqft");
			this.pictureElement.css("background-image", "url(" + this.picturesrc + "/0.jpg)");
		}
		like() {
			this.likeButtonElement.css("color", "#FFDC3B");
			this.liked = true;
		}
	}

	//------------------
	//	   Modules
	//------------------
	var toolBar = {
		opened: false,
		tab: "buy",
		location: "eastlake",
		budget: [1000, 3000],
		squareFeet: [1000, 5000],
		rooms: [1, 4],
		init: function() {
			this.cacheDOM();
			this.fixSettingsHeight();
			this.render();
		},
		cacheDOM: function() {
			this.toolBarDOM = $("#side-bar");
			this.openButton = $("#side-bar .footer button");
			this.openButtonText = $("#side-bar .footer button span");
			this.header = $("#side-bar .header");
			this.body = $("#side-bar .body");
			this.buyTabButton = $(".body-top-buttons button:nth-child(1)");
			this.rentTabButton = $(".body-top-buttons button:nth-child(2)");
			this.budgetSlider = document.getElementById("budget-slider");
			this.budgetMin = $(".budget div.min");
			this.budgetMax = $(".budget div.max");
			this.squareFeetMin = $(".square-feet div.min");
			this.squareFeetMax = $(".square-feet div.max");
			this.roomsMin = $(".rooms div.min");
			this.roomsMax = $(".rooms div.max");
			this.squareFeetSlider = document.getElementById("square-slider");
			this.roomsSlider = document.getElementById("rooms-slider");
			this.settingsWrapper = $(".settings-wrapper");
		}, 
		render: function() {
			var that = this;

			// Open Button
			this.openButton.on("click", function() {
				that.expand();
			});

			// Buy Tab
			this.buyTabButton.on("click", function() {
				that.toggleBuy();
			});

			// Rent Tab
			this.rentTabButton.on("click", function() {
				that.toggleRent();	
			});

			//---------
			// Sliders
			//---------
			// Budget
			var budgetHandle = noUiSlider.create(this.budgetSlider, {
				start: [this.budget[0], this.budget[1]],
				connect: true,
				step: 500,
				range: {
					'min': this.budget[0],
					'max': this.budget[1]
				}
			});

			// Budget - Handler
			budgetHandle.on("update", function(values) {
				that.toggleBudget(values);
			});

			// Square Feet
			var squareFeetHandle = noUiSlider.create(this.squareFeetSlider, {
				start: [this.squareFeet[0], this.squareFeet[1]],
				connect: true,
				step: 100,
				range: {
					'min':this.squareFeet[0],
					'max': this.squareFeet[1]
				}
			});

			// Square Feet - Handler
			squareFeetHandle.on("update", function(values) {
				that.toggleSquareFeet(values);
			});

			// Rooms 
			var roomsHandle = noUiSlider.create(this.roomsSlider, {
				start: [this.rooms[0], this.rooms[1]],
				connect: true,
				step: 0.5,
				range: {
					'min': this.rooms[0],
					'max': this.rooms[1]
				}
			});

			// Rooms Handler
			roomsHandle.on("update", function(values) {
				that.toggleRooms(values);
			});
		},
		expand: function() {
			if (! this.opened) {
				this.toolBarDOM.toggleClass("active");
				this.fixSettingsHeight();
				this.openButtonText.removeClass();
				this.openButtonText.attr("class", "glyphicon glyphicon-remove");
				this.header.css("display", "block");
				this.body.css("display", "block");
				this.opened = true;
			} else {
				this.toolBarDOM.removeClass("active");
				this.openButtonText.removeClass();
				this.openButtonText.attr("class", "glyphicon glyphicon-chevron-down");
				setTimeout(function() {
					this.header.css("display", "none");
					this.body.css("display", "none");
				}, 250);
				this.opened = false;
			}
		},
		toggleBuy: function() {
			if (this.tab !== "buy") {
				this.rentTabButton.removeClass();
				this.buyTabButton.toggleClass("active");
				this.tab = "buy";
			}
		},
		toggleRent: function() {
			if (this.tab !== "rent") {
				this.buyTabButton.removeClass();
				this.rentTabButton.toggleClass("active");
				this.tab = "rent";
			}
		},
		toggleBudget: function(values) {
			this.budgetMin.html("$" + Math.round(values[0]));
			this.budgetMax.html("$" + Math.round(values[1]));
		},
		toggleSquareFeet: function(values) {
			this.squareFeetMin.html(Math.round(values[0]) + "ft²");
			this.squareFeetMax.html(Math.round(values[1]) + "ft²");
		},
		toggleRooms: function(values) {
			this.roomsMin.html(Math.round(values[0]));
			this.roomsMax.html(Math.round(values[1]));
		},
		fixSettingsHeight: function() {
			var newHeight = window.innerHeight * 1.5;
			this.settingsWrapper.css("height", newHeight + "px");
		}
	}

	var views = {
		tab: "list",
		init: function() {
			this.cacheDOM();
			this.render();
		},
		cacheDOM: function() {
			this.mainElement = $("#views");
			this.listButton = $("#views button:nth-child(1)");
			this.mapButton = $("#views button:nth-child(2)");
		},
		render: function() {
			var that = this;

			this.listButton.on("click", function() {
				that.toggleList();
			});

			this.mapButton.on("click", function() {
				that.toggleMap();
			});
		},
		toggleList: function() {
			if (this.tab !== "list") {
				this.mapButton.removeClass();
				this.listButton.toggleClass("active");
				this.tab = "list";
				list.show();
			}
		},
		toggleMap: function() {
			if (this.tab !== "map") {
				this.listButton.removeClass();
				this.mapButton.toggleClass("active");
				this.tab = "map";
				list.hide();
			}
		}
	}

	var list = {
		listings: [],
		init: function() {
			this.cacheDOM();
			this.render();
		},
		cacheDOM: function() {
			this.listDOM = $("#list");
			this.template = document.getElementById("listing-template").innerHTML;
			this.loadingScreen = $(".loading-screen");
		},
		render: function() {
			this.toggleLoadingScreen();
			this.fetchList();
			this.toggleLoadingScreen();
		},
		fetchList: function() {
			var tempLists = 4;
			for (var i = 0; i < tempLists; i++) {
				var listing = new Listing(0, "sale", "owner", "200,000", 2, 2, 1235, 2410, "house", "oct", 20, "pool garden driveway", 91915, "Chula Vista", "1476 Caminito Sardinia", "assets/images/listings/0");
				this.listings.push(listing);
				this.listings[i].init();
			}

			// List Padding Fix (Mobile) 
			this.listDOM.css("padding-bottom", "20px");
		},
		hide: function() {
			this.listDOM.css("display", "none");
		},
		show: function() {
			this.listDOM.css("display", "block");
		},
		toggleLoadingScreen: function() {
			if (this.loadingScreen.css("display") === "none") {
				this.loadingScreen.css("display", "block");
			} else if (this.loadingScreen.css("display") === "block") {
				this.loadingScreen.css("display", "none");
			}
		}
	}

	var iWindow = {
		pictureCount: 0,
		activePicture: 0,
		sliderControllers: [],
		slideSpeed: 250,
		lightbox: false,
		init: function() {
			this.cacheDOM();
			this.setEvents();
			this.render();
		},
		cacheDOM: function() {
			this.element = $("#window");
			this.pictureWrapperElement = $("#window .picture-wrapper");
			this.sliderControllerWrapper = $("#window .slider-controller-wrapper");
			this.closeButton = $("#window .window-top-bar button.window-close-button");
		},
		setEvents: function() {
			var that = this;
			this.closeButton.on("click", function() {
				that.hide();
				that.emptyWindow();
			});
			this.pictureWrapperElement.on("click", function() {
				that.expandSlider();
			});
		},
		render: function(data) {
			console.log(data);
			console.log(data.picturesrc);
			this.getPictureCount(data.picturesrc);
		},
		hide: function() {
			this.element.fadeOut(fadeSpeed);
		},
		show: function(data) {
			this.element.fadeIn(fadeSpeed);
		},
		emptyWindow: function() {
			this.pictureWrapperElement.empty();
			this.sliderControllerWrapper.empty();
			this.sliderControllers = [];
			this.pictureWrapperElement.animate({
				marginLeft: "0%"
			}, 100);
			this.activePicture = 0;
		},
		getPictureCount: function(src) {
			console.log("[" + src + "] Fetching pictures..");
			var dataString = "src=" + src;
			var that = this;
			$.ajax({
				type: "POST",
				url: "php/fetch_picture_count.php",
				data: dataString,
				dataType: "json",
				success: function(count) {
					console.log("Picture count fetched.");
					console.log(count);
					that.pictureCount = count;
					that.displayPictures(src, count);
				},
				error: function() {
					console.log("Connection failed.");
				}
			});
		},
		displayPictures: function(src, count) {
			var that = this;
			list.toggleLoadingScreen();

			// Create a picture element div for every picture in folder
			this.pictureWrapperElement.empty();
			for (var i = 0; i < count; i++) {
				this.pictureWrapperElement.append("<div class='picture'></div>");
				$(".picture-wrapper .picture:last-child").css("background-image", "url('" + src + "/" + i + ".jpg')");
			}

			// Append and store new controller per every picture (count)
			for (var i = 0; i < count; i++) {
				this.sliderControllerWrapper.append("<div class='controller' onclick='goToPic(this);'></div>");
				this.sliderControllers.push($("#window .slider-controller-wrapper .controller:last-child"));
				this.sliderControllers[i].attr("value", i);
				console.log("New Value: " + this.sliderControllers[i].attr("value"));
			}

			// Set initial active slide to first one (0)
			this.setActivePicture(this.sliderControllers[0]);
			list.toggleLoadingScreen();
		},
		setActivePicture: function(element) {
			var that = iWindow;
			var newSlide = $(element).attr("value");
			$("#window .picture").removeClass("active");
			$("#window .slider-controller-wrapper .controller").removeClass("active");
			$(element).addClass("active");
			that.switchToPicture(that.activePicture, newSlide);
		},
		switchToPicture: function(currentSlide, newSlide) {
			console.log("Current Slide: " + currentSlide);
			console.log("New Slide: " + newSlide);
			if (newSlide > currentSlide) {
				var steps = (newSlide - currentSlide) * 100;
				this.pictureWrapperElement.animate({
					marginLeft: "-=" + steps + "%"
				}, this.slideSpeed);
				this.activePicture = newSlide;
			} else if (newSlide < currentSlide) {
				var steps = (currentSlide - newSlide) * 100;
				this.pictureWrapperElement.animate({
					marginLeft: "+=" + steps + "%"
				}, this.slideSpeed);
				this.activePicture = newSlide;
			} else if (newSlide === currentSlide) {
				console.log("Lol.");
			}
		},
		expandSlider: function() {
			this.pictureWrapperElement.css({
				"z-index": "1001",
				"margin-top": "0",
				"position": "fixed"
			}).animate({
				height: "100%",
			}, 250);
			this.lightbox = true;
		}	
	}


	//------------------
	//	    Misc
	//------------------
	// Background
	/*
	var granimInstance = new Granim({
	    element: '#granim',
	    name: 'radial-gradient',
	    direction: 'radial',
	    opacity: [1, 1],
	    isPausedWhenNotInView: true,
	    states : {
	        "default-state": {
	            gradients: [
	                ['#D4D5FF', '#E2DEFF'],
	                ['#FFDFC0', '#FFECDF'],
	                ['#B9F0AC', '#D3FFCD']
	            ],
	            transitionSpeed: 30000
	        }
	    }
	});
	*/

	//------------------
	//	   Hacks
	//------------------
	window.onresize = function() {
		toolBar.fixSettingsHeight();
	}

	window.goToPic = iWindow.setActivePicture;

	//------------------
	//	   Drivers
	//------------------
	toolBar.init();
	views.init();
	list.init();
	iWindow.init();

//}(document, window));