<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/12/6
 * Time: 15:58
 */

Route::group(['namespace'=>'System'],function (){
    //前端导航管理
    Route::prefix('nav')->group(function (){
        Route::get('/','NavController@getList');
        Route::get('/{id}','NavController@get');
        Route::put('/{id}','NavController@edit');
        Route::post('/','NavController@add');
        Route::delete('/{id}','NavController@delete');
    });
    //网页推广设置
    Route::prefix('seo')->group(function () {
        Route::get('/','SEOController@getList');
        Route::get('/{id}','SEOController@get');
        Route::put('/{id}','SEOController@edit');
        Route::post('/','SEOController@add');
        Route::delete('/{id}','SEOController@delete');
    });
});