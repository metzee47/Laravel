<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssessmentResource extends JsonResource
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
            'order' => $this->order,
            'duration' => $this->duration,
            'course_id' => new CourseResource($this->whenLoaded('course')),
            'content' => $this->content,
            'limit_date' => (new Carbon($this->limit_date))->format('Y-m-d à H:s'),
            'assessment_date' => (new Carbon($this->assessment_date))->format('Y-m-d à H:s')
        ];
    }
}
