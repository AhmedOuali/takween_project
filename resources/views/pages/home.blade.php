@extends('layouts.app')
@section('title', 'Accueil')
@section('content')
     <body>

    <div class="loader"></div>
    <div id="myDiv">
    <!--HEADER-->
    <div class="header">
      <div class="bg-color">
        <header id="main-header">
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              
             
              <a class="navbar-brand" href="/">
          	<img alt="Brand" src="/img/tlogow.png">
              </a>
             <!----> 
             
             <!--TODO Top bar le mot TAKWEEN-->
              <!--<a class="navbar-brand" href="#">tak<span class="logo-dec">ween</span></a>-->
              <!---->
              
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right">
                <li class="active"><a href="#main-header">Home</a></li>
                <li class=""><a href="#feature">About</a></li>
                <!--<li class=""><a href="#">Find a Job</a></li>-->
                <!--<li class=""><a href="#service">Services</a></li>-->
                <li class="dropdown">
    				        <a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">services 
    			    	        <span class="caret"></span>
    				        </a>
    				        <ul class="dropdown-menu" role="menu">
                                <li><a href="/maintenance"><i class="fa fa-tachometer"></i> Find a Job</a></li>
                                <li><a href="/maintenance "><i class="fa fa-tachometer"></i> Post a Job</a></li>
    	    	            </ul>
    		        	</li>
                <li class=""><a href="#">Blog</a></li>
                
                @if(Auth::check())
                    <li class=""><a >Forum</a></li>
                @endif
                
                <li class=""><a href="#contact">Contact Us</a></li>
                
                @if(Auth::check())
    		            <li class="dropdown">
    				        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->last_name }} {{ Auth::user()->first_name }} 
    			    	        <span class="caret"></span>
    				        </a>
    				        <ul class="dropdown-menu" role="menu">
    				            <!--à effacer si on n'a pas mis en place la fonction admin-->
                        @if(Auth::user()->admin)
                          <li><a href="/admin"><i class="fa fa-tachometer"></i> Dashboard</a></li>
                          <li><a href="/profil "><i class="fa fa-tachometer"></i> Profil</a></li>
    		    	            
    		    	            <!--Logout-->
    		    	            <li>
      		    	            <a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                                     document.getElementById('logout-form').submit();"><i class="fa fa-btn fa-sign-out"></i> logout</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                              {{ csrf_field() }}
                            </form>
                          </li>
                          <!---->
                          
    	    	        </ul>
    		        	</li>
    		        	@else 
    		        	        <!---->
    		        	        
    		        	         <li><a href="/profil "><i class="fa fa-tachometer"></i> Profil</a></li>
    		        	         <li><a href="/logout"><i class="fa fa-btn fa-sign-out"></i> logout</a></li>
    		    	         </ul>
    		        	</li>
    		        	@endif  <!--à effacer si on n'a pas mis en place le privilège admin-->
    		        @else 
    		            <li class="dropdown">
    				        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">sign(in/out) 
    			    	        <span class="caret"></span>
        				    </a>
        				        <ul class="dropdown-menu" role="menu">
                              <li><a href="{{ route('login') }}"><i class="fa fa-sign-in"></i> sign in</a></li>
                              <li><a href="{{ route('register') }}"><i class="fa fa-tachometer"></i> sign up</a></li>
        	    	        </ul>
    		        	  </li>
       		        @endif
              </ul>
            </div>
          </div>
        </nav>
        </header>
        <div class="wrapper">
        <div class="container">
          <div class="row">
            <div class="banner-info text-center wow fadeIn delay-05s">
              <br/><br/>
              <h1 class="bnr-title">We are at ba<span>ker</span></h1>
              <h2 class="bnr-sub-title">Starting a new journey!!</h2>
              <p class="bnr-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <br>ex ea commodo consequat.</p>
              <div class="brn-btn">
                <a href="/connexion" class="btn btn-download">Sign in</a>
                <a href="/inscription" class="btn btn-more">Sign up</a>
              </div>
              <div class="overlay-detail">
                <a href="#feature"><i class="fa fa-angle-down"></i></a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!--/ HEADER-->
    <!---->
    <section id="feature" class="section-padding wow fadeIn delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="wrap-item text-center">
              <div class="item-img">
                <img src="img/ser01.png">
              </div>
              <h3 class="pad-bt15">Creative Concept</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="wrap-item text-center">
              <div class="item-img">
                <img src="img/ser02.png">
              </div>
              <h3 class="pad-bt15">Amazing Design</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="wrap-item text-center">
              <div class="item-img">
                <img src="img/ser03.png">
              </div>
              <h3 class="pad-bt15">Cost effective</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="wrap-item text-center">
              <div class="item-img">
                <img src="img/ser04.png">
              </div>
              <h3 class="pad-bt15">Secure</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!---->
    <!---->
    <section id="service" class="section-padding wow fadeInUp delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2 class="service-title pad-bt15">What We Do?</h2>
            <p class="sub-title pad-bt15">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br>tempor incididunt ut labore et dolore magna aliqua.</p>
            <hr class="bottom-line">
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="service-item">
              <h3><span>D</span>esign And Developement</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a>learn more...</a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="service-item">
              <h3><span>W</span>ebsite Maintenance</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a>learn more...</a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="service-item">
              <h3><span>S</span>eo Optimization</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a>learn more...</a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="service-item">
              <h3><span>D</span>igital Marketing</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a>Learn more...</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!---->
    <!---->
    <!---->
    <!---->
    <section id="portfolio" class="section-padding wow fadeInUp delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2 class="service-title pad-bt15">Our Recent Works</h2>
            <p class="sub-title pad-bt15">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br>tempor incididunt ut labore et dolore magna aliqua.</p>
            <hr class="bottom-line">
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port01.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port02.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port03.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port04.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port05.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 portfolio-item padding-right-zero mr-btn-15">
            <figure>
              <img src="img/port06.jpg" class="img-responsive">
              <figcaption>
                  <h2>Project For Everyone</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
    <!---->
    <!---->
    <div class="raw">
    <div class="col-xs-12"></div>
    <section id="testimonial" class="wow fadeInUp delay-05s">
      <div class="bg-testicolor">
        <div class="container section-padding">
        <div class="row">
          <div class="testimonial-item">
            <ul class="bxslider">
              <li>
                <blockquote>
                  <img src="img/thumb.png" class="img-responsive">
                  <p>Come a day there won't be room for naughty men like us to slip about at all. This job goes south, there well may not be another. </p>
                </blockquote>
                <small>Shaun Paul, Client</small>
              </li>
              <li>
                <blockquote>
                  <img src="img/thumb.png" class="img-responsive">
                  <p>So here is us, on the raggedy edge. Don't push me, and I won't push you. </p>
                </blockquote>
                <small>Marry Smith, Client</small>
              </li>
              <li>
                <blockquote>
                  <img src="img/thumb.png" class="img-responsive">
                  <p>Come a day there won't be room for naughty men like us to slip about at all. This job goes south, there well may not be another.</p>
                </blockquote>
                <small>Vivek Singh, Client</small>
              </li>
              <li>
                <blockquote>
                  <img src="img/thumb.png" class="img-responsive">
                  <p>So here is us, on the raggedy edge. Don't push me, and I won't push you.</p>
                </blockquote>
                <small>John Doe, Client</small>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
    </div>
    </div>
    <!---->
    <section id="blog" class="section-padding wow fadeInUp delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2 class="service-title pad-bt15">Latest from our blog</h2>
            <p class="sub-title pad-bt15">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br>tempor incididunt ut labore et dolore magna aliqua.</p>
            <hr class="bottom-line">
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="blog-sec">
              <div class="blog-img">
                <a href="">
                  <img src="img/blog01.jpg" class="img-responsive">
                </a>
              </div>
              <div class="blog-info">
                <h2>This is Lorem ipsum heading.</h2>
                <div class="blog-comment">
                    <p>Posted In: <span>Legal Advice</span></p>
                    <p>
                      <span><a href="#"><i class="fa fa-comments"></i></a> 15</span>
                      <span><a href="#"><i class="fa fa-eye"></i></a> 11</span></p>
                </div>
                <p>We cannot expect people to have respect for laws and orders until we teach respect to those we have entrusted to enforce those laws all the time. we always want to help people cordially.</p>
                <a href="" class="read-more">Read more →</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="blog-sec">
              <div class="blog-img">
                <a href="">
                  <img src="img/blog02.jpg" class="img-responsive">
                </a>
              </div>
              <div class="blog-info">
                <h2>This is Lorem ipsum heading.</h2>
                <div class="blog-comment">
                    <p>Posted In: <span>Legal Advice</span></p>
                    <p>
                      <span><a href="#"><i class="fa fa-comments"></i></a> 15</span>
                      <span><a href="#"><i class="fa fa-eye"></i></a> 11</span></p>
                </div>
                <p>We cannot expect people to have respect for laws and orders until we teach respect to those we have entrusted to enforce those laws all the time. we always want to help people cordially.</p>
                <a href="" class="read-more">Read more →</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="blog-sec">
              <div class="blog-img">
                <a href="">
                  <img src="img/blog03.jpg" class="img-responsive">
                </a>
              </div>
              <div class="blog-info">
                <h2>This is Lorem ipsum heading.</h2>
                <div class="blog-comment">
                    <p>Posted In: <span>Legal Advice</span></p>
                    <p>
                      <span><a href="#"><i class="fa fa-comments"></i></a> 15</span>
                      <span><a href="#"><i class="fa fa-eye"></i></a> 11</span></p>
                </div>
                <p>We cannot expect people to have respect for laws and orders until we teach respect to those we have entrusted to enforce those laws all the time. we always want to help people cordially.</p>
                <a href="" class="read-more">Read more →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!---->
    <section id="contact" class="section-padding wow fadeInUp delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center white">
            <h2 class="service-title pad-bt15">Keep in touch with us</h2>
                <hr class="bottom-line white-bg">
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="loction-info white">
                  <p><i class="fa fa-map-marker fa-fw pull-left fa-2x"></i>Rue Ahmed Aloulou<br>Imm. Esia 9eme etage Apt. 1
Sfax</p>
                  <p><i class="fa fa-envelope-o fa-fw pull-left fa-2x"></i>info@takween.online</p>
                  <p><i class="fa fa-phone fa-fw pull-left fa-2x"></i>+216 74 400 205</p>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.776318446766!2d10.749986497541537!3d34.736032194258016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ0JzEwLjUiTiAxMMKwNDUnMDYuMyJF!5e0!3m2!1sfr!2sfr!4v1488188255446"  frameborder="0" style="border:0" allowfullscreen></iframe> 
              </div>
          </div>
          
             

          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="contact-form">
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage"></div>
                <form action="" method="post" role="form" class="contactForm">
                  {{ csrf_field() }}
                    <div class="col-md-6 padding-right-zero">
                        <div class="form-group">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                            <textarea class="form-control" name="message" rows="7" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                            <div class="validation"></div>
                        </div>
                      <button type="submit" class="btn btn-primary btn-submit">SEND NOW</button>
                    </div>
                </form>
              
            </div>
            

          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            
             </div>
        </div>
      </div>
    </section>
    <!---->
    <!---->
    
    <!---->
  </div>
    
    
@endsection