<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CommissionPayment
 *
 * @property int $id
 * @property int $affiliate_id
 * @property float $amount
 * @property string $status
 * @property string $payment_method
 * @property string|null $payment_details
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property int|null $paid_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Affiliate $affiliate
 * @property-read \App\Models\User|null $paidBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment query()
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereAffiliateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment wherePaidAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment wherePaidBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment wherePaymentDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommissionPayment paid()
 * @method static \Database\Factories\CommissionPaymentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CommissionPayment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'affiliate_id',
        'amount',
        'status',
        'payment_method',
        'payment_details',
        'notes',
        'paid_at',
        'paid_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the affiliate that owns the commission payment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get the user who made the payment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function paidBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'paid_by');
    }

    /**
     * Scope a query to only include paid commission payments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Get the formatted amount.
     *
     * @return string
     */
    public function getFormattedAmountAttribute(): string
    {
        return 'Rp ' . number_format($this->amount, 0, ',', '.');
    }
}