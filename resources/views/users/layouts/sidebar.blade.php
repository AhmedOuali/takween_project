<aside class="main-sidebar">
    <section class="sidebar"><br>
        <div class="user-panel">
            <div class="pull-left image">
                @if (Auth::check())
                    @if (Auth::user()->title == "F")
                    <img src="/users/img/avatar2.png" class="img-circle" alt="User Image">
                    @else 
                    <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                    @endif 
                @else
                    <img src="/users/img/avatar5.png" class="img-circle" alt="User Image">
                @endif
                    
            </div>
            <div class="pull-left info">
                @if (Auth::check())
                    <p>{{ Auth::user()->last_name }} {{ Auth::user()->first_name }} </p>
                @endif
                <a href="#"><i class="fa fa-circle text-success"></i>Online</a>
            </div>
        </div>
        <br>
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Rechercher...">
                <span class="input-group-btn">
                    <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
               </span>
            </div>
        </form><br>
        <ul class="sidebar-menu">
            
             <li class="treeview">
                <a href="/profil">
                    <i class="fa fa-users" aria-hidden="true"></i><span> Profil</span>
                </a>
            </li><br>
            <li class="treeview ">
                <a href="/test">
                   <i class="fa fa-dot-circle-o" aria-hidden="true"></i><span> Test </span>
                </a>
                
            </li><br>
            <li class="treeview ">
                <a href="#">
                    <i class="ion ion-ios-gear-outline" aria-hidden="true"></i><span>settings</span>
               </a>
                
            </li><br>
            
        </ul>
    </section>
</aside>