<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule as ValidationRule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
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
            'email' => ['required', 'email',ValidationRule::unique(User::class)->ignore($this->user()->id)],
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => 'required|in:admin,etudiant,professeur',
            'address' => 'nullable|min:3',
            'profil_image' => 'nullable|image|max:2000',
            'fillieres' => 'nullable|exists:fillieres,id'
        ];
    }
}
