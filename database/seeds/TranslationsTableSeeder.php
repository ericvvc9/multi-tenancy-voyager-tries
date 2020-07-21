<?php

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Category;
use TCG\Voyager\Models\DataType;
use TCG\Voyager\Models\MenuItem;
use TCG\Voyager\Models\Page;
use TCG\Voyager\Models\Translation;

class TranslationsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        $this->dataTypesTranslations();
        $this->categoriesTranslations();
        $this->pagesTranslations();
        $this->menusTranslations();
    }

    /**
     * Auto generate Categories Translations.
     *
     * @return void
     */
    private function categoriesTranslations()
    {
        // Adding translations for 'categories'
        //
        $cat = Category::where('slug', 'category-1')->firstOrFail();
        if ($cat->exists) {
            $this->trans('es', $this->arr(['categories', 'slug'], $cat->id), 'categoria-1');
            $this->trans('es', $this->arr(['categories', 'name'], $cat->id), 'Categoria 1');
        }
        $cat = Category::where('slug', 'category-2')->firstOrFail();
        if ($cat->exists) {
            $this->trans('es', $this->arr(['categories', 'slug'], $cat->id), 'categoria-2');
            $this->trans('es', $this->arr(['categories', 'name'], $cat->id), 'Categoria 2');
        }
    }

    /**
     * Auto generate DataTypes Translations.
     *
     * @return void
     */
    private function dataTypesTranslations()
    {
        // Adding translations for 'display_name_singular'
        //
        $_fld = 'display_name_singular';
        $_tpl = ['data_types', $_fld];
        $_fld2 = 'display_name_plural';
        $_tpl2 = ['data_types', $_fld];
        $dtp = DataType::where("name", 'posts')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Post');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Posts');
        }
        $dtp = DataType::where("name", 'pages')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Página');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Páginas');
        }
        $dtp = DataType::where("name", 'users')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Usuario');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Usuarios');
        }
        $dtp = DataType::where("name", 'categories')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Categoria');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Categorias');
        }
        $dtp = DataType::where("name", 'menus')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Menu');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Menus');
        }
        $dtp = DataType::where("name", 'roles')->firstOrFail();
        if ($dtp->exists) {
            $this->trans('es', $this->arr($_tpl, $dtp->id), 'Rol');
            $this->trans('es', $this->arr($_tpl2, $dtp->id), 'Roles');
        }
    }

    /**
     * Auto generate Pages Translations.
     *
     * @return void
     */
    private function pagesTranslations()
    {
        $page = Page::where('slug', 'hello-world')->firstOrFail();
        if ($page->exists) {
            $_arr = $this->arr(['pages', 'title'], $page->id);
            $this->trans('es', $_arr, 'Olá Mundo');
            /**
             * For configuring additional languages use it e.g.
             *
             * ```
             *   $this->trans('es', $_arr, 'hola-mundo');
             *   $this->trans('de', $_arr, 'hallo-welt');
             * ```
             */
            $_arr = $this->arr(['pages', 'slug'], $page->id);
            $this->trans('es', $_arr, 'ola-mundo');

            $_arr = $this->arr(['pages', 'body'], $page->id);
            $this->trans('es', $_arr, '<p>Olá Mundo. Scallywag grog swab Cat o\'nine tails scuttle rigging hardtack cable nipper Yellow Jack. Handsomely spirits knave lad killick landlubber or just lubber deadlights chantey pinnace crack Jennys tea cup. Provost long clothes black spot Yellow Jack bilged on her anchor league lateen sail case shot lee tackle.</p>'
                                        ."\r\n".'<p>Ballast spirits fluke topmast me quarterdeck schooner landlubber or just lubber gabion belaying pin. Pinnace stern galleon starboard warp carouser to go on account dance the hempen jig jolly boat measured fer yer chains. Man-of-war fire in the hole nipperkin handsomely doubloon barkadeer Brethren of the Coast gibbet driver squiffy.</p>');
        }
    }

    /**
     * Auto generate Menus Translations.
     *
     * @return void
     */
    private function menusTranslations()
    {
        $_tpl = ['menu_items', 'title'];

        $_item = $this->findMenuItem('voyager.dashboard');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Panel de Control');
        }

        $_item = $this->findMenuItem('voyager.media.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Media');
        }

        $_item = $this->findMenuItem('voyager.posts.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Publicaciones');
        }

        $_item = $this->findMenuItem('voyager.users.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Utilizadores');
        }

        $_item = $this->findMenuItem('voyager.categories.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Categorias');
        }

        $_item = $this->findMenuItem('voyager.pages.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Páginas');
        }

        $_item = $this->findMenuItem('voyager.roles.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Roles');
        }

        $_item = $this->findMenuItem(__('voyager::seeders.menu_items.tools'),"title");
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Herramientas');
        }

        $_item = $this->findMenuItem('voyager.menus.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Menus');
        }

        $_item = $this->findMenuItem('voyager.database.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Base de datos');
        }

        $_item = $this->findMenuItem('voyager.settings.index');
        if ($_item->exists) {
            $this->trans('es', $this->arr($_tpl, $_item->id), 'Configuraciones');
        }
    }

    private function findMenuItem($title,$col = 'route')
    {
        return MenuItem::where($col, $title)->firstOrFail();
    }

    private function arr($par, $id)
    {
        return [
            'table_name'  => $par[0],
            'column_name' => $par[1],
            'foreign_key' => $id,
        ];
    }

    private function trans($lang, $keys, $value)
    {
        $_t = Translation::firstOrNew(array_merge($keys, [
            'locale' => $lang,
        ]));

        if (!$_t->exists) {
            $_t->fill(array_merge(
                $keys,
                ['value' => $value]
            ))->save();
        }
    }
}
