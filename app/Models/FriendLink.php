<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FriendLink extends Model
{
    /**
     * 该表不需要维护时间
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 设置操作表
     * @var string
     */
    protected $table = 'friend_links';

    /**
     * 设置操字段全部允许操作
     * @var array
     */
    protected $guarded = [];
}
