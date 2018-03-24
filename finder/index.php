<?php

	session_start();
	
?>
<!doctype html>
<html lang="en">
<head>
	<title>Test</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge />">
	<meta http-equiv="content-type" content="text/html" charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="author" content="Alex Meza" />
	<meta name="keywords" content="HTML, CSS, JavaScript, jQuery, jQueryUI, Bootstrap" />
	<meta name="prototype" content="0" />
	<meta name="date" content="" />
	<meta name="description" content="" />
	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
	<link rel="stylesheet" href="assets/css/main.css" />
	<link rel="stylesheet" href="assets/css/jquery-ui.min.css">
	<link rel="stylesheet" href="assets/css/animate.css">
	<link rel="stylesheet" href="assets/css/nouislider.min.css">
	<link rel="stylesheet" href="assets/css/font-awesome.min.css">
</head>
<body>
	<!-- Intro Screen -->
	<!-- 
	<div id="intro-screen">
		<canvas id="granim-background"></canvas>
		<img src="assets/images/new-logo.png" />
		<div class="content">
			<h1>Find Your Home Today</h1>
			<form>
				<input placeholder="City, zip code, street" type="name" />
				<button id="intro-search-button">Search</button>
			</form>
		</div>
	</div> -->

	<!-- wrapper start -->
	<div id="background"></div>
	<div id="gmap"></div>
	<div id="test"></div>

	<!-- Tool Bar -->
	<div id="side-bar" class="desktop">
		<div class="header">
			<img src="assets/images/new-logo.png" />
			<div class="body-top-buttons">
				<div class="active buy-button option-tab">
					Buy
					<div class="active-tab-cover"></div>
				</div>
				<div class="rent-button option-tab">
					Rent
					<div class="active-tab-cover"></div>
				</div>
			</div>
			<div class="location-wrapper">
				<!--
				<form>
					<input type="text" placeholder="City, zip code, street"/>
					<button><span class="glyphicon glyphicon-search"></span></button>
				</form>
				-->

				<select id="city-select">
					<option value="" selected disabled hidden>Select Your City</option>
					<option value="Carslbad">Carslbad</option>
					<option value="ChulaVista">Chula Vista</option>
					<option value="Coronado">Coronado</option>
					<option value="DelMar">Del Mar</option>
					<option value="ElCajon">El Cajon</option>
					<option value="Encinitas">Encinitas</option>
					<option value="Escondido">Escondido</option>
					<option value="ImperialBeach">Imperial Beach</option>
					<option value="LaMesa">La Mesa</option>
					<option value="LemonGrove">Lemon Grove</option>
					<option value="NationalCity">National City</option>
					<option value="Oceanside">Oceanside</option>
					<option value="Poway">Poway</option>
					<option value="SanDiego">San Diego</option>
					<option value="SanMarcos">San Marcos</option>
					<option value="Santee">Santee</option>
					<option value="SonadaBeach">Sonada Beach</option>
					<option value="Vista">Vista</option>
				</select>
				<div class="city-select-icon">
					<i class="fa fa-map"></i>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="body-loading">
				<div class="spinner">
					<i class="fa fa-circle-o-notch" aria-hidden="true"></i>
					<div></div>
				</div>
			</div>
			<div class="buy-wrapper active">
				<div class="price slider-wrapper">
					<p>Price</p>
					<br />
					<div class="slider" id="buy-budget-slider"></div>
					<ul>
						<li><div class="min"></div></li>
						<li><div class="max"></div></li>
					</ul>
				</div>
			</div>
			<div class="rent-wrapper">
				<div class="price slider-wrapper">
					<p>Rent</p>
					<br />
					<div class="slider" id="rent-price-slider"></div>
					<ul>
						<li><div class="min"></div></li>
						<li><div class="max"></div></li>
					</ul>
				</div>
			</div>
			<div class="square-feet slider-wrapper">
				<p>Square Feet</p>
				<br />
				<div class="slider" id="square-slider"></div>
				<ul>
					<li><div class="min"></div></li>
					<li><div class="max"></div></li>
				</ul>
			</div>
			<div class="beds slider-wrapper">
				<p>Beds</p>
				<br />
				<div class="slider" id="beds-slider"></div>
				<ul>
					<li><div class="min"></div></li>
					<li><div class="max"></div></li>
				</ul>
			</div>
			<div class="baths slider-wrapper">
				<p>Baths</p>
				<br />
				<div class="slider" id="baths-slider"></div>
				<ul>
					<li><div class="min"></div></li>
					<li><div class="max"></div></li>
				</ul>
			</div>
			<div class="parking slider-wrapper">
				<p>Parking</p>
				<br />
				<div class="slider" id="parking-slider"></div>
				<ul>
					<li><div class="min"></div></li>
					<li><div class="max"></div></li>
				</ul>
			</div>
			<div class="hometype slider-wrapper">
				<p>Home Type</p>
				<br />
				<button id="hometype-house" class="left active">House</button>
				<button id="hometype-townhouse" class="right">Townhouse</button>
				<button id="hometype-appartment" class="left">Appartment</button>
				<button id="hometype-condo" class="right">Condo</button>
			</div>
			<div style="clear: both"></div>
			<br />
			<br />
			<div class="seller slider-wrapper">
				<p>Seller</p>
				<br />
				<button id="seller-owner" class="left active">Owner</button>
				<button id="seller-agent" class="right">Agent</button>
				<div style="clear: both"></div>
				<div style="clear: both"></div>
			</div>
		</div>
		<div class="footer">
			<img src="assets/images/sd-home-finder-white.png" />
			<button><span class="glyphicon glyphicon-menu-hamburger"></span></button>
		</div>
	</div>	

	<!-- View Controller -->
	<div id="views">
		<button class="active"><span class="glyphicon glyphicon-th-list"></span></button>
		<button><span class="glyphicon glyphicon-map-marker"></span></button>
	</div>

	<!-- Listings -->
	<div id="list">
		<div class="loading-screen">
			<div class="spinner">
				<i class="fa fa-circle-o-notch" aria-hidden="true"></i>
				<div></div>
			</div>
		</div>
	</div>

	<!-- Google Map -->
	<div id="map-wrapper">
		<div class="draggable-tab">
			<div class="cover-up"></div>
			<div class="tab">
				<i class="fa fa-arrows-v" aria-hidden="true"></i>
			</div>
			<div class="middle-line">

			</div>
		</div>
		<div id="map">

		</div>
	</div>
	
	<!-- Window -->
	<div id="window">
		<div class="window-top-bar">
			<button class="window-share-button"><i class="fa fa-share-alt" aria-hidden="true"></i>&nbsp;&nbsp;Share</button>
			<button class="window-save-button"><i class="fa fa-heart" aria-hidden="true"></i>&nbsp;&nbsp;Save</button>
			<button class="window-close-button"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<button class="close-button"><span class="glyphicon glyphicon-remove"></span></button>
		<!-- Picture Slideshow -->
		<div class="picture-wrapper"></div>
		<!-- Slideshow Controllers -->
		<div class="slider-controller-wrapper"></div>
		<!-- Slideshow Arrow Controllers -->
		<div class='arrow-controllers'>
			<div class='arrow arrow-left disabled'>
				<i class='fa fa-angle-left' aria-hidden='true'></i>
			</div>
			<div class='arrow arrow-right'>
				<i class='fa fa-angle-right' aria-hidden='true'></i>
			</div>
		</div>
		<div class="info-wrapper container">
			<!-- First Third -->
			<div class="row">
				<div class="col-sm-8">
					<h2 class="address h2 bold">1476 Caminito Sardinia, Chula Vista, CA 91915</h2>
					<ul class="general-info-1 nowrap">
						<li class="h3 bold"><h3 class="bold"><span class="beds">4</span> beds&nbsp;</h3></li>
						<li class="h3 bold"><h3 class="bold"><span>&middot;</span>&nbsp;<span class="baths">4</span> baths&nbsp;</h3></li>
						<li class="h3 bold"><h3 class="bold"><span>&middot;</span>&nbsp;<span class="sqft">3,100</span> sqft</h3></li>
					</ul>
					<div class="clear"></div>
					<p class="description">
						
					</p>
				</div>
				<div class="col-sm-4 general-info-2">
					<br />
					<div class="row price-row">
						<div class="col-xs-6">
							<h5 class="h5"><div class="expiration animated flash infinite"></div>FOR <span class="type"></span></h5>
							<h3 class="price h3 bold"></h3>
						</div>
						<div class="col-xs-6">
							<h5 class="h5">EST. Morgage</h5>
							<h3 class="mortgage h3 bold"></h3>
						</div>
					</div>
					<h3 class="h3">Facts and Features</h3>
					<br />
					<div class="features">
						<div class="row">
							<div class="col-xs-4">
								<span><i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;&nbsp;Type</span>
								<h6 class="hometype"></h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-calendar-o" aria-hidden="true"></i>&nbsp;&nbsp;Built</span>
								<h6 class="year-built"></h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-thermometer-half" aria-hidden="true"></i>&nbsp;&nbsp;Heating</span>
								<h6 class="heating"></h6>
							</div>
						</div>
						<br />
						<div class="row">
							<div class="col-xs-4">
								<span><i class="fa fa-snowflake-o" aria-hidden="true"></i>&nbsp;&nbsp;Cooling</span>
								<h6 class="cooling"></h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-product-hunt" aria-hidden="true"></i>&nbsp;&nbsp;Parking</span>
								<h6 class="parking">3</h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-map" aria-hidden="true"></i>&nbsp;&nbsp;Lot</span>
								<h6><span class="lot-size"></span> sqft</h6>
							</div>
						</div>
						<br />
						<div class="row">
							<div class="col-xs-4">
								<span><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;Days</span>
								<h6 class="days-listed"></h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-money" aria-hidden="true"></i>&nbsp;&nbsp;Price/sqft</span>
								<h6 class="price-sqft"></h6>
							</div>
							<div class="col-xs-4">
								<span><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Seller</span>
								<h6 class="seller"></h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<hr />

			<!-- Second Third -->
			<div class="row listed-features">
				<!-- Interior Features -->
				<div class="col-md-4 interior-features">
					<h3 class="h3">Interior Features</h3>
					<div class="row">
						<div class="col-xs-6">
							<h4 class="h4 bold">Bedrooms</h4>
							<p><span class="soft">Beds:</span> <span class="beds"></span></p>
							<h4 class="h4 bold">Bathrooms</h4>
							<p><span class="soft">Baths:</span> <span class="baths"></span></p>
							<h4 class="h4 bold">Heating</h4>
							<p><span class="soft">Heating:</span> <span class="heating"></span></p>
							<h4 class="h4 bold">Cooling</h4>
							<p><span class="soft">Cooling:</span> <span class="cooling"></span></p>
						</div>
						<div class="col-xs-6">
							<h4 class="h4 bold">Appliances</h4>
							<p><span class="soft">Included:</span> <span class="appliances"></span></p>
							<h4 class="h4 bold">Flooring</h4>
							<p><span class="soft">Floor size:</span> <span class="sqft"></span> sqft</p>
							<p><span class="soft">Flooring:</span> <span class="flooring"></span></p>
							<h4 class="h4 bold">Other Interior Features</h4>
							<p><span class="other-interior"></span></p>
						</div>
					</div>
				</div>
				<!-- Exterior Features -->
				<div class="col-md-4 exterior-features">
					<h3 class="h3">Exterior Features</h3>
					<div class="row">
						<div class="col-xs-6">
							<h4 class="h4 bold">Parking</h4>
							<p><span class="soft">Parking:</span> <span class="parking"></span></p>
							<h4 class="h4 bold">Driveways</h4>
							<p><span class="soft">Driveways:</span> <span class="driveways"></span></p>
							<h4 class="h4 bold">Backyard</h4>
							<p><span class="soft">Backyard:</span> <span class="backyard"></span></p>
						</div>
						<div class="col-xs-6">
							<h4 class="h4 bold">Other Exterior Features</h4>
							<p><span class="other-exterior"></span></p>
						</div>
					</div>
				</div>
				<!-- Contact Form -->
				<div class="col-md-4 contact">
					<div class="contact-form">
						<div class="top-bar">
							<h3 class="h3">Contact Seller</h3>
						</div>
						<form>
							<label for="full-name">Full Name</label>
							<input type="name" name="full-name" />
							<br />
							<label for="email">Email</label>
							<input type="email" name="email"/>
							<br />
							<label for="message">Message</label>
							<textarea name="message"></textarea>
							<br />
							<input type="submit" name="submit" />
						</form>
					</div>
				</div>
			</div>
			<br />
			<hr />

			<!-- Third Third -->
			<h3 class="h3">Similar Listings</h3>
			<div class="row similar-listing">
				<div class="col-sm-3">
					<button class="listing-sim">
					</button>
				</div>
				<div class="col-sm-3">
					<button class="listing-sim">
					</button>
				</div>
				<div class="col-sm-3">
					<button class="listing-sim">
					</button>
				</div>
				<div class="col-sm-3">
					<button class="listing-sim">
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Misc -->
	<div id="window-background-overlay"></div>

	<div id="credit-line">
		<a href="https://instagram.com/mezawebdev">@mezawebdev</a>
	</div>



	<!-- Templates -->
	<!-- Listing -->
	<script type="template/javascript" id="listing-template">
		<div class="listing">
			<div class="listing-date">
				<div class="listing-month"></div>
				<p class="listing-day old-month"></p>
			</div>
			<div class="listing-picture">
			</div>
			<hr />
			<ul>
				<li class="listing-price"></li>
				<li class="listing-address"></li>
				<li class="listing-square-feet"></li>
			</ul>
			<div class="navigation">
				<button class="listing-button like-button"><i class="fa fa-star" aria-hidden="true"></i></button>
				<button class="listing-button locate-button"><i class="fa fa-map-marker aria-hidden="true"></i></button>
			</div>
		</div>
	</script>
	<!-- wrapper ends -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery-ui.min.js"></script>
	<script src="assets/js/jquery-ui-mob.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/nouislider.min.js"></script>
	<script src="assets/js/granim.min.js"></script>
	<script src="assets/js/perfect-scrollbar.min.js"></script>
	<script src="assets/js/main.js"></script>
	<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzB4QEH-YIMu5ZyRuOYebPMrYAGlYZodE&callback=initMap&libraries=places">
    </script>
</body>
</html>
