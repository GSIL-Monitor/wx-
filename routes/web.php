<?php


//后台控制器
Route::get('admin',function (){
   return view('admin');
});
Route::get('/','Home\IndexController@index');
Route::get('company.html','Home\CompanyController@index');
Route::get('henhen.html','Home\CompanyController@henhen');
Route::get('contact.html','Home\ContactController@index');
Route::get('product.html','Home\ProductController@index');
Route::get('news.html','Home\NewsController@index');
Route::get('read/{id}.html','Home\NewsController@read');