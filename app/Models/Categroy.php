<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categroy extends Model
{
    /**
     * 该表不需要维护时间字段
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 该表全字段允许操作
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 设置操作表
     *
     * @var string
     */
    protected $table = 'categroys';

    /**
     * 追加一个字段方便前端树形框操作
     *
     * @var array
     */
    protected $appends = ['label','value'];

    /**
     * 分类关联
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(Categroy::class,'pid','id');
    }
    public function parent()
    {
        return $this->belongsTo(Categroy::class,'pid','id');
    }

    /**
     * label和名称做一个绑定方便前端操作
     *
     * @param $value
     *
     * @return mixed
     */
    public function getLabelAttribute($value)
    {
        return $this->name;
    }


    /**
     * value和名称做一个绑定方便文章发布和编辑时候的级联选择器操作
     *
     * @param $value
     *
     * @return mixed
     */
    public function getValueAttribute($value)
    {
        return $this->id;
    }

    /**
     * 分类关联文章
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function HasArticle()
    {
        return $this->hasOne(Article::class,'category','name');
    }
}
