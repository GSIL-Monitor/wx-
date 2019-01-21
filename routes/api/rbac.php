<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/7
 * Time: 9:13
 */

Route::group(['namespace'=>'Rbac'],function (){
    // 角色管理
    Route::prefix('role')->group(function (){
        Route::get('list','RoleController@getList')->name('role_list');
        Route::post('add','RoleController@add');
        Route::post('edit/{id}','RoleController@edit');
        Route::get('/{id}','RoleController@get');
        Route::get('del/{id}','RoleController@delete');
        Route::post('del/disable','RoleController@disable');    //禁用权限
        Route::post('give_auth','RoleController@GiveAuth');     // 添加角色权限
        Route::get('get_role_auth/{id}','RoleController@GetRoleHasAuth'); // 获取角色权限
    });

    // 权限管理
    Route::prefix('auth')->group(function (){
        Route::get('list','AuthController@getList');
        Route::get('tree','AuthController@tree');
        Route::post('add','AuthController@add');
        Route::get('auth_tree','AuthController@authTree');//权限树结构
        Route::get('/{id}','AuthController@get');
        Route::get('del/{id}','AuthController@delete');
        Route::post('edit/{id}','AuthController@edit');
    });
});