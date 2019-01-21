<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/12/7
 * Time: 11:51
 */

namespace App\Http\Controllers\Home;


use App\Http\Controllers\BaseController;
use App\Models\Article;
use App\Models\Categroy;
use App\Models\ConfigModel;
use App\Models\FriendLink;
use App\Models\Nav;
use App\Models\Product;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Request;

class HomeBaseController extends BaseController
{
    /*
     * 缓存前缀
     */
    protected $cache_prefix = 'OA:';

    /*
     * 缓存时间
     */
    protected $cache_time = '900';

    /**
     * 基础缓存策略
     *
     * @param string $model     模型
     * @param string $cacheName 缓存名
     *
     * @return mixed
     */
    public function baseCachePolicy($model, $cacheName, $where = [], $with = null)
    {
        $result = Redis::get($this->cache_prefix . $cacheName);
        if (empty($result)) { //缓存中没有数据,则存入数据
            $data = $model::with($with)->where($where)->get();
            $cache_Str = serialize($data);//编码压入
            Redis::setex($this->cache_prefix . $cacheName, $this->cache_time, $cache_Str);
            return $data;
        } else {//缓存中有数据
            //解码返回
            return unserialize($result);
        }
    }

    /**
     * 获得导航条内容
     *
     * @return mixed
     */
    public function getNav()
    {
        return $this->baseCachePolicy(new Nav, 'nav',['status'=>'1']);
    }

    /**
     * 根据链接获得当前页面的banner图
     *
     * @param $link
     *
     * @return mixed
     */
    public function getBanner($link)
    {
       return Nav::where('link',$link)->first()->nav_banner ?? [];
    }

    public function getSeo($link)
    {
        return Nav::with('seo')
            ->where('link',$link)
            ->first()->seo ?? [];
    }

    /**
     * 获得友情链接
     *
     * @return mixed
     */
    public function getFriendLink()
    {
        return $this->baseCachePolicy(new FriendLink, 'FriendLink');
    }

    /**
     * 根据keyword返回配置表的信息数据
     *
     * @return mixed
     */
    public function getConfig($cacheName, $keyword)
    {

        return $this->baseCachePolicy(new ConfigModel, $cacheName, ['keyword' => $keyword]);
    }

    public function getProduct()
    {
        return $this->baseCachePolicy(
            new Product,
            'product',
            ['pid'=>0],
            'children.children'
        );
    }
    /**
     * 返回分类数据
     *
     * @return mixed
     */
    public function getCategory()
    {
        return $this->baseCachePolicy(new Categroy, 'Category', [['pid', '>', '0']]);
    }

    /**
     * 获得产品功能信息
     *
     * @return mixed
     */
    public function getProductsInfo()
    {
        return $this->baseCachePolicy(new Product, 'Product', ['pid'=> '0'],'children.children');
    }

    /**
     * 获得当前请求链接
     * @return string
     */
    public function getLink()
    {
        $result = explode('.', request()->path())[0];
        if ($result == '/'){
            return '/'; //首页
        }
       return '/'.$result;
    }

    /**
     * 根据传入字段，取文章的排序结果
     *
     * @param string $column 字段
     * @param string $cacheName 缓存名
     * @param integer $limit 条数
     * @return mixed
     */
    public function articleColumnDesc($column, $cacheName, $limit)
    {
        $result = Redis::get($this->cache_prefix . $cacheName);
        if (empty($result)) { //缓存中没有数据,则存入数据
            $data = Article::orderByRaw($column)
                ->limit($limit)
                ->get()
                ->toArray();
            $data = cmf_url_encrypt_array($data);
            $cache_Str = serialize($data);//编码压入
            Redis::setex($this->cache_prefix .$cacheName, $this->cache_time, $cache_Str);
            return $data;
        } else {//缓存中有数据
            //解码返回
            return unserialize($result);
        }
    }



    /**
     * 返回页面数据
     *
     * @param        $url
     * @param array  $data
     * @param string $link
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function returnView($url, $data = [], $link = "")
    {
        $base = [
            'navs' => $this->getNav(),
            'site_base' => $this->getConfig('site_base', 'sitebase'),
            'banners'=>$this->getBanner($this->getLink()),
            'seo'=>$this->getSeo($this->getLink()),
            'FriendLink' => $this->getFriendLink(),
        ];
        $data = array_merge($base, $data);
        return view($url, $data);
    }

}