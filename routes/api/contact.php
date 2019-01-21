<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/12/6
 * Time: 8:54
 */

Route::group(['namespace'=>'Contact'],function (){
    // 预约体验
    Route::prefix('order')->group(function (){
        Route::get('/','OrderController@getList');
        Route::get('/{id}','OrderController@get');
        Route::put('/{id}','OrderController@edit');
    });
    //网站留言
    Route::prefix('contact')->group(function () {
        Route::get('/','ContactController@getList');
        Route::get('/{id}','ContactController@get');
        Route::put('/{id}','ContactController@edit');
    });
});