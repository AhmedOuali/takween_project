@extends('pages.layouts.app')
@section('title', 'Accueil')
@section('content')
<body>
  @include('pages.layouts.reg-after-modal')  <!--Le modal qui s'ouvre pour poursuivre la (register)-->
  
  <div class="loader"></div>
  <div id="myDiv">
    <!--HEADER-->
    @include('pages.layouts.header')
    <!--/ HEADER-->
    
    <!--activities-->
    @include('pages.layouts.activities')
    <!--/activities-->
    
    <!--services-->
    @include('pages.layouts.services')
    <!--/services-->
    
    <!--testimonial-->
    @include('pages.layouts.testimonial')
    <!--/testimonial-->
    
    <!--partenaires-->
    @include('pages.layouts.partenaire')
    <!--/partenaires-->
    
    <!--Keep in touch-->
    @include('pages.layouts.contact')
    <!--Keep in touch-->
    
  </div>
</body>
@endsection