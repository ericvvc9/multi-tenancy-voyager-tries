<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('clinic_history_id');
            $table->dateTime('date');
            $table->integer('consultory_room');
            $table->string('treatment');
            $table->string('doctor_id'); // user - table
            $table->text('observations'); // user - table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_histories');
    }
}
