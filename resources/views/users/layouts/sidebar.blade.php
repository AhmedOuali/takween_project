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
                    <img src="/users/img/avatar2.png" class="img-circle" alt="User Image">
                @endif
                    
            </div>
            <div class="pull-left info">
                @if (Auth::check())
                    <p>{{ Auth::user()->last_name }} {{ Auth::user()->first_name }} </p>
                @endif
                <a href="#"><i class="fa fa-circle text-success"></i> en ligne</a>
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
                <a href="/admin">
                    <i class="fa fa-dashboard"></i><span> Accueil</span>
                </a>
            </li><br>
             <li class="treeview">
                <a href="/admin/utilisateurs">
                    <i class="fa fa-users" aria-hidden="true"></i><span> Profil</span>
                </a>
            </li><br>
            <li class="treeview ">
                <a href="/admin/cours">
                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i><span> Cours</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu ">
                    <li><a href="/admin/cours"><i class="fa fa-circle-o"></i> Afficher</a></li>
                    <li><a href=""><i class="fa fa-circle-o"></i> Ajouter </a></li>
                </ul>
            </li><br>
            <li class="treeview ">
                <a href="/admin/questions">
                    <i class="fa fa-question-circle"></i><span> Questions</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu menu-open">
                    <li><a href="/admin/questions"><i class="fa fa-circle-o"></i> Afficher</a></li>
                    <li><a href="/admin/questions/créer"><i class="fa fa-circle-o"></i> Ajouter </a></li>
                </ul>
            </li><br>
            <li class="treeview ">
                <a href="/admin/reponses">
                    <i class="fa fa-folder-o"></i><span> Réponses</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu menu-open">
                    <li><a href="/admin/reponses"><i class="fa fa-circle-o"></i> Afficher</a></li>
                    <li><a href="/admin/reponses/créer"><i class="fa fa-circle-o"></i> Ajouter </a></li>
                </ul>
            </li><br>
            <li class="treeview ">
                <a href="/admin/quizzs">
                   <i class="fa fa-dot-circle-o" aria-hidden="true"></i><span> Quiz </span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu ">
                    <li><a href="/admin/quizz"><i class="fa fa-circle-o"></i> Afficher</a></li>
                    <li><a href="/admin/quizz/créer"><i class="fa fa-circle-o"></i> Ajouter </a></li>
                </ul>
            </li><br>
             <li class="treeview ">
                <a href="/admin/commentaires">
                    <i class="ion-ios-compose" aria-hidden="true"></i><span> Commentaires</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu ">
                    <li><a href="/admin/commentaires"><i class="fa fa-circle-o"></i> Quizz</a></li>
                    <li><a href="/admin/commentaires"><i class="fa fa-circle-o"></i> Cours </a></li>
                </ul>
             </li><br>
            <li class="treeview ">
                <a href="/admin/preparatoires">
                    <i class="ion ion-ios-gear-outline" aria-hidden="true"></i><span> Paramétres</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu menu-open">
                    <li><a href="/admin/preparatoire/créer"><i class="fa fa-circle-o"></i> Ajouter preparatoire </a></li>
                    <li><a href="/admin/preparatoires"><i class="fa fa-circle-o"></i> Afficher préparatoires </a></li>
                    <li><a href="/admin/niveau/créer"><i class="fa fa-circle-o"></i> Ajouter niveau </a></li>
                    <li><a href="/admin/niveaux"><i class="fa fa-circle-o"></i> Afficher niveaux </a></li>
                    <li><a href="/admin/options/créer"><i class="fa fa-circle-o"></i> Ajouter option </a></li>
                    <li><a href="/admin/options"><i class="fa fa-circle-o"></i> Afficher options </a></li>
                </ul>
            </li><br>
            
        </ul>
    </section>
</aside>