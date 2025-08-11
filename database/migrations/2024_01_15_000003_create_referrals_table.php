<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->string('student_name');
            $table->string('student_email');
            $table->string('student_phone');
            $table->decimal('program_price', 15, 2);
            $table->decimal('commission_percentage', 5, 2);
            $table->decimal('commission_amount', 15, 2);
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('registered_at');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('affiliate_id');
            $table->index('program_id');
            $table->index('status');
            $table->index(['affiliate_id', 'status']);
            $table->index('registered_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};