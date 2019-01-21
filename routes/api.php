<?php

use Illuminate\Http\Request;

Route::namespace('User')->group(function () {
    Route::post('login', 'LoginController@login');
    Route::post('register', 'RegisterController@register');
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('user', 'UserController@getUserInfo');
        Route::get('logout', 'LoginController@logout');
    });
});

Route::post('contact','Contact\ContactController@add');
Route::post('order','Contact\OrderController@add');
Route::get('sitemap','Article\ArticleController@sitemap');

Route::group(['middleware'=>['auth:api','auth.check']],function (){

    // 用户管理
    require_once base_path('routes/api/user.php');

    //系统管理
    require_once base_path('routes/api/system.php');

    //权限控制
    require_once base_path('routes/api/rbac.php');

    //文章管理
    require_once base_path('routes/api/article.php');

    //分类管理
    require_once base_path('routes/api/category.php');

    require_once base_path('routes/api/nav.php');

    /**
     * 网站留言
     */
    require_once base_path('routes/api/contact.php');

    //文件上传
    Route::post('upload','System\UploadController@upload');
});

