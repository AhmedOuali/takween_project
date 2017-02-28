@extends('layouts.app') 
@section('title', 'Quizz') 
@section('header_title', 'Quizz') 
@section('content')
<div class="container">
    <div class="main-content">
        <div class="row">
            <div class="col-md-6 col-md-offset-3" >
                <div id="progressTimer"></div>
                <hr>
                <div class="box-body pad">
                    <div class="panel panel-info">
                        <div class="panel-heading"> <b> {{ $quizz->name }} :  {{ $quizz->description }}</b>
                            <br>  
                            <ul>
                                <li><h5>Description : {{ $quizz->description }}</h5></li> 
                                <li><h5>Nombre de questions : {{ count($questions) }}</h5></li> 
                                <li><h5>Difficulté : {{ $quizz->difficulty }}</h5></li> 
                                <li><h5>Difficulté : </h5></li> 
                            </ul>
                        </div>
                            <br>  
                            <br>
                    
                        <div class="panel-body">
                            <div id="question" class="wizard clearfix">
                                @foreach ($questions as $question)
                                    <h3>question</h3>
                                        <section >
                                            <ul>
                                                <li>
                                                    Question 1 : abcd 
                                                    <br><br>
                                                        <input type="checkbox" id="1" class="rep11" name="reponse1" value="1"> 
                                                        <label >reponse 1 </label>
                                                        <br>
                                                        <input type="checkbox" id="2" class="rep12" name="reponse2" value="2"> 
                                                        <label >reponse 2 </label>
                                                        <br>
                                                        <input type="checkbox" id="3" class="rep13" name="reponse3" value="3"> 
                                                        <label >reponse 3 </label>
                                                        <br>
                                                        <input type="checkbox" value="0"  id="" class="not" rep="rep{{$question->id}}"> 
                                                        <label >Je ne sais pas </label>
                                                        <br>
                                                </li>
                                            </ul>
                                        </section>
                                        <br>
                                @endforeach  
                            </div>
                            <br><br> 
                        </div>    
                    </div>
                </div><br><br><br>
                
            </div>
        </div>
    </div>
</div>

@endsection