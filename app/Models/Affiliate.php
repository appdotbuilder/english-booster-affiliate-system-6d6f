<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Affiliate
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $bank_name
 * @property string|null $bank_account_number
 * @property string|null $bank_account_name
 * @property string $referral_code
 * @property string $status
 * @property float $total_commission
 * @property int $total_referrals
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Referral> $referrals
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CommissionPayment> $commissionPayments
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankAccountName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankAccountNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereReferralCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereTotalCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereTotalReferrals($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate approved()
 * @method static \Database\Factories\AffiliateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Affiliate extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'bank_name',
        'bank_account_number',
        'bank_account_name',
        'referral_code',
        'status',
        'total_commission',
        'total_referrals',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'total_commission' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the referrals for the affiliate.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }

    /**
     * Get the commission payments for the affiliate.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function commissionPayments(): HasMany
    {
        return $this->hasMany(CommissionPayment::class);
    }

    /**
     * Scope a query to only include approved affiliates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Generate a unique referral code for the affiliate.
     *
     * @return string
     */
    public static function generateReferralCode(): string
    {
        do {
            $code = 'EB' . strtoupper(bin2hex(random_bytes(4)));
        } while (self::where('referral_code', $code)->exists());

        return $code;
    }

    /**
     * Get the affiliate's referral URL.
     *
     * @return string
     */
    public function getReferralUrlAttribute(): string
    {
        return url('/register?ref=' . $this->referral_code);
    }
}