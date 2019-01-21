<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/6
 * Time: 17:39
 */

/**
 * 系统设置模块
 */
Route::group(['namespace'=>'System'],function () {

    // 菜单管理
    Route::prefix('menu')->group(function () {
        Route::get('list', 'MenuController@getList');
        Route::get('tree', 'MenuController@getTree');
        Route::get('user/tree', 'MenuController@userTree');
        Route::get('/{id}', 'MenuController@get');
        Route::post('add', 'MenuController@add');
        Route::post('edit', 'MenuController@edit');
        Route::get('del/{id}', 'MenuController@delete');
        Route::get('parent/{id}', 'MenuController@getParentId');
        Route::get('children/{id}', 'MenuController@getChildren');
    });

    // 友情链接管理
    Route::prefix('friend_link')->group(function () {
        Route::get('list', 'FriendLinkController@getList');
        Route::get('/{id}', 'FriendLinkController@get');
        Route::post('add', 'FriendLinkController@add');
        Route::post('edit/{id}', 'FriendLinkController@edit');
        Route::get('del/{id}', 'FriendLinkController@delete');
    });
    //配置路由
    Route::resource('/config','ConfigController');

    // 友情链接管理
    Route::prefix('product')->group(function () {
        Route::get('list', 'ProductController@getList');
        Route::get('/{id}', 'ProductController@get');
        Route::post('add', 'ProductController@add');
        Route::post('edit/{id}', 'ProductController@edit');
        Route::get('del/{id}', 'ProductController@delete');
    });
});