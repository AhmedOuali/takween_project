@extends('auth.layouts.app_up')
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
								
						<!------------------------->
						<!----individual-Registr--->
						<!------------------------->
						
								<form id="register-individual" action="{{ route('register') }}" method="POST" role="form" style="display: block;">
								{{ csrf_field() }}
									<div class="form-group">
										<input type="hidden" name="type" value="individual">  
									</div>
									<!--firstname-->
									<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
										<input type="text" name="firstname" tabindex="1" class="form-control" placeholder="First Name" value="{{ old('firstname') }}" required autofocus>
									</div>
									<!--lastname-->
									<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
										<input type="text" name="lastname" tabindex="2" class="form-control" placeholder="Last Name" value="{{ old('lastname') }}" required>
									</div>
									<!--email-->
									<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
										<input type="email" name="email"  tabindex="3" class="form-control" placeholder="Email Address" value="{{ old('email') }}" required>
									</div>
									<!--password-->
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" required>
									</div>
									<!--password-->
									<div class="form-group">
										<input type="password" name="password_confirmation" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" required>
									</div>
									<!--password-confirm-->
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
									<!---->
									<div class="text-center">
										<a href="{{ route('login') }}"  >sign in</a>
									</div>
									<!---->
								</form>
								
						<!------------------------->
						<!-----Company-Registr----->
						<!------------------------->
								
								<form id="register-company" action="{{ route('register') }}" method="POST" role="form" style="display: none;">
									{{ csrf_field() }}
									<!--type-->
									<div class="form-group">
										<input type="hidden" name="type" value="company">  
									</div>
									<!--firstname-->
									<div class="form-group{{ $errors->has('firstname') ? ' has-error' : '' }}">
										<input id="firstname" type="text" name="firstname" tabindex="1" class="form-control" placeholder="First Name" value="{{ old('firstname') }}" required>
									</div>
									<!-lastname--->
									<div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
										<input id="lastname" type="text" name="lastname" tabindex="2" class="form-control" placeholder="Last Name" value="{{ old('lastname') }}" required>
									</div>
									<!--companyname-->
									<div class="form-group{{ $errors->has('companyname') ? ' has-error' : '' }}">
										<input id="companyname" type="text" name="companyname" tabindex="3" class="form-control" placeholder="Company Name" value="{{ old('companyname') }}" required>
									</div>
									<!--email-->
									<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
										<input type="email" name="email"  tabindex="4" class="form-control" placeholder="Email Adress" value="{{ old('email') }}" required>
									</div>
									<!--password-->
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="5" class="form-control" placeholder="Password" required>
									</div>
									<!--password-conf-->
									<div class="form-group">
										<input type="password" name="password_confirmation" id="password-confirm" tabindex="6" class="form-control" placeholder="Confirm Password" required>
									</div>
									<!--submit-->
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" tabindex="7" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
									<!---->
									<div class="text-center">
										<a href="{{ route('login') }}">sign in</a>
									</div>
									<!---->
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection	
