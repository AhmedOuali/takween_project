@extends('pages.auth.layouts.app_in')
@section('title', 'register')
@section('up')
	<li><a href="{{ route('register') }}">sign up</a></li>
@endsection
@section('content')

<div class="container">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-sm-6 col-sm-offset-3">
								<a href="#" class="active" id="login-form-link">Login</a>
							</div>
							
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" action="{{ route('login') }}" method="post" role="form" style="display: block;">
									{{ csrf_field() }}
									
									<div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
										<input type="email" name="email" tabindex="1" class="form-control" placeholder="Username" value="{{ old('email') }}" required autofocus>
									</div>
									<div class="form-group {{ $errors->has('password') ? ' has-error' : '' }}">
										<input type="password" name="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" {{ old('remember') ? 'checked' : '' }}>
										<label for="remember"> Remember Me</label>
									</div>
									
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" tabindex="4" class="form-control btn btn-login">
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="{{ route('password.request') }}" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
												<div class="text-center">
													<a href="{{ route('register') }}" tabindex="5" class="forgot-password">sign up</a>
												</div>
											</div>
											
										</div>
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