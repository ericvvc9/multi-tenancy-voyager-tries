<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TCG\Voyager\Facades\Voyager;

class BudgetController extends BreadController
{
    // POST BR(E)AD
    public function update(Request $request, $id)
    {
        if($request->headers->get('accept') !== 'application/json, text/plain, */*'){
            return parent::relation($request);
        }

        $slug = $this->getSlug($request);

        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        // Check permission
        $this->authorize('edit', app($dataType->model_name));

        //Validate fields
        $val = $this->validateBread($request->all(), $dataType->editRows, $dataType->name, $id)->validate();

        $data = call_user_func([$dataType->model_name, 'findOrFail'], $id);
        $this->insertUpdateData($request, $slug, $dataType->editRows, $data);
        
        $data->budgetItems()->delete();
        $data->budgetItems()->createMany($request->input('budgetItems', []));

        return [
            'message'    => __('voyager::generic.successfully_added_new')." {$dataType->getTranslatedAttribute('display_name_singular')}",
            'alert-type' => 'success',
            'data' => $data
          ];
        return redirect()
            ->route("voyager.{$dataType->slug}.index")
            ->with([
                'message'    => __('voyager::generic.successfully_updated')." {$dataType->getTranslatedAttribute('display_name_singular')}",
                'alert-type' => 'success',
            ]);
    }

    // POST BRE(A)D
    public function store(Request $request)
    {
        if($request->headers->get('accept') !== 'application/json, text/plain, */*'){
            return parent::relation($request);
        }
        $slug = $this->getSlug($request);
        
        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();
        
        // Check permission
        $this->authorize('add', app($dataType->model_name));
        
        //Validate fields
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();
        
        $data = new $dataType->model_name();
        $this->insertUpdateData($request, $slug, $dataType->addRows, $data);
        /* $post->comments()->create([
          'message' => 'A new comment.',
      ]); */
        $data->budgetItems()->createMany($request->budgetItems);
        $data->budgetItems;
        //$request->budgetItems
        //$data->permissions()->sync($request->input('permissions', []));

        return [
          'message'    => __('voyager::generic.successfully_added_new')." {$dataType->getTranslatedAttribute('display_name_singular')}",
          'alert-type' => 'success',
          'data' => $data
        ];
    }
}
