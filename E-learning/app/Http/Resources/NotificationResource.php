<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'from' => new UserResource(User::find($this->from)),
            'to' => new UserResource(User::find($this->to)),
            // 'from' => new UserResource($this->whenLoaded('from')),
            // 'to' => new UserResource($this->whenLoaded('to')),
            'content' => $this->content,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d à H:s')
        ];
    }
}
