<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	    <meta name="_token" content="{{ csrf_token() }}"/>
	    
		<title>Takween | @yield('title') </title>
		
	    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
		<link href="/css/all.css" rel="stylesheet">
	</head>
	<body class="skin-blue sidebar-mini ">
		@include('users.layouts.header')
		@include('users.layouts.sidebar')
		<div class="main-content" >
			@yield('content')
		</div>
		
   		@include('users.layouts.footer')
    	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    	<script src="/js/all.js"></script>        	
	</body>
</html>