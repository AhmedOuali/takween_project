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
                <li class=""><a href="#service">About</a></li>
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
    		        	         <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                                     document.getElementById('logout-form').submit();"><i class="fa fa-btn fa-sign-out"></i> logout</a></li>
    		    	         </ul>
    		        	</li>
    		        	@endif  <!--à effacer si on n'a pas mis en place le privilège admin-->
    		        @else 
    		            <li class="dropdown">
    				        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">sign(in/up) 
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
              <h1 class="bnr-title">We<span>youth</span></h1>
              <h2 class="bnr-sub-title">Takween</h2>
              <!--<p class="bnr-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip <br>ex ea commodo consequat.</p>-->
              <div class="brn-btn">
                <a href="{{ route('login') }}" class="btn btn-download">Sign in</a>
                <a href="{{ route('register') }}" class="btn btn-more">Sign up</a>
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