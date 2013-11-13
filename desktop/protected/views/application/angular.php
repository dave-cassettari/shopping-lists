<!DOCTYPE html>
<html>
<head>
	<title>Shopping Lists</title>

	<meta charset='UTF-8'>
	<meta http-equiv='X-UA-Compatible' content='IE=edge, chrome=1'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>

	<link rel='stylesheet' type='text/css' href='//fonts.googleapis.com/css?family=Open+Sans:300,600' x>
	<link rel='stylesheet' type='text/css' href='/css/style.css'>
</head>
<body data-ng-app='lists'>

<div data-ng-controller='ListsController'>
	<ul>
		<li data-ng-repeat='list in lists'>
			<span class='item-title' data-ng-bind='list.name'></span>

			<ul>
				<li data-ng-repeat='item in list.items'>
					-- <span class='item-title' data-ng-bind='item.name'></span>

					<div>
						---- <span class='item-title' data-ng-bind='item.list.name'></span>
					</div>
				</li>
			</ul>
		</li>
	</ul>
</div>

<script src='/js/vendor/angular.min.js'></script>
<script src='/js/vendor/angular-resource.min.js'></script>
<script src='/js/app/angular.js'></script>

</body>
</html>