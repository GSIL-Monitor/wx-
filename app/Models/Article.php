<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    /**
     * 启用软删除
     */
    use SoftDeletes;

    /**
     * 应该被调整为日期的属性
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * 设置操作表
     *
     * @var string
     */
    protected $table = 'articles';

    const NOTALLOW = 0;
    const ALLOW = 1;

    /**
     * 该表所有字段允许赋值
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 该模型不需要维护时间
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 模型数据类型转换
     *
     * @var array
     */
    protected $casts = [
        'top' => 'string',
        'recommend' => 'string',
        'discuss' => 'string',
    ];

    /**
     * 追加一个文章状态的字段
     * 
     * @var array 
     */
    protected $appends = ['status','other','url'];

    /**
     * 文章关联到的文章模板
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function HasTemplate()
    {
        return $this->hasOne(ArticleTemplate::class,'id','template_id');
    }
    /**
     * 状态访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getStatusAttribute($value)
    {
        if (empty($this->description)){
            $value['desc'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['desc'] = ['status'=>'√','color'=>'green'];
        }
        if (empty($this->photo)){
            $value['photo'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['photo'] =  ['status'=>'√','color'=>'green'];
        }
        if (empty($this->keywords)){
            $value['keywords'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['keywords'] = ['status'=>'√','color'=>'green'];
        }
        return $value;
    }

    /**
     * 其他选项访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getOtherAttribute($value)
    {
        if ($this->top != self::ALLOW){
            $value['top'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['top'] = ['status'=>'√','color'=>'green'];
        }
        if ($this->discuss != self::ALLOW){
            $value['discuss'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['discuss'] = ['status'=>'√','color'=>'green'];
        }
        if ($this->recommend != self::ALLOW){
            $value['recommend'] = ['status'=>'×','color'=>'red'];
        }else{
            $value['recommend'] =  ['status'=>'√','color'=>'green'];
        }
        return $value;
    }

    /**
     * 获得前端访问的url链接
     *
     * @param $value
     *
     * @return mixed
     */
    public function getUrlAttribute()
    {

        $url =  url('read',cmf_url_encrypt($this->id)).'.html';
        return $url;
    }

    public function getPublishTimeAttribute($value)
    {
        $timeStr = strtotime($value);
        return date('Y-m-d',$timeStr);
    }
}
