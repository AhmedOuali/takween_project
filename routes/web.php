<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.home');              /*à vous de jouer :D*/
});
Route:: get('/home',function (){
    return view('pages.home');            /*à vous de jouer :D*/
});
Route::get('/maintenance',function(){
    return view('pages.maintenance');    /*à vous de jouer :D*/
});
Route::get('/inscription',function(){
    return view('pages.auth.signup');
});
Route::get('/connexion',function(){
    return view('pages.auth.signin');
});
Route::get('/dashboard',function(){
    return view('users.dashboard');
});
Route::get('/profil',function(){
    return view('users.profil');
});
Route::get('/test',function(){
    return view('users.test');
});
Route::get('/test1',function(){
    return view('auth.register');
});


Auth::routes();

Route::get('/home', 'HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index');
