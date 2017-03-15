<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
	
	<title>Takween | @yield('title') </title>
	
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
	<link href="//fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
	<link rel="shortcut icon" href="/img/intlogo.png" />
	
	<link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
	 <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:400,300|Raleway:300,400,900,700italic,700,300,600">
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- Bootstrap Form Helpers -->
    <link href="css/bootstrap-form-helpers.min.css" rel="stylesheet" media="screen">
    
     <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
	<!--<link href="/css/all.css" rel="stylesheet">-->
</head>
<body>
    
    <div>
		@yield('content')
	</div>
    
    <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.easing.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/wow.js"></script>
    <script src="/js/jquery.bxslider.min.js"></script>
    <script src="/js/custom.js"></script>
    <script src="js/bootstrap-formhelpers.min.js"></script>
    <script src="/js/home-modals.js"></script>
    <!-- Bootstrap Form Helpers -->
    
	</body>
</html>