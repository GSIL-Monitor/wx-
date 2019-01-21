<?php

namespace App\Http\Controllers\Home;

use App\Models\Article;
use App\Models\Categroy;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends HomeBaseController
{
    /*
     * 新闻中心
     */
    public function index(Request $request)
    {
        $category = $this->getCategory();
        $parameter = $request->all();
        //当前分类
        $currentCategory = [];
        if (isset($parameter['category'])) {
            $article = Article::where('category', $parameter['category'])
                ->orderByRaw('top desc,recommend desc,publish_time desc')
                ->paginate(10);
            $currentCategory['category'] = $parameter['category'];

        }else {
            $IndexCategory = Categroy::where('name','行业动态')->first(['name']);
            $article = Article::where('category', $IndexCategory['name'])
                ->orderByRaw('top desc,recommend desc,publish_time desc')
                ->paginate(10);
            $currentCategory['category'] =  $IndexCategory['name'];
        }
        //选中效果css样式类
        $currentCategory['class'] = 'tabclick';
        return $this->returnView('news.news',[
            'category'=>$category,
            'article'=>$article,
            'currentCategory'=>$currentCategory
        ]);
    }
    //读文章
    public function read($id)
    {
        $id = cmf_url_decrypt($id);
        $article = Article::with('HasTemplate')->find($id);

        //文章点击量自增
        $article->increment('click');
        $seo['title'] = $article->title;
        $seo['desc'] = $article->desc;
        $seo['keywords'] = $article->keywords;
        return $this->returnView($article->HasTemplate->path,
            [
                'seo'=>$seo,
                'article'=>$article,
                'clickTop'=>$this->articleColumnDesc('top desc,click desc,publish_time desc,recommend desc', 'clickTop', 10),
                'topNext'=>$this->getTOP_Next($id)
            ]
        );
    }

    /**
     * 获取上一页  下一页的id
     * @param int $id 当前页id
     * @return mixed
     */
    public function getTOP_Next($id)
    {

        $top = Article::select('id','title')
            ->where('id', '<' ,$id)
            ->orderBy('id', 'desc')
            ->first();
        if (!empty($top)){
            $result['top'] = cmf_url_encrypt_item($top->toArray());
        }
        $next = Article::select('id','title')
            ->where('id', '>' ,$id)
            ->orderBy('id' ,'asc')
            ->first();
        if (!empty($next)) {
            $result['next'] =  cmf_url_encrypt_item($next->toArray());
        }
        return $result;
    }
}
