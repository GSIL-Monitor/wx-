<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->comment('文章标题');
            $table->string('category')->comment('文章分类名称');
            $table->integer('guest_book_id')->nullable()->comment('留言id');
            $table->text('description')->nullable()->comment('文章简介');
            $table->string('photo')->nullable()->comment('文章封面');
            $table->string('keywords')->nullable()->comment('文章关键字');
            $table->integer('click')->default(0)->comment('文章点击量');
            $table->string('publish_time')->comment('文章发布时间');
            $table->string('author')->comment('作者,程序默认存储登录用户');
            $table->text('content')->comment('文章内容');
            $table->integer('top')->default(0)->comment('文章置顶 0不置顶1置顶');
            $table->integer('recommend')->default(0)->comment('文章推荐 0不推荐 1推荐');
            $table->integer('discuss')->default(1)->comment('文章是否开放评论 0不开发 1开放');
            $table->integer('template_id')->nullable()->comment('文章模板ID,不填写为默认模板');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
