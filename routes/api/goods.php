<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/1/22
 * Time: 15:25
 */

Route::group(['namespace'=>'Order'],function () {
    // 来源管理
    Route::prefix('source')->group(function (){
        Route::get('/','SourceController@getList');
        Route::post('/','SourceController@add');
        Route::put('/{id}','SourceController@edit');
        Route::get('/{id}','SourceController@get');
        Route::delete('/{id}','SourceController@delete');
        Route::post('/batchIdDelete','SourceController@batchIdDelete');
    });
});