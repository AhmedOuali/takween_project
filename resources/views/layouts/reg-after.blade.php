<div>
	<div class="modal fade" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h4 class="modal-title">Please complete your details</h4>
		  </div>
		  <div class="modal-body">
			<form class="form-horizontal" role="form" method="POST" action="{{ route('register') }}" onsubmit="	$('.fade').modal({show: false}" id="reg-after"> 
			    {!! csrf_field() !!}
                <div class="form-group{{ $errors->has('birth_date') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label">Birth date</label>
                    <div class="col-md-6">
                        <input type="date" class="form-control" name="birth_date" required> 
                        @if ($errors->has('birth_date'))
                        <span class="help-block">
                            <strong>{{ $errors->first('birth_date') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label">Phone</label>
                    <div class="col-md-6">
                        <input type="tel" class="form-control" name="phone" pattern='[0-9]{8}' required> 
                        @if ($errors->has('phone'))
                        <span class="help-block">
                            <strong>{{ $errors->first('phone') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('address_first_line') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label"> Adress first line </label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="address_first_line" required> 
                        @if ($errors->has('address_first_line'))
                        <span class="help-block">
                            <strong>{{ $errors->first('address_first_line') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('address_second_line') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label"> Adress second line </label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="address_second_line"  required> 
                        @if ($errors->has('address_second_line'))
                        <span class="help-block">
                            <strong>{{ $errors->first('address_second_line') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('zip_code') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label"> Postal code </label>
                    <div class="col-md-6">
                        <input type="tel" class="form-control" name="zip_code" pattern="[0-9]{4}"required > 
                        @if ($errors->has('zip_code'))
                        <span class="help-block">
                            <strong>{{ $errors->first('zip_code') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('country') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label"> Country </label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="country" required> 
                        @if ($errors->has('country'))
                        <span class="help-block">
                            <strong>{{ $errors->first('country') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
                <div class="form-group{{ $errors->has('city') ? ' has-error' : '' }}">
                    <label class="col-md-4 control-label"> City </label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="city" required> 
                        @if ($errors->has('city'))
                        <span class="help-block">
                            <strong>{{ $errors->first('city') }}</strong>
                        </span> 
                        @endif
                    </div>
                </div>
		  </div><!-- /.modal-body -->
		  <div class="modal-footer">
		      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		   	<button type="submit" class="btn btn-primary">Save changes</button>
		  </div><!-- /.modal-footer -->
		   </form>
		</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</div>