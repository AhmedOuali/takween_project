@extends('users.layouts.app') 
@section('title', 'test') 
@section('content')

<div class="container">
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2" >
                @if (count($errors) > 0)
                	<div class="alert alert-danger">
                		<strong>
                		@if (count($errors) == 1)
                			Une erreur s'est produite.
                		@else
                			Quelques erreurs sont produites.
                		@endif
                		</strong>
                		<br><br>
                		<ul>
                			@foreach ($errors->all() as $error)
                				<li>{{ $error }}</li>
                			@endforeach
                		</ul>
                	</div>
                @endif
                <form class="form-horizontal" role="form" method="POST" action="/details">
                    {!! csrf_field() !!}
                    <div class="form-group {{ $errors->has('title') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label" for="title">Civilité</label>
                        <div class="col-md-4">
                            <label class="radio-inline" for="male">
                                <input type="radio" name="title" id="male" value="M" > Monsieur
                            </label>
                            <label class="radio-inline" for="female">
                                <input type="radio" name="title" id="female" value="F" > Madame
                            </label>
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('birth_date') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label">Date de naissance </label>
                        <div class="col-md-6">
                            <input type="date" class="form-control" name="birth_date" value="{{ old('birth_date') }}" required> 
                            @if ($errors->has('birth_date'))
                            <span class="help-block">
                                <strong>{{ $errors->first('birth_date') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label">Téléphone</label>
                        <div class="col-md-6">
                            <input type="tel" class="form-control" name="phone" value="{{ old('phone') }}" pattern='[0]\d{9}' required> 
                            @if ($errors->has('phone'))
                            <span class="help-block">
                                <strong>{{ $errors->first('phone') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('address_first_line') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label"> Adresse </label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" name="address_first_line" value="{{ old('address_first_line') }}" required> 
                            @if ($errors->has('address_first_line'))
                            <span class="help-block">
                                <strong>{{ $errors->first('address_first_line') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('zip_code') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label"> Code postal </label>
                        <div class="col-md-6">
                            <input type="tel" class="form-control" name="zip_code" value="{{ old('zip_code') }}" pattern="\d{5}" required> 
                            @if ($errors->has('zip_code'))
                            <span class="help-block">
                                <strong>{{ $errors->first('zip_code') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('country') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label"> Pays </label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" name="country" value="{{ old('country') }}" required> 
                            @if ($errors->has('country'))
                            <span class="help-block">
                                <strong>{{ $errors->first('country') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('city') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label"> Ville </label>
                        <div class="col-md-6">
                            <input type="text" class="form-control" name="city" value="{{ old('city') }}" required> 
                            @if ($errors->has('city'))
                            <span class="help-block">
                                <strong>{{ $errors->first('city') }}</strong>
                            </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('prepa') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label" for="prepa">Lycée/Prépa</label>
                        <div class="col-md-4">
                            <select id="niveau" name="prepa" class="form-control" required>
                                <option value="prepa1">prepa1</option>
                                <option value="prepa2">prepa2</option>
                                <option value="prepa3">prepa3</option>
                            </select>
                            @if ($errors->has('prepa'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('prepa') }}</strong>
                                </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('level') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label" for="level">Niveau</label>
                        <div class="col-md-4">
                            <select id="niveau" name="level" class="form-control" required>
                                <option value="niveau1">niveau1</option>
                                <option value="niveau2">niveau2</option>
                                <option value="niveau3">niveau3</option>
                            </select>
                            @if ($errors->has('level'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('level') }}</strong>
                                </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('option') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label" for="option">Voie</label>
                        <div class="col-md-4">
                            <select id="niveau" name="option" class="form-control" required>
                                <option value="option1">option1</option>
                                <option value="option2">option2</option>
                                <option value="option3">option3</option>
                            </select> 
                            @if ($errors->has('option'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('option') }}</strong>
                                </span> 
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label">Mot de passe</label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" name="password" min="8" required> 
                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>
                    <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                        <label class="col-md-4 control-label">Confirmer Mot de passe</label>
                        <div class="col-md-6">
                            <input type="password" class="form-control" name="password_confirmation" min="8" required > 
                            @if ($errors->has('password_confirmation'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>
                        <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-md-offset-6">
                                <button class="btn btn-blue" type="submit">
                                    <i class="fa fa-btn fa-user"></i> S'enregistrer
                                </button>
                                <a class="btn btn-link" href="/"> Pas maintenant ? </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
