<?php


//后台控制器
Route::get('admin', function () {
    return view('admin');
});
Route::get('t','t@index');

Route::get('/report', function () {
    return view('goods.report');
});
Route::get('/buySuccess/{id}', 'Home\GoodsController@buySuccess');

Route::get('/{code}', 'Home\GoodsController@show');

