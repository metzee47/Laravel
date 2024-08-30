<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $image_path = $this->profil_image ? Storage::url($this->profil_image) : null;

        return [
            'id' => $this->id,
            'address' => $this->address,
            'profil_image' => $image_path,
            'role' => $this->role,
            'email' => $this->email,
            'name' => $this->name,
        ];
    }
}
