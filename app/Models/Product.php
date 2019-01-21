<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
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
    protected $table = 'products';

    /**
     * 追加一个字段方便前端树形框操作
     *
     * @var array
     */
    protected $appends = ['label'];

    /**
     * 分类关联
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(Product::class,'pid','id');
    }
    public function parent()
    {
        return $this->belongsTo(Product::class,'pid','id');
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
        return $this->content;
    }
}
