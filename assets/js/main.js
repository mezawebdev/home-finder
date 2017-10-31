//(function() {

	'use strict';

	var toolBar = {
		opened: false,
		tab: "buy",
		location: "eastlake",
		budget: [1000, 3000],
		squareFeet: [1000, 5000],
		rooms: [1, 4],
		init: function() {
			this.cacheDOM();
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
			}
		},
		toggleMap: function() {
			if (this.tab !== "map") {
				this.listButton.removeClass();
				this.mapButton.toggleClass("active");
				this.tab = "map";
			}
		}
	}

	var list = {
		listings: [],
		init: function() {
			this.cacheDOM();
			this.fetchList();
			this.render();
		},
		cacheDOM: function() {
			this.list = $("#list");
			this.template = document.getElementById("listing-template").innerHTML;
		},
		fetchList: function(list) {
			listingCount = 5;
			for (var i = 0; i < listingCount; i++) {
				this.listings.push({
					date: "",
					price: "",
					squareFeet: "",
					pictureSrc: "",
					element: null
				});
			}
		},
		render: function() {

		}
	}

	toolBar.init();
	views.init();
	list.init();

//}());