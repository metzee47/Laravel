<?php

namespace App\Http\Resources;

use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilliereResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd($this->courses()->get());
        return [
            'id' => $this->id,
            'name' => $this->name,
            'degree' => ($this->degree),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d à H:s'),
            'courses' => CourseResource::collection($this->whenLoaded('courses'))
        ];
    }
}
