<?php
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<title>San Diego Home Finder</title>
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
	<link rel="stylesheet" href="assets/css/ionicons.min.css">
</head>
<body>
	<!-- wrapper start -->
	<div class="background"></div>

	<nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">San Diego Home Finder</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Search</a></li>
            <li><a href="#about">Rent</a></li>
            <li><a href="#contact">Sell</a></li>
            <li><a href="#contact">Near You</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="./">My Account</span></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <!--	 Navigation		-->
    <div id="section-0">  
    	<div class="overlay"></div>
    	<div class="content container">
    		<h2>Search San Diego Homes For Sale</h2>
    		<br />
    		<div class="finder-wrapper">
				<div class="row">
					<div class="col-xs-3">
						<div id="option-all" class="finder-option active">
							<span>All <i>Homes</i></span>
							<div class="arrow active"></div>
						</div>
					</div>
					<div class="col-xs-3">
						<div id="option-buy" class="finder-option">
							<span>Buy</span>
							<div class="arrow"></div>
						</div>
					</div>
					<div class="col-xs-3">
						<div id="option-rent" class="finder-option">
							<span>Rent</span>
							<div class="arrow"></div>
						</div>
					</div>
					<div class="col-xs-3">
						<div id="option-new" class="finder-option">
							<span>New <i>Homes</i></span>
							<div class="arrow"></div>
						</div>
					</div>
				</div>
				<form method="GET">
					<div class="search">
						<div class="select">
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
							<!--<div class="search-icon"><i class="ion-arrow-down-b"></i></div>-->
						</div>
						<br />
						<input type="submit" value="Search" class="search-btn"></input>
						<br />
						<div class="search-options-btn-wrapper">
							<a class="search-options-btn" href="#"><i class="ion-plus-circled"></i> Search Options</a>
						</div>
						<br />
						<div class="search-options-wrapper container">
							<div class="row">
								<div class="col-sm-6">
									<select id="price-min-select" class="search-option-select">
										<option value="" selected disabled hidden>Price Min</option>
										 <option value="0">Carslbad</option>
										 <option value="1">Chula Vista</option>
										 <option value="2">Coronado</option>
									</select>
									<select id="price-max-select" class="search-option-select">
										<option value="" selected disabled hidden>Price Max</option>
										 <option value="0">Carslbad</option>
										 <option value="1">Chula Vista</option>
										 <option value="2">Coronado</option>
									</select>
								</div>
								<br class="hideable"/>
								<div class="col-sm-6">
									<select id="beds-select" class="search-option-select">
										<option value="" selected disabled hidden>Beds</option>
										 <option value="0">Carslbad</option>
										 <option value="1">Chula Vista</option>
										 <option value="2">Coronado</option>
									</select>
									<select id="baths-select" class="search-option-select">
										<option value="" selected disabled hidden>Baths</option>
										 <option value="0">Carslbad</option>
										 <option value="1">Chula Vista</option>
										 <option value="2">Coronado</option>
									</select>
								</div>
							</div>
							<br />
							<div class="row">
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice1"
									     name="contact" value="email" checked>
									    <label for="contactChoice1">Basement</label>
									</div>
								</div>
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice2"
									     name="contact" value="phone">
									    <label for="contactChoice2">Fireplace</label>
									</div>
								</div>
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice3"
									     name="contact" value="mail">
									    <label for="contactChoice3">Pool</label>
									</div>
								</div>
							</div>
							<br />
							<div class="row">
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice1"
									     name="contact" value="email" checked>
									    <label for="contactChoice1">Garage</label>
									</div>
								</div>
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice2"
									     name="contact" value="phone">
									    <label for="contactChoice2">Central Air</label>
									</div>
								</div>
								<div class="col-xs-4">
									<div class="radio-wrapper">
										<input type="radio" id="contactChoice3"
									     name="contact" value="mail">
									    <label for="contactChoice3">Dining Room</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
    		</div>
    	</div>
    </div>

    <div id="section-1" class="section">
    	<div class="container">
    		<h2>Newest Homes Near <span class="city-span">You</span></h2>
    		<div class="gap"></div>
    		<div class="row">
    			<div class="col-sm-4">
    				<div class="listing" id="listing-0">
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
    			</div>
    			<div class="gap hideable"></div>
    			<div class="col-sm-4">
    				<div class="listing" id="listing-1">
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
    			</div>
    			<div class="gap hideable"></div>
    			<div class="col-sm-4">
    				<div class="listing" id="listing-2">
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
    			</div>
    		</div>
    	</div>
    </div>

    <div id="section-2" class="section">
    	<div class="container">
    		<h2>We help homes and people find each other.</h2>
    		<div class="gap"></div>
    		<div class="row">
    			<div class="col-sm-4">
    				<img src="assets/images/national.png" />
    			</div>
    			<br />
    			<div class="col-sm-8 information">
    				<div class="content">
	    				<br />
						<p>For over 15 years, we've been committed to making online home shopping a fun, practical and hassle-free experience. How? By creating a doorway connecting home buyers, sellers and real estate professionals, all to give you the listings, tools and resources you need to make your home buying experience as easy as possible.

						Ready to move? Check out our listings!</p>
					</div>
    			</div>
    		</div>
    	</div>
    </div>

    <footer>
    	<div class="top">
    		<div class="row">
	    		<div class="col-sm-3">
	    			<p>SanDiegoHomeFinder.com</p>
	    			<hr />
	    			<ul>
	    				<li><a href="#">About</a></li>
	    				<li><a href="#">Management Team</a></li>
	    				<li><a href="#">Our Network</a></li>
	    				<li><a href="#">Media Center</a></li>
	    				<li><a href="#">Careers</a></li>
	    				<li><a href="#">Contact Us</a></li>
	    			</ul>
	    			<br />
	    			<p>Support</p>
	    			<hr />
	    			<ul>
	    				<li><a href="#">Support Center</a></li>
	    				<li><a href="#">Code: 2769bb</a></li>
	    			</ul>
	    		</div>
	    		<br class="hideable" />
	    		<div class="col-sm-3">
	    			<p>Mobile</p>
	    			<hr />
	    			<ul>
	    				<li><a href="#">Our Mobile Apps</a></li>
	    				<li><a href="#">Android</a></li>
	    				<li><a href="#">Iphone</a></li>
	    			</ul>
	    			<br />
	    			<p>Partner Site</p>
	    			<hr />
	    			<ul>
	    				<li><a href="http://alexmeza.me/new">AlexMeza.me</a></li>
	    			</ul>
	    		</div>
	    		<br class="hideable" />
	    		<div class="col-sm-3">
	    			<p>Home Buying Resources</p>
	    			<hr />
	    			<ul>
	    				<li><a href="#">Browse Homes By City</a></li>
	    				<li><a href="#">Mortgage Rates</a></li>
	    				<li><a href="#">Open House Listings</a></li>
	    				<li><a href="#">Buying Guide</a></li>
	    				<li><a href="#">Mortgage Guide</a></li>
	    				<li><a href="#">Foreclosure Guide</a></li>
	    				<li><a href="#">All Research & Guides</a></li>
	    				<li><a href="#">Blog</a></li>
	    			</ul>
	    		</div>
	    		<br class="hideable" />
	    		<div class="col-sm-3">
	    			<p>Agent & Broker Resources</p>
	    			<hr />
	    			<ul>
	    				<li><a href="#">Agents & Brokers</a></li>
	    				<li><a href="#">Advertisers Center</a></li>
	    				<li><a href="#">Open Home Pro&reg; Application</a></li>
	    				<li><a href="#">My Market Ads</a></li>
	    				<li><a href="#">Single Property Website</a></li>
	    				<li><a href="#">Real Estate Widgets</a></li>
	    			</ul>
	    			<br />
	    			<p>Follow Us</p>
	    			<hr />
	    			<ul>
	    				<li><a href="http://alexmeza.me/new">AlexMeza.me</a></li>
	    			</ul>
	    		</div>
	    	</div>
	    </div>
    	<div class="bottom">
    		<p>© 2018 SanDiegoHomeFinder.com, LLC</p>
    		<br />
    		<p><a href="#">Equal Housing Opportunity</a> | <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a></p>
    	</div>
    </footer>



	<!-- wrapper ends -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery-ui.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/jquery.vide.min.js"></script>
	<script src="assets/js/main.js"></script>
</body>
</html>
