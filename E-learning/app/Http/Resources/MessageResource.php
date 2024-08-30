<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'object' => $this->object,
            'content' => $this->content,
            'sent_to' => new UserResource($this->receiver),
            'sent_by' => new UserResource($this->sender),
            'status' => $this->status,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d à H:s')
        ];
    }
}
