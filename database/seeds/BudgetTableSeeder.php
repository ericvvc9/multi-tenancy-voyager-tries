<?php

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\DataRow;
use TCG\Voyager\Models\DataType;
use TCG\Voyager\Models\Menu;
use TCG\Voyager\Models\MenuItem;
use TCG\Voyager\Models\Permission;
use TCG\Voyager\Models\Post;

class BudgetTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     */
    public function run()
    {
      
        
        //Data Type
        $dataType = $this->dataType('slug', 'budget');
        if (!$dataType->exists) {
            $dataType->fill([
                'name'                  => 'budget',
                'display_name_singular' => __('seeders.data_types.budget.singular'),
                'display_name_plural'   => __('seeders.data_types.budget.plural'),
                'icon'                  => 'voyager-news',
                'model_name'            => 'App\\Budget',
                'policy_name'           => '',
                'controller'            => '',
                'generate_permissions'  => 1,
                'description'           => '',
                'server_side'           => 1
            ])->save();
        }
        //Menu Item
        $menu = Menu::where('name', 'admin')->firstOrFail();
        $menuItem = MenuItem::firstOrNew([
            'menu_id' => $menu->id,
            'title'   => __('seeders.menu_items.budget'),
            'url'     => '',
            'route'   => 'voyager.budget.index',
        ]);
        if (!$menuItem->exists) {
            $menuItem->fill([
                'target'     => '_self',
                'icon_class' => 'voyager-categories',
                'color'      => null,
                'parent_id'  => null,
                'order'      => 8,
            ])->save();
        }
        
        
        //Data Rows
        $dataRow = $this->dataRow($dataType, 'id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => __('seeders.data_rows.id'),
                'required'     => 1,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 1,
            ])->save();
        }


        $dataRow = $this->dataRow($dataType, 'code_budget');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.code_budget'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'total');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.total'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'balance');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.balance'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'partial_payment');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.partial_payment'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'clinic_history');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => __('seeders.data_rows.clinic_history'),
                'required'     => 1,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'budget_belonsto_clinic_history_relationship');
        if (!$dataRow->exists) {
            $dataRow->fill([
              'type'         => 'relationship',
              'display_name' => __('seeders.data_rows.clinic_history'),
              'required'     => 0,
              'browse'       => 1,
              'read'         => 1,
              'edit'         => 1,
              'add'          => 1,
              'delete'       => 1,
              'details'      => [
                  'model'       => 'App\\ClinicHistories',
                  'table'       => 'clinic_history',
                  'type'        => 'belongsTo',
                  'column'      => 'clinic_history',
                  'key'         => 'id',
                  'label'       => 'name',
                  'pivot_table' => 'clinic_history',
                  'pivot'       => 0,
              ],
              'order'        => 10,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'agreement');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => __('seeders.data_rows.agreement'),
                'required'     => 1,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'budget_belonsto_agreement_relationship');
        if (!$dataRow->exists) {
            $dataRow->fill([
              'type'         => 'relationship',
              'display_name' => __('seeders.data_rows.agreement'),
              'required'     => 0,
              'browse'       => 1,
              'read'         => 1,
              'edit'         => 1,
              'add'          => 1,
              'delete'       => 1,
              'details'      => [
                  'model'       => 'App\\Agreements',
                  'table'       => 'agreements',
                  'type'        => 'belongsTo',
                  'column'      => 'agreements',
                  'key'         => 'id',
                  'label'       => 'name',
                  'pivot_table' => 'agreements',
                  'pivot'       => 0,
              ],
              'order'        => 10,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'created_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('voyager::seeders.data_rows.created_at'),
                'required'     => 0,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order' => 5,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'updated_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('voyager::seeders.data_rows.updated_at'),
                'required'     => 0,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order' => 5,
            ])->save();
        }
        //Permissions
        Permission::generateFor('budget');
    }

    /**
     * [post description].
     *
     * @param [type] $slug [description]
     *
     * @return [type] [description]
     */
    protected function findPost($slug)
    {
        return Post::firstOrNew(['slug' => $slug]);
    }

    /**
     * [dataRow description].
     *
     * @param [type] $type  [description]
     * @param [type] $field [description]
     *
     * @return [type] [description]
     */
    protected function dataRow($type, $field)
    {
        return DataRow::firstOrNew([
                'data_type_id' => $type->id,
                'field'        => $field,
            ]);
    }

    /**
     * [dataType description].
     *
     * @param [type] $field [description]
     * @param [type] $for   [description]
     *
     * @return [type] [description]
     */
    protected function dataType($field, $for)
    {
        return DataType::firstOrNew([$field => $for]);
    }
}
