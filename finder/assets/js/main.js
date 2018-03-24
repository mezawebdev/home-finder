//------------------
//	 Google Maps
//------------------
// Initialize Map, then callback main App
// API KEY: AIzaSyCzB4QEH-YIMu5ZyRuOYebPMrYAGlYZodE
function initMap() {
	var googleGlobal = google;

	var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 4,
    	center: uluru,
    	gestureHandling: "greedy"
    });
    var marker = new google.maps.Marker({
    	position: uluru,
    	map: map
    });


	init(document, window, googleGlobal, map);
}

var init = function(document, window, googleGlobal, map) {

	'use strict';

	//------------------
	//	   Global 
	//------------------
	var fadeSpeed = 250;
	var toolBarScrollbar;

	$("body").on("touchmove", function(e) {
		//console.log(e.originalEvent.touches[0].screenY);
	});

	$.ajax({
		url: "../php/get_city.php",
		type: "POST",
		success: function(data) {
			console.log("Session data: " + data);
		}
	});

	//------------------
	//	   Classes
	//------------------
	class Listing {
		constructor(id, description, type, seller, price, beds, baths, squareft, lotsize, heating, cooling, appliances, flooring, parking, driveways, backyard, otherInt, otherExt, hometype, month, day, year, tags, zip, city, address, picturesrc, pictureCount) {
			this.id = id;
			this.description = description;
			this.type = type;
			this.seller = seller;
			this.price = price;
			this.beds = beds;
			this.baths = baths;
			this.squareft = squareft;
			this.lotsize = lotsize;
			this.heating = heating;
			this.cooling = cooling;
			this.appliances = appliances;
			this.flooring = flooring;
			this.parking = parking;
			this.driveways = driveways; 
			this.backyard = backyard;
			this.otherInt = otherInt;
			this.otherExt = otherExt;
			this.hometype = hometype;
			this.month = month;
			this.day = day;
			this.year = year;
			this.tags = tags;
			this.zip = zip;
			this.city = city;
			this.address = address;
			this.picturesrc = picturesrc;
			this.pictureCount = pictureCount;
			this.liked = false;
			this.located = false;
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
			this.locateButtonElement = $("#list .listing:last-child button.locate-button");
		}
		setEvents() {
			// On Click
			this.mainElement.on("click", () => {
				list.toggleLoadingScreen();
				iWindow.render(this);
				iWindow.show();
				list.toggleLoadingScreen();
			});

			this.likeButtonElement.on("click", (e) => {
				e.stopPropagation();
				this.like();
			});

			this.locateButtonElement.on("click", (e) => {
				e.stopPropagation();
				this.locate();
			});
		}
		updateData() {
			this.monthElement.html(this.month.toUpperCase().substring(0, 3));
			this.dayElement.html(this.day);
			this.priceElement.html("$" + this.price);
			this.addressElement.html(this.address);
			this.squareFeetElement.html(this.squareft + "sqft");
			this.pictureElement.css("background-image", "url(" + this.picturesrc + "/0.jpg)");
		}
		like() {
			this.likeButtonElement.css("color", "#ffd72c");
			this.liked = true;
		}
		locate() {
			this.locateButtonElement.css("color", "#F38D31");
			this.located = true;
		}
	}

	//------------------
	//	   Modules
	//------------------
	var app = {
		getSessionListing: function() {
			$.ajax({
				url: "../php/get_session_listing.php",
				success: (listingID) => {
					if (listingID) {
						$.ajax({
							url: "../json/listings.json",
							dataType: "json",
							success: (listings) => {
								listings.forEach((listing) => {
									console.log(listing.picturesrc1);
									if (listing.id == listingID) {
										iWindow.render(listing);
										iWindow.show();
									}
								});
							}
						});
					}
				}
			});
		}
	}

	var googleMap = {
		height: null,
		tabRaised: false,
		scrollSpeed: 1000 / 100,
		minTop: 100,
		maxTop: 50,
		init: function() {
			this.cacheDOM();
			this.render();
			this.makeDraggable();
		},
		cacheDOM: function() {
			this.mapWrapperElement = $("#map-wrapper");
			this.draggableTab = $("#map-wrapper .draggable-tab .tab");
			this.draggableTabIcon = $("#map-wrapper .draggable-tab .tab i");
			////console.log(this.draggableTabIcon);
		},
		render: function() {

		},
		makeDraggable: function() { 
			// Make Draggable
			this.mapWrapperElement.draggable({
				axis: "y",
				cancel: "#map",
				drag: (event, ui) => {
					var top = ui.position.top;
					if (top < this.minTop) {
						ui.position.top = this.minTop;
					} else if (top > (window.innerHeight - this.maxTop)) {
						ui.position.top = window.innerHeight - this.maxTop;
					}
				},
				create: () => {
					this.fireEvents();
					this.eventsLaunched = true;
				}
			});
		},
		fireEvents: function() {
			this.draggableTab.on("click", () => {
				this.toggleMap();
			});
		},
		updateTabIcon: function() {
			if (window.innerWidth > 767) {
				this.draggableTabIcon.hide();
			}
		},
		toggleMap: function() {
			// Raise Map I Tab Below Window's middle height
			if (parseInt(this.mapWrapperElement.css("top")) >= (window.innerHeight / 2)) {
				var inter = setInterval(() => {
					if (parseInt(this.mapWrapperElement.css("top")) <= this.minTop) {
						clearInterval(inter);
					} else {
						this.mapWrapperElement.css("top", (parseInt(this.mapWrapperElement.css("top"))) - 10);
					}
				}, this.scrollSpeed);

			// Lower Map If Tab Above Window's middle height
			} else if (parseInt(this.mapWrapperElement.css("top")) <= (window.innerHeight / 2)) {
				var inter = setInterval(() => {
					if (parseInt(this.mapWrapperElement.css("top")) >= (window.innerHeight - this.maxTop)) {
						clearInterval(inter);
					} else {
						this.mapWrapperElement.css("top", (parseInt(this.mapWrapperElement.css("top"))) + 10);
					}
				}, this.scrollSpeed);
			}
		}
	}

	var toolBar = {
		opened: false,
		tab: "buy",
		location: "eastlake",
		buyPrice: [1000, 3000],
		rentPrice: [1000, 3000],
		squareFeet: [1000, 5000],
		rooms: [1, 4],
		baths: [1, 5],
		parking: [1, 5],
		hometype: "house",
		seller: "owner",
		init: function() {
			this.cacheDOM();
			//this.fixSettingsHeight();
			this.render();
		},
		cacheDOM: function() {
			this.toolBarDOM = $("#side-bar");
			this.toolBarDOMactive = $("#side-bar.active");
			this.openButton = $("#side-bar .footer button");
			this.openButtonText = $("#side-bar .footer button span");
			this.header = $("#side-bar .header");
			this.body = $("#side-bar .body");
			this.bodyLoadingScreen = $(".body-loading");
			this.buyTabButton = $(".body-top-buttons div.buy-button");
			this.rentTabButton = $(".body-top-buttons div.rent-button");
			this.buyPriceWrapper = $(".buy-wrapper");
			this.rentPriceWrapper = $(".rent-wrapper");
			this.buyBudgetSlider = document.getElementById("buy-budget-slider");
			this.rentPriceSlider = document.getElementById("rent-price-slider");
			this.rentPriceMin = $(".rent-wrapper .price div.min");
			this.rentPriceMax = $(".rent-wrapper .price div.max");
			this.buyPriceMin = $(".buy-wrapper .price div.min");
			this.buyPriceMax = $(".buy-wrapper .price div.max");
			this.squareFeetMin = $(".square-feet div.min");
			this.squareFeetMax = $(".square-feet div.max");
			this.roomsMin = $(".beds div.min");
			this.roomsMax = $(".beds div.max");
			this.squareFeetSlider = document.getElementById("square-slider");
			this.roomsSlider = document.getElementById("beds-slider");
			this.settingsWrapper = $(".settings-wrapper");

			this.bathsSlider = document.getElementById("baths-slider");
			this.bathsMin = $(".baths div.min");
			this.bathsMax = $(".baths div.max");

			this.parkingSlider = document.getElementById("parking-slider");
			this.parkingMin = $(".parking div.min");
			this.parkingMax = $(".parking div.max");

			// Home Type
			this.hometypeHouse = $("#hometype-house");
			this.hometypeTownhouse = $("#hometype-townhouse");
			this.hometypeAppartment = $("#hometype-appartment");
			this.hometypeCondo = $("#hometype-condo");

			// Seller
			this.sellerOwner = $("#seller-owner");
			this.sellerAgent = $("#seller-agent");
		}, 
		render: function() {
			console.log(this.settingsWrapper.height());
			var that = this;

			// Open Button
			this.openButton.on("click", () => {
				this.expand();
			});

			// Buy Tab
			this.buyTabButton.on("click", () => {
				this.toggleBuy();
			});

			// Rent Tab
			this.rentTabButton.on("click", () => {
				this.toggleRent();	
			});

			//-------------------------------------------------
			// Sliders
			//-------------------------------------------------
			// Budget
			this.buyBudgetHandle = noUiSlider.create(this.buyBudgetSlider, {
				start: [this.buyPrice[0], this.buyPrice[1]],
				connect: true,
				step: 500,
				range: {
					'min': this.buyPrice[0],
					'max': this.buyPrice[1]
				}
			});

			// Budget - Handler
			this.buyBudgetHandle.on("update", function(values) {
				that.toggleBuyBudget(values);
			});

			// Rent - Price Slider
			this.rentPriceHandle = noUiSlider.create(this.rentPriceSlider, {
				start: [this.rentPrice[0], this.rentPrice[1]],
				connect: true,
				step: 500,
				range: {
					'min': this.rentPrice[0],
					'max': this.rentPrice[1]
				}
			});

			// Rent Price - Handler
			this.rentPriceHandle.on("update", function(values) {
				that.toggleRentPrice(values);
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

			// Baths 
			var bathsHandle = noUiSlider.create(this.bathsSlider, {
				start: [this.baths[0], this.baths[1]],
				connect: true,
				step: 0.5,
				range: {
					'min': this.baths[0],
					'max': this.baths[1]
				}
			});

			bathsHandle.on("update", function(values) {
				that.toggleBaths(values);
			});

			// Parking
			var parkingHandle = noUiSlider.create(this.parkingSlider, {
				start: [this.parking[0], this.parking[1]],
				connect: true,
				step: 0.5,
				range: {
					'min': this.parking[0],
					'max': this.parking[1]
				}
			});

			parkingHandle.on("update", function(values) {
				that.toggleParking(values);
			});

			// Home Type
			this.hometypeHouse.on("click", () => {
				this.hometypeUnactify();
				this.hometypeHouse.addClass("active");
				this.hometype = "house";
			});

			this.hometypeTownhouse.on("click", () => {
				this.hometypeUnactify();
				this.hometypeTownhouse.addClass("active");
				this.hometype = "townhouse";
			});

			this.hometypeAppartment.on("click", () => {
				this.hometypeUnactify();
				this.hometypeAppartment.addClass("active");
				this.hometype = "appartment";
			});

			this.hometypeCondo.on("click", () => {
				this.hometypeUnactify();
				this.hometypeCondo.addClass("active");
				this.hometype = "condo";
			});

			// Seller
			this.sellerOwner.on("click", () => {
				this.sellerUnactify();
				this.sellerOwner.addClass("active");
				this.seller = "owner";
			});

			this.sellerAgent.on("click", () => {
				this.sellerUnactify();
				this.sellerAgent.addClass("active");
				this.seller = "agent";
			});

			this.fixSettingsHeight();
			this.initPerfectScrollbar();
		},
		expand: function() {
			if (! this.opened) {
				this.toolBarDOM.toggleClass("active");
				//this.fixSettingsHeight();
				this.openButtonText.removeClass();
				this.openButtonText.attr("class", "glyphicon glyphicon-remove");
				this.header.addClass("active");
				this.body.addClass("active");
				this.opened = true;
			} else {
				this.toolBarDOM.removeClass("active");
				this.openButtonText.removeClass();
				this.openButtonText.attr("class", "glyphicon glyphicon-menu-hamburger");
				setTimeout(function() {
					this.header.removeClass("active");
					this.body.removeClass("active");
				}, 250);
				this.opened = false;
			}

			//this.fixSettingsHeight();
		},
		toggleBuy: function() {
			if (this.tab !== "buy") {
				this.bodyLoadingScreen.toggleClass("active");
				this.rentTabButton.removeClass("active");
				this.rentPriceWrapper.removeClass("active");
				this.buyTabButton.toggleClass("active");
				this.buyPriceWrapper.toggleClass("active");
				this.tab = "buy";
				// Needs to do: refresh list with AJAX
				this.bodyLoadingScreen.removeClass("active");
			}
		},
		toggleRent: function() {
			if (this.tab !== "rent") {
				this.bodyLoadingScreen.toggleClass("active");
				this.buyTabButton.removeClass("active");
				this.buyPriceWrapper.removeClass("active");
				this.rentTabButton.toggleClass("active");
				this.rentPriceWrapper.toggleClass("active");
				this.tab = "rent";
				// Needs to do: refresh list with AJAX
				this.bodyLoadingScreen.removeClass("active");
			}
		},
		toggleBuyBudget: function(values) {
			this.buyPriceMin.html("$" + Math.round(values[0]));
			this.buyPriceMax.html("$" + Math.round(values[1]));
		},
		toggleRentPrice: function(values) {
			this.rentPriceMin.html("$" + Math.round(values[0]));
			this.rentPriceMax.html("$" + Math.round(values[1]));
		},
		toggleSquareFeet: function(values) {
			this.squareFeetMin.html(Math.round(values[0]) + "ft²");
			this.squareFeetMax.html(Math.round(values[1]) + "ft²");
		},
		toggleRooms: function(values) {
			this.roomsMin.html(Math.round(values[0]));
			this.roomsMax.html(Math.round(values[1]));
		},
		toggleBaths: function(values) {
			this.bathsMin.html(values[0]);
			this.bathsMax.html(values[1]);
		},
		toggleParking: function(values) {
			this.parkingMin.html(values[0]);
			this.parkingMax.html(values[1]);
		},
		fixSettingsHeight: function() {
			var newHeight = window.innerHeight / 1.65;
			this.body.css("height", newHeight + "px");
		},
		hometypeUnactify: function() {
			this.hometypeHouse.removeClass("active");
			this.hometypeTownhouse.removeClass("active");
			this.hometypeAppartment.removeClass("active");
			this.hometypeCondo.removeClass("active");
		},
		sellerUnactify: function() {
			this.sellerOwner.removeClass("active");
			this.sellerAgent.removeClass("active");
		},
		initPerfectScrollbar: function() {
			toolBarScrollbar = new PerfectScrollbar(".body");
		}
	}

	var list = {
		tempLists: 20,
		listings: [],
		init: function() {
			this.cacheDOM();
			this.render();
		},
		cacheDOM: function() {
			this.listDOM = $("#list");
			this.template = document.getElementById("listing-template").innerHTML;
			this.loadingScreen = $(".loading-screen");
			this.creditLine = $("#credit-line");
		},
		render: function() {
			this.toggleLoadingScreen();
			this.fetchList();
			this.toggleLoadingScreen();
		},
		fetchList: function() {
			// Fetch listings JSON
			$.ajax({
				dataType: "json",
				url: "../json/listings.json", 
				success: (listings) => {
					//console.log(listings);
					for (var i = 0; i < listings.length; i++) {
						// console.log(listings[i].picturesrc1);
						var listing = new Listing(listings[i].id, listings[i].description, listings[i].type, listings[i].seller, listings[i].price, listings[i].beds, listings[i].baths, listings[i].squareft, listings[i].lotsize, listings[i].heating, listings[i].cooling, listings[i].appliances, listings[i].flooring, listings[i].parking, listings[i].driveways, listings[i].backyard, listings[i].otherInt, listings[i].otherExt, listings[i].hometype, listings[i].month, listings[i].day, listings[i].year, listings[i].tags, listings[i].zip, listings[i].city, listings[i].address, listings[i].picturesrc, listings[i].pictureCount);
						this.listings.push(listing);
						this.listings[i].init();
					}
				}
			});

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
		touchStartX: 0,
		touchStartY: 0,
		touchEndX: 0,
		touchEndY: 0,
		term: 180,
		id: null,
		description: null,
		type: null,
		seller: null,
		price: null,
		beds: null,
		baths: null,
		squareft: null,
		lotsize: null, 
		heating: null,
		cooling: null,
		appliances: null,
		flooring: null,
		parking: null,
		driveways: null,
		backyard: null,
		otherInt: null,
		otherExt: null,
		hometype: null,
		month: null,
		day: null,
		year: null,
		tags: null,
		zip: null,
		city: null,
		address: null,
		picturesrc: null,
		init: function() {
			this.cacheDOM();
			this.setEvents();
			this.render();
		},
		cacheDOM: function() {
			this.element = $("#window");
			this.elementVanilla = document.getElementById("window");
			this.backgroundOverlayElement = $("#window-background-overlay");
			this.pictureWrapperElement = $("#window .picture-wrapper");
			this.sliderControllerWrapper = $("#window .slider-controller-wrapper");
			this.arrowControllerWrapper = $("#window .arrow-controllers");
			this.arrowLeft = $("#window .arrow-controllers .arrow-left");
			this.arrowRight = $("#window .arrow-controllers .arrow-right");
			this.closeButton = $("#window .window-top-bar button.window-close-button");

			// Listing Info DOM Objects
			// General Info 
			this.DOMaddress = $("#window .address");
			this.DOMbedsBig = $("#window .beds");
			this.DOMbathsBig = $("#window .baths");
			this.DOMsqftBig = $("#window .sqft");
			this.DOMdescription = $("#window .description");
			this.DOMprice = $("#window .price");
			this.DOMmortgage = $("#window .mortgage");

			// Facts and Features
			this.DOMtype = $("#window .type");
			this.DOMhometype = $("#window .hometype");
			this.DOMyearbuilt = $("#window .year-built");
			this.DOMheating = $("#window .heating");
			this.DOMcooling = $("#window .cooling");
			this.DOMparking = $("#window .parking");
			this.DOMlotSize = $("#window .lot-size");
			this.DOMdaysListed = $("#window .days-listed");
			this.DOMpriceSqft = $("#window .price-sqft")
			this.DOMseller = $("#window .seller");

			// Interior Features
			this.DOMappliances = $("#window .appliances");
			this.DOMflooring = $("#window .flooring");
			this.DOMotherInt = $("#window .other-interior");
			
			// Exterior Features
			this.DOMotherExt = $("#window .other-exterior");
			this.DOMdriveways = $("#window .driveways");
			this.DOMbackyard = $("#window .backyard");

		},
		setEvents: function() {
			// Close Button and when unfocused clicked
			this.closeButton.on("click", () => {
				this.hide();
				this.emptyWindow();
			});

			this.backgroundOverlayElement.on("click", () => {
				this.hide();
				this.emptyWindow();
			});

			// Picture Wrapper (Lightbox toggle)
			this.pictureWrapperElement.on("click", () => {
				this.toggleLightbox();
			});

			// Arrow Controllers
			this.arrowLeft.on("click", () => {
				this.slideLeft();
			});

			this.arrowRight.on("click", () => {
				this.slideRight();
			});

			// Sildeshow Mobile Swipe
			this.pictureWrapperElement.on("touchstart", (e) => {
				if (e.originalEvent.targetTouches.length == 1) {
					var touch = e.originalEvent.targetTouches[0];
					this.touchStartX = touch.pageX;
					this.touchStartY = touch.pageY;
					//console.log("Touch detected.");
					//console.log(`X: ${this.touchStartX}, Y: ${this.touchStartY}`);
				}
			});

			this.pictureWrapperElement.on("touchend", (e) => {
				var touch = e.originalEvent.changedTouches[0];
				this.touchEndX = touch.pageX;
				this.touchEndY = touch.pageY;
				//console.log("Untouch detected.");
				//console.log(`X: ${this.touchEndX}, Y: ${this.touchEndY}`);
			
				this.handleSwipe(this.touchStartX, this.touchEndX);
			});
		},
		render: function(data) {
			this.id = data.id;
			this.description = data.description;
			this.type = data.type;
			this.seller = data.seller;
			this.price = data.price;
			this.beds = data.beds;
			this.baths = data.baths;
			this.squareft = data.squareft;
			this.lotsize = data.lotsize;
			this.heating = data.heating;
			this.cooling = data.cooling;
			this.appliances = data.appliances;
			this.flooring = data.flooring;
			this.parking = data.parking;
			this.driveways = data.driveways;
			this.backyard = data.backyard;
			this.otherInt = data.otherInt;
			this.otherExt = data.otherExt;
			this.hometype = data.hometype;
			this.month = data.month;
			this.day = data.day;
			this.year = data.year;
			this.tags = data.tags;
			this.zip = data.zip;
			this.city = data.city;
			this.address = data.address;
			// console.log(data.picturesrc);
			this.picturesrc = data.picturesrc;
			this.pictureCount = data.pictureCount;
			// console.log(data.pictureCount);
			//this.getPictureCount(this.picturesrc);
			this.displayPictures();
			this.updateInfo();
		},
		hide: function() {
			// Fade out window
			this.backgroundOverlayElement.fadeOut(fadeSpeed);
			this.element.fadeOut(fadeSpeed);

			// Scroll back to top
			this.elementVanilla.scrollTop = 0;
		},
		show: function(data) {
			this.backgroundOverlayElement.fadeIn(fadeSpeed);
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
			this.arrowLeft.addClass("disabled");
			this.arrowRight.removeClass("disabled");
		},
		updateInfo: function() {
			this.DOMaddress.html(this.address + " " + this.city + " " + this.zip);
			this.DOMbedsBig.html(this.beds);
			this.DOMbathsBig.html(this.baths);
			this.DOMsqftBig.html(this.squareft);
			//console.log(this.description);
			this.DOMdescription.html(this.description);
			this.DOMprice.html("$" + this.price);

			// Calculate Mortgage
			var mortgage = this.price.replace(",", "");
			this.DOMmortgage.html("$" + Math.round(parseInt(mortgage) / this.term) + "/mo");
			this.DOMtype.html(this.type.toUpperCase());
			this.DOMhometype.html(this.hometype);
			this.DOMyearbuilt.html(this.year);
			this.DOMheating.html(this.heating);
			this.DOMcooling.html(this.cooling);
			this.DOMparking.html(this.parking);
			this.DOMlotSize.html(this.lotsize);

			// Calculate Date Differences in Days Between Current Date and Listing Date
			var date1 = new Date(this.month + " " + this.day + ", " + this.year + " 00:00:00");
			var date2 = new Date();
			var dateDiff = Math.round((((((date2 - date1) / 1000) / 60) / 60) / 24));
			this.DOMdaysListed.html(dateDiff);

			// Calculate Price per Square Feet
			var pricePerSqft = Math.round(this.price.replace(",", "") / this.squareft);
			this.DOMpriceSqft.html("$" + pricePerSqft);
			this.DOMseller.html(this.seller);

			// Convert Appliance Array to String
			var apps = "";
			for(var i = 0; i < this.appliances.length; i++) {
				if (i === 0) {
					apps += this.appliances[i];
				} else {
					apps += ", " + this.appliances[i];
				}
			}
			this.DOMappliances.html(apps);

			// Convert Flooring Array to String
			var floor = "";
			for(var i = 0; i < this.flooring.length; i++) {
				if (i === 0) {
					floor += this.flooring[i];
				} else {
					floor += ", " + this.flooring[i];
				}
			}
			this.DOMflooring.html(floor);

			// Convert Other Interior Features Array to String
			var intFeat = "";
			for(var i = 0; i < this.otherInt.length; i++) {
				if (i === 0) {
					intFeat += this.otherInt[i];
				} else {
					intFeat += ", " + this.otherInt[i];
				}
			}
			this.DOMotherInt.html(intFeat);

			this.DOMdriveways.html(this.driveways);
			this.DOMbackyard.html(this.backyard);

			// Convert Other Exterior Features Array to String
			var extFeat = "";
			for(var i = 0; i < this.otherExt.length; i++) {
				if (i === 0) {
					extFeat += this.otherExt[i];
				} else {
					extFeat += ", " + this.otherExt[i];
					//console.log(extFeat);
				}
			}
			this.DOMotherExt.html(extFeat);
		},
		getPictureCount: function(src) {
			////console.log("[" + src + "] Fetching pictures..");
			var dataString = "src=" + src;
			var that = this;

			// AJAX
			// Fetches picture count from the server
			$.ajax({
				type: "POST",
				url: "php/fetch_picture_count.php",
				data: dataString,
				dataType: "json",
				success: function(count) {
					//console.log("Picture count fetched.");
					//console.log(count);
					that.pictureCount = count;
					that.displayPictures(src, count);
				},
				error: function() {
					//console.log("Connection failed.");
				}
			});
		},
		displayPictures: function(src, count) {
			var that = this;
			list.toggleLoadingScreen();

			// Create a picture element div for every picture in folder
			this.pictureWrapperElement.empty();
			for (var i = 0; i < this.pictureCount; i++) {
				this.pictureWrapperElement.append("<div class='picture'></div>");
				$(".picture-wrapper .picture:last-child").css("background-image", "url('" + this.picturesrc + "/" + i + ".jpg')");
			}

			// Append and store new controller per every picture (count)
			for (var i = 0; i < this.pictureCount; i++) {
				this.sliderControllerWrapper.append("<div class='controller' onclick='goToPic(this);'></div>");
				this.sliderControllers.push($("#window .slider-controller-wrapper .controller:last-child"));
				this.sliderControllers[i].attr("value", i);
				//console.log("New Value: " + this.sliderControllers[i].attr("value"));
			}

			// Append arrow controllers
			//this.pictureWrapperElement.append("<div class='arrow-controllers'><div class='arrow arrow-left'><i class='fa fa-angle-left' aria-hidden='true'></i></div><div class='arrow arrow-right'><i class='fa fa-angle-right' aria-hidden='true'></i></div></div>");

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
			if (newSlide > currentSlide) {
				// Calculate Amount of steps
				var steps = (newSlide - currentSlide) * 100;
				
				// Increase left margin X amount of steps
				this.pictureWrapperElement.animate({
					marginLeft: "-=" + steps + "%"
				}, this.slideSpeed);
				this.activePicture = parseInt(newSlide);
				this.disableArrowController();
			} else if (newSlide < currentSlide) {
				var steps = (currentSlide - newSlide) * 100;
				this.pictureWrapperElement.animate({
					marginLeft: "+=" + steps + "%"
				}, this.slideSpeed);
				this.activePicture = parseInt(newSlide);
				this.disableArrowController();
			} else if (newSlide === currentSlide) {
				//console.log("Lol.");
			}
		},
		toggleLightbox: function() {

			// Animate picture wrapper, transform into lightbox
			if (this.lightbox) {
				// If lightbox toggled
				// Set default CSS and contract wrapper
				this.pictureWrapperElement.css({
					"z-index": "0",
					"margin-top": "40px",
					"position": "static"
				}).animate({
					height: "50%",
				}, this.slideSpeed);

				// Set default CSS for picture divs
				$(".picture").css({
					"background-size": "cover"
				});

				// Set default CSS for controllers and animate to center
				this.sliderControllerWrapper.css({
					"z-index": "auto"
				}).animate({
					top: "50%"
				}, this.slideSpeed);

				this.arrowControllerWrapper.css({
					"z-index": "auto"
				}).animate({
					top: "30%"
				}, this.slideSpeed);

				// Make #window element overflow-y: hidden
				this.element.css("overflow-y", "scroll");

				this.lightbox = false;
			} else {
				// If lightbox not toggled
				// Set new CSS for picture wrapper and expand
				this.pictureWrapperElement.css({
					"z-index": "1001",
					"margin-top": "0",
					"position": "fixed"
				}).animate({
					height: "100%",
				}, this.slideSpeed);

				// Set new CSS for picture divs
				$(".picture").css({
					"background-size": "100%"
				});

				// Set new CSS for controllers and animate to bottom
				this.sliderControllerWrapper.css({
					"z-index": "1002"
				}).animate({
					top: "90%"
				}, this.slideSpeed);

				this.arrowControllerWrapper.css({
					"z-index": "1002"
				}).animate({
					top: "50%"
				}, this.slideSpeed);

				// Make #window element overflow-y: hidden
				this.element.css("overflow-y", "hidden");

				this.lightbox = true;
			}
		},
		handleSwipe: function(startX, endX) {
			if (endX < startX) {
				this.slideRight();
			}
			if (endX > startX) {
				this.slideLeft();
			}
		},
		slideRight: function() {
			if (parseInt(this.activePicture) === this.sliderControllers.length - 1) {
				// Stillness
			} else {
				this.pictureWrapperElement.animate({
					marginLeft: "-=100%"
				}, this.slideSpeed);
				this.activePicture = parseInt(this.activePicture) + 1;
				this.setActivePicture(this.sliderControllers[this.activePicture]);
				this.arrowLeft.removeClass("disabled");
				this.disableArrowController();
			}
		},
		slideLeft: function() {
			if (parseInt(this.activePicture) === 0) {
				// Stillness
			} else {
				this.pictureWrapperElement.animate({
					marginLeft: "+=100%"
				}, this.slideSpeed);
				this.activePicture = parseInt(this.activePicture) - 1;
				this.setActivePicture(this.sliderControllers[this.activePicture]);
				this.arrowRight.removeClass("disabled");
				this.disableArrowController();
			}
		},
		disableArrowController: function() {
			// If active picture is 1
			if (this.activePicture === 0) {
				this.arrowRight.removeClass("disabled");
				this.arrowLeft.addClass("disabled");
			} 

			// If active picture is last
			if (this.activePicture === this.sliderControllers.length - 1) {
				this.arrowLeft.removeClass("disabled");
				this.arrowRight.addClass("disabled");
			}

			// If active picture between 0 and picture count
			if (this.activePicture > 0 && this.activePicture < this.sliderControllers.length - 1) {
				this.arrowLeft.removeClass("disabled");
				this.arrowRight.removeClass("disabled");
			}
		}
	}

	//------------------
	//	  Responsive
	//------------------
	window.onresize = function() {
		toolBar.fixSettingsHeight();
		// Responsiveness
		// If Tool Bar is opened
		if (window.innerWidth > 767 && toolBar.opened) {
			toolBar.expand();
			//console.log("Tool bar")
		}

		//console.log("Window resized.");
		//console.log(googleMap.onResize());
		googleMap.onResize();
	}

	window.onload = function() {
		app.getSessionListing();
	}

	//------------------
	//	  Bindings
	//------------------
	window.goToPic = iWindow.setActivePicture;
	window.list = list;

	//------------------
	//	   Drivers
	//------------------
	//app.init();
	toolBar.init();
	googleMap.init();
	list.init();
	iWindow.init();
};