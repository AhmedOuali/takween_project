<header class="main-header">
    <a href="/admin" class="logo">
        <span class="logo-lg"><b>User</b></span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown messages-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-envelope-o"></i>
                        <span class="label label-success">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Vous avez 4 messages</li>
                        <li>
                            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;">
                                <ul class="menu" style="overflow: hidden; width: 100%; height: 200px;">
                                    <li>
                                        <a href="#">
                                            <div class="pull-left">
                                                <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                                            </div>
                                            <h4>Ikhlas Dassi
                                                <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                            </h4>
                                            <p>Quels sont les nouveaux cours ?</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div class="pull-left">
                                                <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                                            </div>
                                            <h4>Mohamed Sfar
                                                <small><i class="fa fa-clock-o"></i> 2 heures</small>
                                            </h4>
                                            <p>Avez vous des exemples de concours ?</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div class="pull-left">
                                                <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                                            </div>
                                            <h4>Emna Khemakhem
                                                <small><i class="fa fa-clock-o"></i> Aujourd'hui</small>
                                            </h4>
                                            <p>Merci pour ces quiz !</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div class="pull-left">
                                                <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                                            </div>
                                            <h4>Khemakhem Sami
                                                <small><i class="fa fa-clock-o"></i> Hier</small>
                                            </h4>
                                            <p>Des cours supers !</p>
                                        </a>
                                    </li>
                                </ul>
                                <div class="slimScrollBar" style="width: 3px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; background: rgb(0, 0, 0);"></div>
                                <div class="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                            </div>
                        </li>
                        <li class="footer"><a href="#">Consulter tous les Messages</a></li>
                    </ul>
                </li>
                <li class="dropdown notifications-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-warning">0</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">Vous avez 10 notifications</li>
                        <li>
                            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;">
                                <ul class="menu" style="overflow: hidden; width: 100%; height: 200px;">
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-users text-aqua"></i> 5 utilisateurs sont inscrits aujourd'hui
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-dot-circle-o text-yellow"></i> 10 utilisateurs ont passé des quiz
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-users text-red"></i> 2 utilisateurs ont modifié leur profil
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-file-pdf-o text-green"></i> 30 consultations de cours
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-user text-red"></i> Vous avez changé votre nom
                                        </a>
                                    </li>
                                </ul>
                                <div class="slimScrollBar" style="width: 3px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; background: rgb(0, 0, 0);"></div>
                                <div class="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(51, 51, 51);"></div>
                            </div>
                        </li>
                        <li class="footer"><a href="#">Afficher tous</a></li>
                    </ul>
                </li>
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        @if (Auth::check())
                            @if (Auth::user()->title == "F")
                                <img src="/users/img/avatar2.png" class="user-image" alt="User Image">
                            @else 
                               <img src="/users/img/avatar5.png" class="user-image" alt="User Image">
                            @endif  
                                <span class="hidden-xs">{{ Auth::user()->last_name }} {{ Auth::user()->first_name }} </span>
                        @else
                            <img src="/users/img/avatar5.png" class="user-image" alt="User Image">
                            
                            <span class="hidden-xs">lastname firstname </span>
                        @endif
                    </a>
                    <ul class="dropdown-menu">
                        <li class="user-header">
                            @if (Auth::check())
                                @if (Auth::user()->title == "F")
                                    <img src="/users/img/avatar2.png" class="img-circle" alt="User Image"> @else
                                    <img src="/users/img/avatar5.png" class="img-circle" alt="User Image"> @endif
                                    <p>{{ Auth::user()->last_name }} {{ Auth::user()->first_name }} 
                                    </p>
                            @else
                                <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                                <p>last_name firt_name 
                                </p>
                            @endif
                        </li>
                        
                        <li class="user-footer">
                            <div class="row pendrow" > 
                                <!--style="padding-left:40px;"-->
                                <div class="col-xs-4">
                                    <a href="#" data-toggle="tooltip" title="Profil">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="/" data-toggle="tooltip" title="Home">
                                        <i class="fa fa-home" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="/logout" data-toggle="tooltip" title="logout">
                                        <i class="fa fa-power-off" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</header>