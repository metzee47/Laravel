<?php

namespace App\Http\Resources;

use App\Models\Lesson;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'duration' => ($this->duration),
            'description' => ($this->description),
            'teached_by' => new UserResource($this->professeur),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'lessons' => LessonResource::collection($this->whenLoaded('lessons')),
            'assessments' => AssessmentResource::collection($this->whenLoaded('assessments')),
        ];
    }
}
