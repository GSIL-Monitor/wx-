<?php

namespace App\Http\Controllers\Home;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends HomeBaseController
{
    //
    public function index()
    {
        $result = [];
        //获得公司介绍
        $result['company'] = $this->getConfig('company','company')->toArray()[0]['value'];
        //获得henhen介绍
        $result['henhen'] = $this->getConfig('henhen','henhen')->toArray()[0]['value'];
        //获得产品亮点
        $result['point'] = $this->getConfig('point','point')->toArray()[0]['value'];
        //获得产品功能
        $result['product'] = $this->getProduct()->toArray();
        //获得最新6条新闻
        $result['sixArticle'] = $this->articleColumnDesc('top desc,recommend desc,publish_time desc','article',6);

        return $this->returnView('index.index',['result'=>$result]);
    }
}
