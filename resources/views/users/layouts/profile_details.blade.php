<form class="form-horizontal" role="form" method="POST" action="#" > 
    <input type="hidden" name="_method" value="PATCH">
    {!! csrf_field() !!}
    <div class="form-group {{ $errors->has('title') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label" for="title">Civilité</label>
        <div class="col-md-4">
            @if( Auth::check())
                @if($user->title == "M")
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Monsieur
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F"> Madame
                </label>
                @else 
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Monsieur
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F" checked> Madame
                </label>
                @endif
            @else 
                <label class="radio-inline" for="male">
                    <input type="radio" name="title" id="male" value="M" checked> Monsieur
                </label>
                <label class="radio-inline" for="female">
                    <input type="radio" name="title" id="female" value="F"> Madame
                </label>
            @endif
            
        </div>
    </div>
    <div class="form-group{{ $errors->has('last_name') ? ' has-error' : '' }}">
    <label class="col-md-4 control-label">Nom</label>
        <div class="col-md-6">
            <input type="text" class="form-control" name="last_name" value="lastname" required> 
            @if ($errors->has('last_name'))
            <span class="help-block">
                <strong>{{ $errors->first('last_name') }}</strong>
            </span> 
            @endif
        </div>
    </div>
    <div class="form-group{{ $errors->has('first_name') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label">Prénom</label>
        <div class="col-md-6">
            <input type="text" class="form-control" name="first_name" value="firstname" required> 
            @if ($errors->has('first_name'))
            <span class="help-block">
                <strong>{{ $errors->first('first_name') }}</strong>
            </span> 
            @endif
        </div>
    </div>
    <div class="form-group{{ $errors->has('birth_date') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label">Date de naissance </label>
        <div class="col-md-6">
            <input type="date" class="form-control" name="birth_date" value="YY/MM/YYYY" > 
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
            <input type="tel" class="form-control" name="phone" value="00000000" pattern='[0-9]{8}' > 
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
            <input type="text" class="form-control" name="address_first_line" value="adress_first_line" > 
            @if ($errors->has('address_first_line'))
            <span class="help-block">
                <strong>{{ $errors->first('address_first_line') }}</strong>
            </span> 
            @endif
        </div>
    </div>
    <div class="form-group{{ $errors->has('address_second_line') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Complément d'adresse </label>
        <div class="col-md-6">
            <input type="text" class="form-control" name="address_second_line" value="adress_second_line"> 
            @if ($errors->has('address_second_line'))
            <span class="help-block">
                <strong>{{ $errors->first('address_second_line') }}</strong>
            </span> 
            @endif
        </div>
    </div>
    <div class="form-group{{ $errors->has('zip_code') ? ' has-error' : '' }}">
        <label class="col-md-4 control-label"> Code postal </label>
        <div class="col-md-6">
            <input type="tel" class="form-control" name="zip_code" value="0000" pattern="[0-9]{4}" > 
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
            <input type="text" class="form-control" name="country" value="Tunisia" > 
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
            <input type="text" class="form-control" name="city" value="Sfax" > 
            @if ($errors->has('city'))
            <span class="help-block">
                <strong>{{ $errors->first('city') }}</strong>
            </span> 
            @endif
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-12 ">
            <button type="submit" class="btn btn-blue pull-right"> Modifier </button>
        </div>
    </div>
</form>