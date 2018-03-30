(function(GLOBAL, DOM) {

	'use strict';

	// Mobile Check
	var isMobile = false;

	if (/Mobi/.test(navigator.userAgent)) {
	    isMobile = true;
	}

	var app = {
		searchOptions: false,
		tabSelected: "buy",
		citySelected: null,
		location: null,
		priceMin: null,
		priceMax: null,
		beds: null,
		baths: null,
		features: [],
		nearByListings: [],
		recentListings: [],
		leastExpensiveListings: [],
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

			// Recent Built
			this.listing3Wrapper = $("#listing-3");
			this.listing4Wrapper = $("#listing-4");
			this.listing5Wrapper = $("#listing-5");
			this.listing3Address = $("#listing-3 .listing-address");
			this.listing4Address = $("#listing-4 .listing-address");
			this.listing5Address = $("#listing-5 .listing-address");
			this.listing3Price = $("#listing-3 .listing-price");
			this.listing4Price = $("#listing-4 .listing-price");
			this.listing5Price = $("#listing-5 .listing-price");
			this.listing3Sqft = $("#listing-3 .listing-square-feet");
			this.listing4Sqft = $("#listing-4 .listing-square-feet");
			this.listing5Sqft = $("#listing-5 .listing-square-feet");
			this.listing3Month = $("#listing-3 .listing-month");
			this.listing4Month = $("#listing-4 .listing-month");
			this.listing5Month = $("#listing-5 .listing-month");
			this.listing3Day = $("#listing-3 .listing-day");
			this.listing4Day = $("#listing-4 .listing-day");
			this.listing5Day = $("#listing-5 .listing-day");
			this.listing3Picture = $("#listing-3 .listing-picture");
			this.listing4Picture = $("#listing-4 .listing-picture");
			this.listing5Picture = $("#listing-5 .listing-picture");

			// Least Expensive
			this.listing6Wrapper = $("#listing-6");
			this.listing7Wrapper = $("#listing-7");
			this.listing8Wrapper = $("#listing-8");
			this.listing6Address = $("#listing-6 .listing-address");
			this.listing7Address = $("#listing-7 .listing-address");
			this.listing8Address = $("#listing-8 .listing-address");
			this.listing6Price = $("#listing-6 .listing-price");
			this.listing7Price = $("#listing-7 .listing-price");
			this.listing8Price = $("#listing-8 .listing-price");
			this.listing6Sqft = $("#listing-6 .listing-square-feet");
			this.listing7Sqft = $("#listing-7 .listing-square-feet");
			this.listing8Sqft = $("#listing-8 .listing-square-feet");
			this.listing6Month = $("#listing-6 .listing-month");
			this.listing7Month = $("#listing-7 .listing-month");
			this.listing8Month = $("#listing-8 .listing-month");
			this.listing6Day = $("#listing-6 .listing-day");
			this.listing7Day = $("#listing-7 .listing-day");
			this.listing8Day = $("#listing-8 .listing-day");
			this.listing6Picture = $("#listing-6 .listing-picture");
			this.listing7Picture = $("#listing-7 .listing-picture");
			this.listing8Picture = $("#listing-8 .listing-picture");

			// Miscellaneous
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
				this.setCurrentListing(this.nearByListings[0].id);
			});

			this.listings1Wrapper.on("click", () => {
				this.setCurrentListing(this.nearByListings[1].id);
			});

			this.listings2Wrapper.on("click", () => {
				this.setCurrentListing(this.nearByListings[2].id);
			});

			this.listing3Wrapper.on("click", () => {
				this.setCurrentListing(this.recentListings[0].id);
			});

			this.listing4Wrapper.on("click", () => {
				this.setCurrentListing(this.recentListings[1].id);
			});

			this.listing5Wrapper.on("click", () => {
				this.setCurrentListing(this.recentListings[2].id);
			});

			this.listing6Wrapper.on("click", () => {
				this.setCurrentListing(this.leastExpensiveListings[0].id);
			});

			this.listing7Wrapper.on("click", () => {
				this.setCurrentListing(this.leastExpensiveListings[1].id);
			});

			this.listing8Wrapper.on("click", () => {
				this.setCurrentListing(this.leastExpensiveListings[2].id);
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
					this.getRecentListings(listings);
					this.getLeastExpensiveListings(listings);
				}
			});
		},
		getNearbyListings: function(listings) {
			for (var i = 0; i < listings.length; i++) {
				if (listings[i].city === this.location) {
					this.nearByListings.push(listings[i]);
				}
			}

			this.renderListingData("nearby", this.nearByListings);
		},
		getRecentListings: function(listings) {
			for (var i = 0; i < listings.length; i++) {
				if (listings[i].year == (new Date()).getFullYear()) {
					this.recentListings.push(listings[i]);
				}
			}

			this.renderListingData("recentBuilt", this.recentListings);
		},
		getLeastExpensiveListings: function(listings) {
			for (var i = 0; i < listings.length; i++) {
				if (parseInt(listings[i].price) > 0) {
					this.leastExpensiveListings.push(listings[i]);
				}
			}

			this.renderListingData("leastExpensive", this.leastExpensiveListings);
		},
		renderListingData: function(type, listings) {
			switch (type) {
				case "nearby":
					// Listing 0 Data
					this.listing0Price.html("$" + listings[0].price);
					this.listing0Address.html(listings[0].address);
					this.listing0Sqft.html(listings[0].squareft + "sqft");
					this.listing0Month.html(listings[0].month.toUpperCase().substring(0, 3));
					this.listing0Day.html(listings[0].day);
					this.listing0Picture.css("background-image", "url('" + listings[0].picturesrc0 + "/0.jpg')");
					
					// Listing 1 Data
					this.listing1Price.html("$" + listings[1].price);
					this.listing1Address.html(listings[1].address);
					this.listing1Sqft.html(listings[1].squareft + "sqft");
					this.listing1Month.html(listings[1].month.toUpperCase().substring(0, 3));
					this.listing1Day.html(listings[1].day);
					this.listing1Picture.css("background-image", "url('" + listings[1].picturesrc0 + "/0.jpg')");
					
					// Listing 2 Data
					this.listing2Price.html("$" + listings[2].price);
					this.listing2Address.html(listings[2].address);
					this.listing2Sqft.html(listings[2].squareft + "sqft");
					this.listing2Month.html(listings[2].month.toUpperCase().substring(0, 3));
					this.listing2Day.html(listings[2].day);
					this.listing2Picture.css("background-image", "url('" + listings[2].picturesrc0 + "/0.jpg')");
				break;

				case "recentBuilt":
					// Listing 3 Data
					this.listing3Price.html("$" + listings[0].price);
					this.listing3Address.html(listings[0].address);
					this.listing3Sqft.html(listings[0].squareft + "sqft");
					this.listing3Month.html(listings[0].month.toUpperCase().substring(0, 3));
					this.listing3Day.html(listings[0].day);
					this.listing3Picture.css("background-image", "url('" + listings[0].picturesrc0 + "/0.jpg')");

					/*// Listing 4 Data
					this.listing4Price.html("$" + listings[1].price);
					this.listing4Address.html(listings[1].address);
					this.listing4Sqft.html(listings[1].squareft + "sqft");
					this.listing4Month.html(listings[1].month.toUpperCase().substring(0, 3));
					this.listing4Day.html(listings[1].day);
					this.listing4Picture.css("background-image", "url('" + listings[1].picturesrc0 + "/0.jpg')");
					
					// Listing 5 Data
					this.listing5Price.html("$" + listings[2].price);
					this.listing5Address.html(listings[2].address);
					this.listing5Sqft.html(listings[2].squareft + "sqft");
					this.listing5Month.html(listings[2].month.toUpperCase().substring(0, 3));
					this.listing5Day.html(listings[2].day);
					this.listing5Picture.css("background-image", "url('" + listings[2].picturesrc0 + "/0.jpg')");
					*/
				break;

				case "leastExpensive":
					// Listing 6 Data
					this.listing6Price.html("$" + listings[0].price);
					this.listing6Address.html(listings[0].address);
					this.listing6Sqft.html(listings[0].squareft + "sqft");
					this.listing6Month.html(listings[0].month.toUpperCase().substring(0, 3));
					this.listing6Day.html(listings[0].day);
					this.listing6Picture.css("background-image", "url('" + listings[0].picturesrc0 + "/0.jpg')");
					
					// Listing 7 Data
					this.listing7Price.html("$" + listings[1].price);
					this.listing7Address.html(listings[1].address);
					this.listing7Sqft.html(listings[1].squareft + "sqft");
					this.listing7Month.html(listings[1].month.toUpperCase().substring(0, 3));
					this.listing7Day.html(listings[1].day);
					this.listing7Picture.css("background-image", "url('" + listings[1].picturesrc0 + "/0.jpg')");
					
					// Listing 8 Data
					this.listing8Price.html("$" + listings[2].price);
					this.listing8Address.html(listings[2].address);
					this.listing8Sqft.html(listings[2].squareft + "sqft");
					this.listing8Month.html(listings[2].month.toUpperCase().substring(0, 3));
					this.listing8Day.html(listings[2].day);
					this.listing8Picture.css("background-image", "url('" + listings[2].picturesrc0 + "/0.jpg')");
				break;
			}
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
					this.goToApp();
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
		goToApp: function() {
			GLOBAL.location.href = "./finder";
		},
		setCurrentListing: function(id) {
			$.ajax({
				url: "php/set_current_listing.php",
				type: "POST",
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