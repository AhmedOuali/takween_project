
<!DOCTYPE HTML>
<html>
    <head>
        <title>Takween | @yield('title') </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!--<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>-->
        <link rel="shortcut icon" href="/img/intlogo.png" />
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <link rel="stylesheet" href="/signupin/css/bootstrap.css">
        <link rel="stylesheet" href="/signupin/css/scin.css">
            
            <!-- Scripts -->
        <script>
            window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
        
    </head>
    
    
    <body>
        @include('auth.layouts.header_in')
        @yield('content')
        <!--scripts-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="/signupin/js/jquery.js"></script>
        
    </body>
</html>
	
