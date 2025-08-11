<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Referral
 *
 * @property int $id
 * @property int $affiliate_id
 * @property int $program_id
 * @property string $student_name
 * @property string $student_email
 * @property string $student_phone
 * @property float $program_price
 * @property float $commission_percentage
 * @property float $commission_amount
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $registered_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Affiliate $affiliate
 * @property-read \App\Models\Program $program
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral query()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereAffiliateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCommissionAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCommissionPercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereProgramPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereRegisteredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral confirmed()
 * @method static \Database\Factories\ReferralFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Referral extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'affiliate_id',
        'program_id',
        'student_name',
        'student_email',
        'student_phone',
        'program_price',
        'commission_percentage',
        'commission_amount',
        'status',
        'notes',
        'registered_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'program_price' => 'decimal:2',
        'commission_percentage' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'registered_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the affiliate that owns the referral.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get the program that the referral belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Scope a query to only include confirmed referrals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Get the formatted commission amount.
     *
     * @return string
     */
    public function getFormattedCommissionAmountAttribute(): string
    {
        return 'Rp ' . number_format($this->commission_amount, 0, ',', '.');
    }

    /**
     * Get the formatted program price.
     *
     * @return string
     */
    public function getFormattedProgramPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->program_price, 0, ',', '.');
    }
}