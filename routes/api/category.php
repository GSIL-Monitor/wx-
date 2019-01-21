<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/23
 * Time: 15:39
 */

Route::group(['namespace'=>'Article'],function (){
    // 文章管理
    Route::prefix('category')->group(function (){
        Route::get('list','CategoryController@getList');
        Route::post('add','CategoryController@add');
        Route::post('edit/{id}','CategoryController@edit');
        Route::get('/{id}','CategoryController@get');
        Route::get('del/{id}','CategoryController@delete');
    });
});