<?php

namespace App\Policies;

use TCG\Voyager\Policies\UserPolicy as UserPolicyBase;
use TCG\Voyager\Contracts\User;

class UserPolicy extends UserPolicyBase
{

    public function delete(User $user, $model)
    {

        // Has this already been deleted?
        $soft_delete = $model->deleted_at && in_array(\Illuminate\Database\Eloquent\SoftDeletes::class, class_uses_recursive($model));
        $another = $user->id != $model->id;

        return $another && (!$soft_delete && $this->checkPermission($user, $model, 'delete'));
    }
}
