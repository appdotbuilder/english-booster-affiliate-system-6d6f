<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $programs = [
            // Program Online
            [
                'name' => 'Kids Teen',
                'category' => 'online',
                'description' => 'Program bahasa Inggris online untuk anak dan remaja',
                'price' => 500000,
                'commission_percentage' => 15.00,
            ],
            [
                'name' => 'TOEFL Easy Peasy',
                'category' => 'online',
                'description' => 'Persiapan TOEFL online yang mudah dan efektif',
                'price' => 750000,
                'commission_percentage' => 20.00,
            ],
            [
                'name' => 'Private General English',
                'category' => 'online',
                'description' => 'Kelas privat bahasa Inggris umum secara online',
                'price' => 1200000,
                'commission_percentage' => 25.00,
            ],
            [
                'name' => 'Speaking Booster',
                'category' => 'online',
                'description' => 'Program untuk meningkatkan kemampuan berbicara bahasa Inggris',
                'price' => 400000,
                'commission_percentage' => 12.00,
            ],
            [
                'name' => 'Grammar Booster',
                'category' => 'online',
                'description' => 'Program untuk menguasai grammar bahasa Inggris',
                'price' => 350000,
                'commission_percentage' => 10.00,
            ],

            // Program Offline (Pare)
            [
                'name' => 'Paket 2 Minggu',
                'category' => 'offline_pare',
                'description' => 'Program intensif 2 minggu di Pare',
                'price' => 800000,
                'commission_percentage' => 15.00,
            ],
            [
                'name' => 'Paket 1 Bulan',
                'category' => 'offline_pare',
                'description' => 'Program intensif 1 bulan di Pare',
                'price' => 1500000,
                'commission_percentage' => 18.00,
            ],
            [
                'name' => 'Paket 2 Bulan',
                'category' => 'offline_pare',
                'description' => 'Program intensif 2 bulan di Pare',
                'price' => 2800000,
                'commission_percentage' => 20.00,
            ],
            [
                'name' => 'Paket 3 Bulan',
                'category' => 'offline_pare',
                'description' => 'Program intensif 3 bulan di Pare',
                'price' => 4000000,
                'commission_percentage' => 22.00,
            ],
            [
                'name' => 'TOEFL Offline',
                'category' => 'offline_pare',
                'description' => 'Persiapan TOEFL intensif di Pare',
                'price' => 2000000,
                'commission_percentage' => 25.00,
            ],
            [
                'name' => 'RPL (Recognition of Prior Learning)',
                'category' => 'offline_pare',
                'description' => 'Program RPL untuk pengakuan pembelajaran sebelumnya',
                'price' => 3500000,
                'commission_percentage' => 20.00,
            ],
            [
                'name' => 'Kapal Pesiar',
                'category' => 'offline_pare',
                'description' => 'Program persiapan kerja di kapal pesiar',
                'price' => 5000000,
                'commission_percentage' => 30.00,
            ],

            // Program Rombongan
            [
                'name' => 'English Trip',
                'category' => 'group',
                'description' => 'Program trip belajar bahasa Inggris berkelompok',
                'price' => 2500000,
                'commission_percentage' => 15.00,
            ],
            [
                'name' => 'Special English Day',
                'category' => 'group',
                'description' => 'Event khusus bahasa Inggris untuk grup',
                'price' => 1000000,
                'commission_percentage' => 12.00,
            ],
            [
                'name' => 'Tutor Visit',
                'category' => 'group',
                'description' => 'Kunjungan tutor ke lokasi grup',
                'price' => 1800000,
                'commission_percentage' => 18.00,
            ],

            // Program Cabang
            [
                'name' => 'Cilukba (Pre-school / TK)',
                'category' => 'branch',
                'description' => 'Program bahasa Inggris untuk anak prasekolah/TK',
                'price' => 300000,
                'commission_percentage' => 10.00,
            ],
            [
                'name' => 'Hompimpa (SD)',
                'category' => 'branch',
                'description' => 'Program bahasa Inggris untuk anak SD',
                'price' => 400000,
                'commission_percentage' => 12.00,
            ],
            [
                'name' => 'Hip Hip Hurray (SMP)',
                'category' => 'branch',
                'description' => 'Program bahasa Inggris untuk anak SMP',
                'price' => 500000,
                'commission_percentage' => 15.00,
            ],
            [
                'name' => 'Insight Out (SMA)',
                'category' => 'branch',
                'description' => 'Program bahasa Inggris untuk anak SMA',
                'price' => 600000,
                'commission_percentage' => 15.00,
            ],
        ];

        foreach ($programs as $program) {
            Program::create([
                'name' => $program['name'],
                'slug' => Str::slug($program['name']),
                'category' => $program['category'],
                'description' => $program['description'],
                'price' => $program['price'],
                'commission_percentage' => $program['commission_percentage'],
                'is_active' => true,
            ]);
        }
    }
}