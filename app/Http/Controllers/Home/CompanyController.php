<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * 公司详情页
 *
 * Class CompanyController
 *
 * @category CompanyController
 * @package  App\Http\Controllers\Home
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class CompanyController extends HomeBaseController
{
    /**
     * 公司详情展示页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $company = $this->getConfig('company', 'company')->toArray()[0]['value'] ;
        return $this->returnView('company.company', ['company' => $company]);
    }

    /**
     * 什么是哼哼  和公司介绍共用一个模板
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function henhen()
    {
        $company = $this->getConfig('henhen', 'henhen')->toArray()[0]['value'] ;
        return $this->returnView('company.company', ['company' => $company]);
    }
}
