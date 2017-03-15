@extends('users.layouts.app') 
@section('title', 'profil') 
@section('content')
    <div class="container">
        <div class="main-content">
            <div class="row">
                <div class="col-md-10 col-md-offset-2 col-sm-8 col-sm-offset-4"><br><br>
                    <div class="box-body pad">
                        <br>
                        <div class="row">
                            <div class="col-lg-4">
                                        <div class="image">
                                            @if (Auth::check())
                                                @if ($user->title == "F")
                                                <img src="/users/img/avatar2.png"> 
                                                @else 
                                                <img src="/users/img/avatar5.png"> 
                                                @endif
                                            @else
                                                <img src="/users/img/avatar5.png"> 
                                            @endif
                                        </div>
                                        <br>
                                        @if (Auth::check())
                                            @if (Auth::user())
                                                <div class="pull-left info">
                                                    <p style="color:#428bca;"><i class="fa fa-circle text-success"></i>&nbsp; online</p>
                                                </div>
                                            @endif
                                        @else
                                            <div class="pull-left info">
                                                    <p style="color:#428bca;"><i class="fa fa-circle text-success"></i>&nbsp; online</p>
                                                </div>
                                        @endif
                                            
                                        
                                        <br>
                                        <hr>
                                        @if (Auth::check())
                                            <h4><i class="fa fa-user" aria-hidden="true"></i>   {{ $user->first_name }} {{ $user->last_name }} </h4> <br>
                                            <h4><i class="fa fa-birthday-cake" aria-hidden="true"></i>  {{ $user->birth_date->format('d/m/Y') }} </h4> <br>
                                            <h4> <i class="fa fa-phone" aria-hidden="true"></i>  {{ $user->phone }} </h4> <br>
                                        @else
                                            <h4><i class="fa fa-user" aria-hidden="true"></i>   firstname lastname </h4> <br>
                                            <h4><i class="fa fa-birthday-cake" aria-hidden="true"></i> dd/mm/yyyy </h4> <br>
                                            <h4> <i class="fa fa-phone" aria-hidden="true"></i>  000000000 </h4> <br>
                                        @endif
                                        
                                    </div>
                            <br>
                            
                            <div class="col-lg-8">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#details" aria-controls="details" role="tab" data-toggle="tab">Profil</a></li>
                                    <li role="edit"><a href="#edit" aria-controls="edit" role="tab" data-toggle="tab">edit</a></li>
                                    <li role="historic" id="hist"><a href="#historic" aria-controls="historic" role="tab" data-toggle="tab">history</a></li>
                                </ul>
                                <div class="tab-content ">
                                    <div role="tabpanel" class="tab-pane active" id="details">
                                        @if(Session::has('flash_message'))
                                            <div class="alert alert-success">
                                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                            {{ Session::get('flash_message') }}
                                            </div>
                                        @endif
                                        <div class="form-group">
                                            <div class="row">
                                                <table border="0" width="80%">
                                                    <tr>   
                                                        <th><i class="fa fa-key" aria-hidden="true"></i> ID </th>
                                                        <th> 
                                                            @if (Auth::check())
                                                                <label for="id">{{ $user->id  }}</label>
                                                            @else
                                                                <label for="id">123</label>
                                                            @endif
                                                            
                                                        </th> 
                                                    </tr>
                                                    <tr>   
                                                        <th><i class="fa fa-male" aria-hidden="true"></i> Gender  </th>
                                                        <th>
                                                            @if ( Auth::check()) 
                                                                @if ( $user->title === "M" )
                                                                    <label for="title">Homme</label>
                                                                @elseif ( $user->title === "F" )
                                                                    <label for="title">Femme</label>
                                                                @else ( $user->title === " " )
                                                                    <label for="title">has not yet been attributed</label>
                                                                @endif
                                                            @else
                                                                <label for="title">has not yet been attributed</label>
                                                            @endif
                                                        </th>
                                                    </tr>
                                                    <tr>   
                                                        <th> <i class="fa fa-map-marker" aria-hidden="true"></i> Adresse first line</th>
                                                        <th> 
                                                           @if (Auth::check())
                                                               <label for="address_first_line">{{ $user->address_first_line  }}</label>
                                                           @else 
                                                               <label for="address_first_line">Adress_first_line</label>
                                                            @endif
                                                        </th>
                                                    </tr>
                                                    <tr>   
                                                        <th><i class="fa fa-map-marker" aria-hidden="true"></i> Adress second line  </th>
                                                        <th> 
                                                        @if (Auth::check())
                                                           <label for="address_second_line">{{ $user->address_second_line  }}</label>
                                                        @else
                                                           <label for="address_second_line"> Adress_second_line</label>
                                                        @endif
                                                        </th>
                                                    </tr>
                                                    <tr>   
                                                        <th><i class="fa fa-check-circle" aria-hidden="true"></i> Postal Code</th>
                                                        <th> 
                                                        @if (Auth::check())
                                                           <label for="zip_code">{{ $user->zip_code }}</label>
                                                        @else 
                                                            <label for="zip_code">0000</label>
                                                        @endif
                                                        </th>
                                                    </tr>
                                                    <tr>   
                                                        <th><i class="fa fa-globe" aria-hidden="true"></i> Country </th>
                                                        <th> 
                                                        @if (Auth::check())
                                                           <label for="country">{{ $user->country }}</label>
                                                        @else 
                                                            <label for="country">Tunisia</label>
                                                        @endif
                                                        </th>
                                                    </tr>
                                                    <tr>   
                                                        <th><i class="fa fa-circle" aria-hidden="true"></i> City </th>
                                                        <th>
                                                        @if (Auth::check())     
                                                            <label for="city">{{ $user->city }}</label>
                                                        @else
                                                            <label for="city">sfax</label>
                                                        @endif
                                                        </th> 
                                                    </tr>
                                                    
                                                    
                                                    
                                                    <tr>   
                                                        <th> <i class="fa fa-street-view" aria-hidden="true"></i> Pseudo </th>
                                                        <th> 
                                                        @if (Auth::check())
                                                            <label for="username">{{ $user->username }}</label>
                                                        @else 
                                                            <label for="username">pseudo</label>
                                                        @endif
                                                        </th> 
                                                    </tr>
                                                     <tr>   
                                                    
                                                        <th><i class="fa fa-envelope" aria-hidden="true"></i> E_mail </th>
                                                        <th> 
                                                        @if (Auth::check())
                                                            <label for="email">{{ $user->email }}</label>
                                                        @else
                                                            <label for="email">exemple@domaine.com</label>
                                                        @endif
                                                        </th> 
                                                    </tr>
                                                </table><br>
                                                </div>
                                        </div>
                                    </div>     
                                    <div role="tabpanel" class="tab-pane" id="edit">
                                       @include('users.layouts.profile_details')
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="historic">
                                        <div id="visits"></div>
                                        <div id="buttons" class="hidden">
                                            <nav>
                                                <ul class="pager">
                                                <li class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Récent</a></li>
                                                <li class="next"><a href="#"> Ancien <span aria-hidden="true">&rarr;</span></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection