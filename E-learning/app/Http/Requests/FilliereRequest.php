<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class FilliereRequest extends FormRequest
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
            'name' => 'required|min:4',
            'degree' => 'required|in:annee_1,annee_2,licence,master_1,master_2',
            // 'slug' => 'nullable',
            'courses' => 'required|exists:courses,id',
            'students' => 'nullable|exists:users,id',
            // 'instructors' => 'nullable|exists:users,id',
            
        ];
    }
}
