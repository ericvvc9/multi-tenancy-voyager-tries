<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('last_name');
            $table->string('document_number')->unique();
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->string('avatar')->nullable();
            $table->string('birthdate')->nullable();
            $table->string('in_charge_name')->nullable();
            $table->string('state')->nullable();
            $table->text('odontograma')->nullable();
            $table->text('diseases')->nullable();
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
        Schema::dropIfExists('patients');
    }
}
