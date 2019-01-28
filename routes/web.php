<?php


//后台控制器
Route::get('admin', function () {
    return view('admin');
});

Route::get('/report', function () {
    return view('goods.report');
});

Route::get('/{code}', 'Home\GoodsController@show');

