<form class="form-horizontal" role="form" method="POST" action="#" > 
    {{ csrf_field() }}
    <!--<input type="hidden" name="_method" value="PATCH">-->
    <!--{!! csrf_field() !!}-->
    <div class="form-group {{ $errors->has('title') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label" for="title">Gender</label>
        <div class="col-md-4">
            @if( Auth::check())
                @if($user->title == "M")
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Mr
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F"> Mme
                </label>
                @else 
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Mr
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F" checked> Mme
                </label>
            
            @else
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Mr
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F"> Mme
                </label>
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('firstname') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label">First name</label>
        <div class="col-md-6">
            @if( Auth::check())
                <input type="text" class="form-control" name="firstname" value="{{ $user->firstname}}" required> 
                @if ($errors->has('firstname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('firstname') }}</strong>
                    </span> 
                @endif
            @else
                <input type="text" class="form-control" name="firstname" value="firstname" required> 
                @if ($errors->has('firstname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('firstname') }}</strong>
                    </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('lastname') ? ' has-error' : '' }}">
    <label class="col-md-4 control-label">Second name</label>
        <div class="col-md-6">
            @if(Auth::check())
                <input type="text" class="form-control" name="lastname" value="{{ $user->lastname}}" required> 
                @if ($errors->has('lastname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('lastname') }}</strong>
                    </span>
                @endif
            @else
                <input type="text" class="form-control" name="lastname" value="lastname" required> 
                @if ($errors->has('lastname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('lastname') }}</strong>
                    </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('birth_date') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label">Birth date </label>
        <div class="col-md-6">
            @if(Auth::check())
                <input type="date" class="form-control" name="birth_date" value="{{ $user->birth_date->format('Y-m-d') }}" required> 
                @if ($errors->has('birth_date'))
                    <span class="help-block">
                        <strong>{{ $errors->first('birth_date') }}</strong>
                    </span>
                @endif
            @else
                <input type="date" class="form-control" name="birth_date" value="YY/MM/YYYY" > 
                @if ($errors->has('birth_date'))
                    <span class="help-block">
                        <strong>{{ $errors->first('birth_date') }}</strong>
                    </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label">Phone</label>
        <div class="col-md-6">
            @if(Auth::check())
                <input type="text" class="form-control bfh-phone" name="phone" data-country="countries1" pattern=".{13,}"  value="{{ $user->phone }}" required>
                @if ($errors->has('phone'))
                <span class="help-block">
                    <strong>{{ $errors->first('phone') }}</strong>
                </span> 
                @endif
            @else
                <input type="text" class="form-control bfh-phone" name="phone" data-country="countries1" pattern=".{13,}" required>
                @if ($errors->has('phone'))
                <span class="help-block">
                    <strong>{{ $errors->first('phone') }}</strong>
                </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('address_first_line') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Adresse </label>
        <div class="col-md-6">
            @if(Auth::check())
             <input type="text" class="form-control" name="address_first_line" value="{{ $user->address_first_line }}" required> 
                @if ($errors->has('Address first line'))
                <span class="help-block">
                    <strong>{{ $errors->first('address_first_line') }}</strong>
                </span> 
                @endif
            @else
                <input type="text" class="form-control" name="address_first_line" value="adress_first_line" > 
                @if ($errors->has('Address first line'))
                <span class="help-block">
                    <strong>{{ $errors->first('address_first_line') }}</strong>
                </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('address_second_line') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Address Second line </label>
        <div class="col-md-6">
            @if(Auth::check())
                <input type="text" class="form-control" name="address_second_line" value="{{ $user->address_second_line }}" required> 
                @if ($errors->has('address_second_line'))
                    <span class="help-block">
                        <strong>{{ $errors->first('address_second_line') }}</strong>
                    </span> 
                @endif
            @else
                <input type="text" class="form-control" name="address_second_line" value="adress_second_line" required> 
                @if ($errors->has('address_second_line'))
                    <span class="help-block">
                        <strong>{{ $errors->first('address_second_line') }}</strong>
                    </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('zip_code') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Postal code </label>
        <div class="col-md-6">
            @if(Auth::check())
                <input type="tel" class="form-control" name="zip_code" value="{{ $user->zip_code}}" pattern=".{13,}" required> 
                @if ($errors->has('zip_code'))
                <span class="help-block">
                    <strong>{{ $errors->first('zip_code') }}</strong>
                </span> 
                @endif
            @else
                <input type="tel" class="form-control" name="zip_code" value="0000" pattern=".{13,}" > 
                @if ($errors->has('zip_code'))
                <span class="help-block">
                    <strong>{{ $errors->first('zip_code') }}</strong>
                </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('country') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Country </label>
        <div class="col-md-6">
            @if(Auth::check())
                <select id="countries1" class="form-control" name="country" value="{{ $user->country }}" required></select> 
                @if ($errors->has('country'))
                <span class="help-block">
                    <strong>{{ $errors->first('country') }}</strong>
                </span> 
                @endif
            @else
                <select id="countries1" class="form-control" name="country"></select> 
                @if ($errors->has('country'))
                <span class="help-block">
                    <strong>{{ $errors->first('country') }}</strong>
                </span> 
                @endif
            @endif
        </div>
    </div>
    <!---->
    <!---->
    <div class="form-group{{ $errors->has('city') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> City </label>
        <div class="col-md-6">
            @if(Auth::check())
                <select class="form-control bfh-states" data-country="countries1" name="city" value="{{ $user->city }}" required></select> 
                @if ($errors->has('city'))
                <span class="help-block">
                    <strong>{{ $errors->first('city') }}</strong>
                </span> 
                @endif
            @else
                <select class="form-control bfh-states" data-country="countries1" name="city"></select> 
                @if ($errors->has('city'))
                <span class="help-block">
                    <strong>{{ $errors->first('city') }}</strong>
                </span> 
                @endif
            @endif
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-12 ">
            <button type="submit" class="btn btn-jaune pull-right"> Update </button>
        </div>
    </div>
</form>