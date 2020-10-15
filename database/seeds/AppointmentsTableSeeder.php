<?php

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\DataRow;
use TCG\Voyager\Models\DataType;
use TCG\Voyager\Models\Menu;
use TCG\Voyager\Models\MenuItem;
use TCG\Voyager\Models\Permission;
use TCG\Voyager\Models\Post;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     */
    public function run()
    {
        //Data Type
        $dataType = $this->dataType('slug', 'appointments');
        if (!$dataType->exists) {
            $dataType->fill([
                'name'                  => 'appointments',
                'display_name_singular' => __('seeders.data_types.appointments.singular'),
                'display_name_plural'   => __('seeders.data_types.appointments.plural'),
                'icon'                  => 'voyager-news',
                'model_name'            => 'App\\Appointment',
                'policy_name'           => '',
                'controller'            => '',
                'generate_permissions'  => 1,
                'description'           => '',
                'server_side'           => 0
            ])->save();
        }
        //Menu Item
        $menu = Menu::where('name', 'admin')->firstOrFail();
        $menuItem = MenuItem::firstOrNew([
            'menu_id' => $menu->id,
            'title'   => __('seeders.menu_items.appointments'),
            'url'     => '',
            'route'   => 'voyager.appointments.index',
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
        $categoryDataType = DataType::where('slug', 'appointments')->firstOrFail();
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

        $dataRow = $this->dataRow($dataType, 'start_date');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'date',
                'display_name' => __('seeders.data_rows.start_date'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'patient_id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.patient'),
                'required'     => 1,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'appointment_belonsto_patient_relationship');
        if (!$dataRow->exists) {
            $dataRow->fill([
              'type'         => 'relationship',
              'display_name' => __('seeders.data_rows.patient'),
              'required'     => 0,
              'browse'       => 1,
              'read'         => 1,
              'edit'         => 1,
              'add'          => 1,
              'delete'       => 1,
              'details'      => [
                  'model'       => 'App\\Patient',
                  'table'       => 'patients',
                  'type'        => 'belongsTo',
                  'column'      => 'patient_id',
                  'key'         => 'id',
                  'label'       => 'display_name',
                  'pivot_table' => 'patients',
                  'pivot'       => 0,
              ],
              'order'        => 10,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'consulting_room_id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.consulting_room_id'),
                'required'     => 1,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'appointment_belonsto_consulting_room_relationship');
        if (!$dataRow->exists) {
            $dataRow->fill([
              'type'         => 'relationship',
              'display_name' => __('seeders.data_rows.consulting_room'),
              'required'     => 0,
              'browse'       => 1,
              'read'         => 1,
              'edit'         => 1,
              'add'          => 1,
              'delete'       => 1,
              'details'      => [
                  'model'       => 'App\\ConsultingRoom',
                  'table'       => 'consulting_room',
                  'type'        => 'belongsTo',
                  'column'      => 'consulting_room_id',
                  'key'         => 'id',
                  'label'       => 'name',
                  'pivot_table' => 'consulting_room',
                  'pivot'       => 0,
              ],
              'order'        => 10,
            ])->save();
        }
        
        $dataRow = $this->dataRow($dataType, 'reason');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.reason'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }
        $dataRow = $this->dataRow($dataType, 'speciality');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => __('seeders.data_rows.speciality'),
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
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
        Permission::generateFor('appointments');
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
