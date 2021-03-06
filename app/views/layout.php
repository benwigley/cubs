<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Vege App<?php if (isset($title) ){echo ' - '.$title;}?></title>
		<meta name="description" content="Easily discover the vegetables that can grow in your area.">
		<meta name="keywords" content="Vege,Garden,Growing,Vegetables,Planting,Fruit">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="shortcut icon" href="<?= base_url('favicon.ico') ?>" type="image/x-icon" />

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="<?= assets_url('styles/app.css') ?>" />

		<!-- Modernizr should load just after css -->
		<script type="text/javascript" src="<?= assets_url('scripts/modernizr.js') ?>" /></script>
	</head>
	<body>
		
		<div id="page">

			<div id="masthead-container">
				<div id="masthead" class="container">
				</div>
			</div>

			<div id="content-container">
				<div id="content" class="container">
					<?php if ($main_content) $this->load->view($main_content); ?>
				</div>
			</div>

			<div id="footer-container">
				<div id="footer" class="container">
				</div>
			</div>

		</div>


<?php
// If not localhost, use jQuery from googleapis
// (This speeds up development reload time)

if ( ! $_SERVER['IS_LOCALHOST'])
{
?>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="<?= assets_url("scripts/jquery.min.js") ?>"><\/script>')</script>
<?
}
else
{
?>
		<script src="<?= assets_url("scripts/jquery.min.js") ?>"></script>
<?php
}
?>
		<script type="text/javascript" src="<?= assets_url('scripts/vendor.js') ?>" /></script>
		<script type="text/javascript" src="<?= assets_url('scripts/app.js') ?>" /></script>
		<script type="text/javascript">
		
			// Start Backbone
			(function() {
				require('initialize');
			})();
		</script>
	</body>
</html>
