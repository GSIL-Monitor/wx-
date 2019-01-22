<?php

namespace App\Http\Controllers\Article;

use App\Exceptions\FromVerif;
use App\Http\Controllers\BaseController;
use App\Models\Article;
use App\Models\Auth;
use App\Models\Categroy;
use App\Models\Nav;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;


class ArticleController extends BaseController
{
    /**
     * 控制器模型
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * 添加文章
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        //验证表单字段
        $article = $this->formVerif($request, [
            'title' => 'required', //文章标题
            'content' => 'required', //文章内容
            'category' => 'required', //文章分类类型
            'photo' => 'nullable', //文章封面
            'description' => 'nullable', //文章描述
            'random_jump' => 'nullable', //随机跳转
            'is_wechat' => 'nullable', //是否检测微信
            'arrow' => 'nullable',    //文章箭头返回地址
            'physics' => 'nullable', //物理按键返回地址
            'url' => 'nullable', //文章访问地址
            'music' => 'nullable',    //背景音乐
            'appid' => 'nullable',    //微信appId
            'key' => 'nullable',  //微信密匙
            'right_now' => 'nullable',    //文章立即跳转
            'cnzz' => 'nullable', //第三方流量统计
        ]);

        $article['publish_time'] = date('Y-m-d H:i:s'); //发布时间默认当前时间
        $article['author'] = \Illuminate\Support\Facades\Auth::user()->username; //作者默认当前登录人员
        $categoryID = array_pop($article['category']); //前端传递数据处理
        $article['category'] = Categroy::where('id', $categoryID)->first()->name;

        $res = Article::create($article);
        return $this->returnMsg($res);
    }

    /**
     * 获得文章详细
     *
     * @param integer $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        $data = $this->model::find($id);

        $category = Categroy::where('name', $data->category)->first();
        $pid = $this->getPid($category->id);

        $data->category_id = [$pid, $category->id];
        //临时隐藏一些字段方便后续调用
        return $this->returnData($data->makeHidden(['status', 'other'])->toArray());
    }

    public function getPid($id)
    {
        $pid = Categroy::where('id', $id)->first(['id', 'pid'])->toArray();
        //如果不是最顶级
        if ($pid['pid'] != 0) {
            return $this->getPid($pid['pid']);
        }
        return $pid['id'];
    }

    public function getList(Request $request)
    {
        $data = $this->filter($this->model::orderBy('publish_time', 'desc')
            ->where('author', \Illuminate\Support\Facades\Auth::user()->username), $request, 'array');
        return response()->json($data);
    }

    /**
     * 修改文章
     *
     * @param  integer                 $id      文章id
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        //验证表单字段
        $filedValue = $this->formVerif($request, [
            'title' => 'required', //文章标题
            'content' => 'required', //文章内容
            'category' => 'required', //文章分类类型
            'photo' => 'nullable', //文章封面
            'description' => 'nullable', //文章描述
            'random_jump' => 'nullable', //随机跳转
            'is_wechat' => 'nullable', //是否检测微信
            'arrow' => 'nullable',    //文章箭头返回地址
            'physics' => 'nullable', //物理按键返回地址
            'url' => 'nullable', //文章访问地址
            'music' => 'nullable',    //背景音乐
            'appid' => 'nullable',    //微信appId
            'key' => 'nullable',  //微信密匙
            'right_now' => 'nullable',    //文章立即跳转
            'cnzz' => 'nullable', //第三方流量统计
        ]);
        $categoryID = array_pop($filedValue['category']); //前端传递数据处理
        $filedValue['category'] = Categroy::where('id', $categoryID)->first()->name;
        $res = Article::find($id)->update($filedValue);
        return $this->returnMsg($res);
    }

    /**
     * 清除缓存
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clean()
    {
        $cache_prefix = 'OA:'; //Redis缓存前缀
        $cache_arr = Redis::keys($cache_prefix . "*");
        foreach ($cache_arr as $item) {
            Redis::del($item);
        }
        return $this->returnMsg(true);
    }
}
