<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReferralRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'affiliate_id' => 'required|exists:affiliates,id',
            'program_id' => 'required|exists:programs,id',
            'student_name' => 'required|string|max:255',
            'student_email' => 'required|email|max:255',
            'student_phone' => 'required|string|max:20',
            'program_price' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'affiliate_id.required' => 'Afiliasi wajib dipilih.',
            'affiliate_id.exists' => 'Afiliasi tidak valid.',
            'program_id.required' => 'Program wajib dipilih.',
            'program_id.exists' => 'Program tidak valid.',
            'student_name.required' => 'Nama siswa wajib diisi.',
            'student_email.required' => 'Email siswa wajib diisi.',
            'student_email.email' => 'Format email siswa tidak valid.',
            'student_phone.required' => 'Nomor telepon siswa wajib diisi.',
            'program_price.required' => 'Harga program wajib diisi.',
            'program_price.numeric' => 'Harga program harus berupa angka.',
            'program_price.min' => 'Harga program tidak boleh kurang dari 0.',
        ];
    }
}