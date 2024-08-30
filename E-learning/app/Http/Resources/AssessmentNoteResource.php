<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssessmentNoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'student' => new UserResource($this->whenLoaded('student')),
            'assessment' => new AssessmentResource($this->whenLoaded('assessment')),
            'course' => new CourseResource($this->whenLoaded('course')),
            'note' => $this->note,
            'status' => $this->status,
            'sent_time' => (new Carbon($this->sent_time))->format('Y-m-d à H:s')
        ];
    }
}
