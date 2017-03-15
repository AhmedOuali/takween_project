@extends('users.layouts.app') 
@section('title', 'test') 
@section('content')
<div class="container">
    <div class="content-wrapper">
        <section class="content">
        
        <!---------------------------------------------------------->
        <!-------------------Resultat de test----------------------->
        <!---------------------------------------------------------->
        <div class="row" style="padding-bottom:20px;">
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-aqua"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                       <span class="text">Note de A</span> 
                       <span class="info-box-number">?/10 &nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <!---->
            <!---->
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-red"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de B</span> 
                       <span class="info-box-number">?/10 &nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <!---->
            <!---->
            <div class="clearfix visible-sm-block"></div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-green"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de C</span> 
                       <span class="info-box-number">?/10&nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <!---->
            <!---->
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-yellow"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de D</span> 
                        <span class="info-box-number">?/10&nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <!---->
            <!---->
        <!---------------------------------------------------------->   
        <!---------------------------------------------------------->   
        <!---------------------------------------------------------->   
            
            <div class="main-content col-md-6 col-md-offset-5 col-sm-4 col-sm-offset-6">
                <div class="row">
                    <br><br><br><br>
                    
                    <!-----------------Bouton de declanchement du test---------------------->
                    <button class="btn btn-jaune " data-toggle="modal" data-target=".bd-example-modal-lg">Pass the test</button>
                    <!---------------------------------------------------------------------->
                    
                    <!---------------------------Le Test------------------------------->
                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <form action="/test/done" method="post">
                                    {{ csrf_field() }}
                                    <div class="container " id="myWizard">
                                        <div class="col-md-9 col-sm-9">
                                            <h3>The Test</h3>
                                            <hr>
                                            <div class="navbar">
                                                <div class="navbar-inner">
                                                    <ul class="nav nav-pills">
                                                       <li class="active"><a href="#step1" data-toggle="tab" data-step="1">Step 1</a></li>
                                                       <li><a href="#step2" data-toggle="tab" data-step="2">Step 2</a></li>
                                                       <li><a href="#step3" data-toggle="tab" data-step="3">Step 3</a></li>
                                                       <li><a href="#step4" data-toggle="tab" data-step="4">Step 4</a></li>
                                                       <li><a href="#step5" data-toggle="tab" data-step="5">Step 5</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="tab-content">
                                                <div class="tab-pane fade in active" id="step1">
                                                <div class="well"> 
                                                    <h3>question</h3>
                                                    <section >
                                                        <ul>
                                                            <li>
                                                                Question 1 : abcd 
                                                                <br><br>
                                                                    <input type="radio" id="1" class="rep11" name="reponse1" value="2"> 
                                                                    <label >reponse 2 </label>
                                                                    <br>
                                                                    <input type="radio" id="3" class="rep13" name="reponse1" value="3"> 
                                                                    <label >reponse 3 </label>
                                                                    <br>
                                                                    <input type="radio" value="0"  id="0"  name="reponse1" class="not" rep="0" checked='true'> 
                                                                    <label >Je ne sais pas </label>
                                                                    <br>
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </div>
                                                <a class="btn btn-default btn-lg next" href="#">Continue</a>
                                              </div>
                                                <div class="tab-pane fade" id="step2">
                                                 <div class="well"> 
                                                    <h3>Question</h3>
                                                    <section >
                                                        <ul>
                                                            <li>
                                                                Question 2 : abcd 
                                                                <br><br>
                                                                    <input type="radio" id="1" class="rep11" name="reponse2" value="1"> 
                                                                    <label >reponse 1 </label>
                                                                    <br>
                                                                    <input type="radio" id="2" class="rep12" name="reponse2" value="2"> 
                                                                    <label >reponse 2 </label>
                                                                    <br>
                                                                    <input type="radio" id="3" class="rep13" name="reponse2" value="3"> 
                                                                    <label >reponse 3 </label>
                                                                    <br>
                                                                    <input type="radio" value="0"  id="0"  name="reponse2" class="not" rep="0" checked='true'> 
                                                                    <label >Je ne sais pas </label>
                                                                    <br>
                                                            </li>
                                                        </ul>
                                                    </section>
                                                 </div>
                                                 <a class="btn btn-default btn-lg next" href="#">Continue</a>
                                              </div>
                                                <div class="tab-pane fade" id="step3">
                                                    <div class="well"> 
                                                        <h3>Question</h3>
                                                        <section >
                                                            <ul>
                                                                <li>
                                                                    Question 3 : abcd 
                                                                    <br><br>
                                                                        <input type="radio" id="1" class="rep11" name="reponse3" value="1"> 
                                                                        <label >reponse 1 </label>
                                                                        <br>
                                                                        <input type="radio" id="2" class="rep12" name="reponse3" value="2"> 
                                                                        <label >reponse 2 </label>
                                                                        <br>
                                                                        <input type="radio" id="3" class="rep13" name="reponse3" value="3"> 
                                                                        <label >reponse 3 </label>
                                                                        <br>
                                                                        <input type="radio" value="0"  id="0"  name="reponse3" class="not" rep="0" checked='true'> 
                                                                        <label >Je ne sais pas </label>
                                                                        <br>
                                                                </li>
                                                            </ul>
                                                        </section>
                                                    </div>
                                                    <a class="btn btn-default btn-lg next" href="#">Continue</a>
                                                </div>
                                                <div class="tab-pane fade" id="step4">
                                                  <div class="well"> 
                                                    <h3>Question</h3>
                                                            <section >
                                                                <ul>
                                                                    <li>
                                                                        Question 4 : abcd 
                                                                        <br><br>
                                                                            <input type="radio" id="1" class="rep11" name="reponse4" value="1"> 
                                                                            <label >reponse 1 </label>
                                                                            <br>
                                                                            <input type="radio" id="2" class="rep12" name="reponse4" value="2"> 
                                                                            <label >reponse 2 </label>
                                                                            <br>
                                                                            <input type="radio" id="3" class="rep13" name="reponse4" value="3"> 
                                                                            <label >reponse 3 </label>
                                                                            <br>
                                                                            <input type="radio" value="0"  id="0"  name="reponse4" class="not" rep="0" checked='true'> 
                                                                            <label >Je ne sais pas </label>
                                                                            <br>
                                                                    </li>
                                                                </ul>
                                                            </section>
                                                            </div>
                                                 <a class="btn btn-default btn-lg next" href="#">Continue</a>
                                              </div>
                                                <div class="tab-pane fade" id="step5">
                                                <div class="well"> 
                                                    <h3>Question 5</h3>
                                                    <section >
                                                        <ul>
                                                            <li>
                                                                Question 1 : abcd 
                                                                <br><br>
                                                                    <input type="radio" id="1" class="rep11" name="reponse5" value="1"> 
                                                                    <label >reponse 1 </label>
                                                                    <br>
                                                                    <input type="radio" id="2" class="rep12" name="reponse5" value="2"> 
                                                                    <label >reponse 2 </label>
                                                                    <br>
                                                                    <input type="radio" id="3" class="rep13" name="reponse5" value="3"> 
                                                                    <label >reponse 3 </label>
                                                                    <br>
                                                                    <input type="radio" value="0"  id="0"  name="reponse5" class="not" rep="0" checked='true'> 
                                                                    <label >Je ne sais pas </label>
                                                                    <br>
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </div>
                                                <a class="btn btn-success first" href="#">retry</a>
                                                <button type="submit" class="btn btn-blue pull-right"> Finish </button>
                                              </div>
                                           </div>
                                            <br>
                                        </div>
                                    </div>
                                </form >     
                            </div><!--modal-content-->
                        </div><!--modal-dialog modal-lg-->
                    </div><!--modal fade bd-example-modal-lg-->
                    
                    <!---------------------------------------------------------->
                </div>
            </div>
        </div>
        <br><br>
    </section>
    </div>
</div>
 

@endsection