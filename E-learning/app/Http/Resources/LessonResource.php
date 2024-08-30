<?php

namespace App\Http\Resources;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $content = json_decode($this->content);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'course' => new CourseResource($this->whenLoaded('course'))
        ];
    }
}
