(function(GLOBAL, DOM) {

	'use strict';

	// Mobile Check
	var isMobile = false;

	if (/Mobi/.test(navigator.userAgent)) {
	    isMobile = true;
	}

	var app = {
		searchOptions: false,
		tabSelected: "all",
		citySelected: null,
		location: null,
		priceMin: null,
		priceMax: null,
		beds: null,
		baths: null,
		nearByListings: [],
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.getLocation();
			this.render();
		},
		cacheDOM: function() {
			// Search Options
			this.allButton = $("#option-all");
			this.buyButton = $("#option-buy");
			this.rentButton = $("#option-rent");
			this.newButton = $("#option-new");
			this.citySpan = $(".city-span");
			this.section0Wrapper = $("#section-0");
			this.background = $(".background");
			this.searchOptionsIcon = $(".search-options-btn i");

			// Arrows
			this.allButtonArrow = $("#option-all .arrow");
			this.buyButtonArrow = $("#option-buy .arrow");
			this.rentButtonArrow = $("#option-rent .arrow");
			this.newButtonArrow = $("#option-new .arrow");
			this.searchOptionsButton = $(".search-options-btn");
			this.searchOptionsWrapper = $(".search-options-wrapper");
			this.searchButton = $(".search-btn");
			this.selectVanilla = document.getElementById("city-select");
			this.priceMinElement = document.getElementById("price-min-select");
			this.priceMaxElement = document.getElementById("price-max-select");
			this.bedsElement = document.getElementById("beds-select");
			this.bathsElement = document.getElementById("baths-select");

			// Nearby Listings 
			this.listing0Wrapper = $("#listing-0");
			this.listings1Wrapper = $("#listing-1");
			this.listings2Wrapper = $("#listing-2");
			this.listing0Address = $("#listing-0 .listing-address");
			this.listing1Address = $("#listing-1 .listing-address");
			this.listing2Address = $("#listing-2 .listing-address");
			this.listing0Price = $("#listing-0 .listing-price");
			this.listing1Price = $("#listing-1 .listing-price");
			this.listing2Price = $("#listing-2 .listing-price");
			this.listing0Sqft = $("#listing-0 .listing-square-feet");
			this.listing1Sqft = $("#listing-1 .listing-square-feet");
			this.listing2Sqft = $("#listing-2 .listing-square-feet");
			this.listing0Month = $("#listing-0 .listing-month");
			this.listing1Month = $("#listing-1 .listing-month");
			this.listing2Month = $("#listing-2 .listing-month");
			this.listing0Day = $("#listing-0 .listing-day");
			this.listing1Day = $("#listing-1 .listing-day");
			this.listing2Day = $("#listing-2 .listing-day");
			this.listing0Picture = $("#listing-0 .listing-picture");
			this.listing1Picture = $("#listing-1 .listing-picture");
			this.listing2Picture = $("#listing-2 .listing-picture");
			this.cityError = $(".select .error-message");
		},
		fireEvents: function() {
			this.allButton.on("click", () => {
				this.unactify("home-options");
				this.allButton.addClass("active");
				this.allButtonArrow.addClass("active");
				this.tabSelected = "all";
			});
			this.buyButton.on("click", () => {
				this.unactify("home-options");
				this.buyButton.addClass("active");
				this.buyButtonArrow.addClass("active");
				this.tabSelected = "buy";
			});
			this.rentButton.on("click", () => {
				this.unactify("home-options");
				this.rentButton.addClass("active");
				this.rentButtonArrow.addClass("active");
				this.tabSelected = "rent";
			});
			this.newButton.on("click", () => {
				this.unactify("home-options");
				this.newButton.addClass("active");
				this.newButtonArrow.addClass("active");
				this.tabSelected = "new";
			});

			this.searchOptionsButton.on("click", () => {
				if (this.searchOptions) {
					this.searchOptionsWrapper.removeClass("active");
					this.searchOptionsIcon.removeClass();
					this.searchOptionsIcon.addClass("ion-plus-circled");
					this.searchOptions = false;
				} else {
					this.searchOptionsWrapper.addClass("active");
					this.searchOptionsIcon.removeClass();
					this.searchOptionsIcon.addClass("ion-minus-circled");
					this.searchOptions = true;
				}
			});

			this.selectVanilla.onchange = () => {
				this.citySelected = this.selectVanilla.options[this.selectVanilla.selectedIndex].value;
				this.selectVanilla.className = "";
				//console.log(this.citySelected);
			}

			this.priceMinElement.onchange = () => {
				this.priceMin = this.priceMinElement.options[this.priceMinElement.selectedIndex].value;
			}

			this.priceMinElement.onchange = () => {
				this.priceMax = this.priceMaxElement.options[this.priceMaxElement.selectedIndex].value;
			}

			this.bedsElement.onchange = () => {
				this.beds = this.bedsElement.options[this.bedsElement.selectedIndex].value;
			}

			this.bathsElement.onchange = () => {
				this.baths = this.bathsElement.options[this.bathsElement.selectedIndex].value;
			}

			this.searchButton.on("click", (e) => {	
				e.preventDefault();
				this.authenticate();
			});

			this.listing0Wrapper.on("click", () => {
				this.goToApp(this.nearByListings[0].id);
			});

			this.listings1Wrapper.on("click", () => {
				this.goToApp(this.nearByListings[1].id);
			});

			this.listings2Wrapper.on("click", () => {
				this.goToApp(this.nearByListings[2].id);
			});
		},
		render: function() {
			if (isMobile) {
				this.background.addClass("mobile");
			} else {
				this.background.attr("data-vide-bg", "assets/videos/san-diego-2.mp4");
				this.background.attr("data-vide-options", "loop: true, muted: true, position: 50% 50%");
			}
		},
		unactify: function(option) {
			// Remove "active" class from element
			switch (option) {
				case "home-options":
					this.allButton.removeClass("active");
					this.buyButton.removeClass("active");
					this.rentButton.removeClass("active");
					this.newButton.removeClass("active");
					this.allButtonArrow.removeClass("active");
					this.buyButtonArrow.removeClass("active");
					this.rentButtonArrow.removeClass("active");
					this.newButtonArrow.removeClass("active");
					break;
			}
		},
		getLocation: function() {
			// Gets current location, bypassing SSL Certificate
			$.getJSON("http://ip-api.com/json", (data, status) => {
				if (status === "success") {
					this.location = data.city;
			  		this.citySpan.html(this.location);
			  		this.fetchListings();
				}
			});
		},
		fetchListings: function() {
			$.ajax({
				url: "json/listings.json",
				dataType: "json",
				success: (listings) => {
					this.getNearbyListings(listings);
				}
			});
		},
		getNearbyListings: function(listings) {
			for (var i = 0; i < listings.length; i++) {
				if (listings[i].city === this.location) {
					this.nearByListings.push(listings[i]);
				}
			}

			this.renderListingData(this.nearByListings);
		},
		renderListingData: function(listings) {
			// Listing 0 Data
			this.listing0Price.html("$" + listings[0].price);
			this.listing0Address.html(listings[0].address);
			this.listing0Sqft.html(listings[0].squareft + "sqft");
			this.listing0Month.html(listings[0].month.toUpperCase().substring(0, 3));
			this.listing0Day.html(listings[0].day);
			this.listing0Picture.css("background-image", "url('" + listings[0].picturesrc + "/0.jpg')");
			
			// Listing 1 Data
			this.listing1Price.html("$" + listings[1].price);
			this.listing1Address.html(listings[1].address);
			this.listing1Sqft.html(listings[1].squareft + "sqft");
			this.listing1Month.html(listings[1].month.toUpperCase().substring(0, 3));
			this.listing1Day.html(listings[1].day);
			this.listing1Picture.css("background-image", "url('" + listings[1].picturesrc + "/0.jpg')");
			
			// Listing 2 Data
			this.listing2Price.html("$" + listings[2].price);
			this.listing2Address.html(listings[2].address);
			this.listing2Sqft.html(listings[2].squareft + "sqft");
			this.listing2Month.html(listings[2].month.toUpperCase().substring(0, 3));
			this.listing2Day.html(listings[2].day);
			this.listing2Picture.css("background-image", "url('" + listings[2].picturesrc + "/0.jpg')");
		},
		updateSessionVariables: function() {
			// Set PHP Session Variables
			$.ajax({
				url: "./php/set_session_variables.php",
				type: "POST",
				data: {
					city: this.citySelected,
					priceMin: this.priceMin,
					priceMax: this.priceMax,
					beds: this.beds,
					baths: this.baths,
					tab: this.tabSelected
				},
				success: (data) => {
					console.log(data);
					//this.goToApp();
					//GLOBAL.location.href = "./finder";
				}
			});
		},
		authenticate: function() {
			if (! this.citySelected) {
				this.cityError.addClass("active");
				this.selectVanilla.className = "focus";
				setTimeout(() => {
					this.cityError.removeClass("active");
				}, 3000);
			} else {
				this.updateSessionVariables();
			}
		},
		goToApp: function(listingID) {
			if (listingID) {
				this.setCurrentListing(listingID);
			} else {
				GLOBAL.location.href = "./finder";
			}
		},
		setCurrentListing: function(id) {
			$.ajax({
				url: "php/set_current_listing.php",
				data: {
					listing: id
				},
				success: () => {
					this.goToApp();
				}
			});
		}
	}

	var navbar = {
		init: function() {
			this.cacheDOM();
			this.fireEvents();
		},
		cacheDOM: function() {
			this.navbarElement = $(".navbar");
		},
		fireEvents: function() {

		},
		minimize: function() {
			this.navbarElement.addClass("minimized");
		},
		unminimize: function() {
			this.navbarElement.removeClass("minimized");
		}
	}

	GLOBAL.onscroll = function() {
		if (GLOBAL.pageYOffset > 0) {
			//navbar.minimize();
		} else {
			//navbar.unminimize();
		}
	}

	app.init();
	//navbar.init();

}(window, document));