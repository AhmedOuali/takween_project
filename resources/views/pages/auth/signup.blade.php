@extends('pages.auth.layouts.app')
@section('title', 'register')
@section('content')

<div class="container">
	    
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="#" class="active" id="register-individual-link">Individual Sign Up</a>
							</div>
							<div class="col-xs-6">
								<a href="#" id="register-company-link">Company Sign Up</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
								<form id="register-individual" action="/inscription" method="POST" role="form" style="display: block;">
								<div class="form-group">
										<input type="hidden" name="type" value="individual">  
									</div>
									<div class="form-group">
										<input type="text" name="firstname" id="firstname" tabindex="1" class="form-control" placeholder="First Name" value="">
									</div>
									<div class="form-group">
										<input type="text" name="lastname" id="lastname" tabindex="1" class="form-control" placeholder="Last Name" value="">
									</div>

									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
									<div class="text-center">
													<a href="/connexion"  >sign in</a>
									</div>
									
								</form>
								<form id="register-company" action="/inscription" method="POST" role="form" style="display: none;">
									<div class="form-group">
										<input type="hidden" name="type" value="company">  
									</div>
									<div class="form-group">
										<input type="text" name="firstname" id="firstname" tabindex="1" class="form-control" placeholder="First Name" value="">
									</div>
									<div class="form-group">
										<input type="text" name="lastname" id="lastname" tabindex="1" class="form-control" placeholder="Last Name" value="">
									</div>
									<div class="form-group">
										<input type="text" name="companyname" id="companyname" tabindex="1" class="form-control" placeholder="Company Name" value="">
									</div>
									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Adress" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
									<div class="text-center">
													<a href="/connexion">sign in</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection	
