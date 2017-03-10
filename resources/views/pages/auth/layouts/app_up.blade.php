
<!DOCTYPE HTML>
<html>
    <head>
        <title>Takween | @yield('title') </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!--<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>-->
        <link rel="stylesheet" href="signupin/css/bootstrap.css">
        <link rel="stylesheet" href="signupin/css/scup.css">
        
    </head>
    
    
    <body>
        @include('pages.auth.layouts.header_up')
        @yield('content')
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="signupin/js/jquery.js"></script>
        <script src="signupin/js/bootstrap.js"></script>
        <script src="signupin/js/scup.js"></script>
    </body>
</html>
	
