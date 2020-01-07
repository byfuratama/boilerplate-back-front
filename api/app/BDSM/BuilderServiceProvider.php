<?php

namespace App\BDSM;

use Exception;
use Illuminate\Database\Eloquent\Builder as EBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\ServiceProvider;
// use Illuminate\Http\Request;

class BuilderServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Builder::macro('joinModel', function ($fm, $as, $pk, $fk) {
            $ft = \DB::raw("({$fm->toSql()}) {$as}");
            $this->addBinding($fm->getBindings(),'join');

            return $this->join($ft,$pk,$fk);
        });

        Builder::macro('leftJoinModel', function ($fm, $as, $pk, $fk) {
            $ft = \DB::raw("({$fm->toSql()}) {$as}");
            $this->addBinding($fm->getBindings(),'join');

            return $this->leftJoin($ft,$pk,$fk);
        });

        Builder::macro('envelop', function ($as = 'tbl') {
            return \DB::table(\DB::raw("({$this->toSql()}) tbl"))->addBinding($this->getBindings());
        });

        Builder::macro('searchAllFields', function ($colFilter = '') {
            $filter = request('filter');
            // dump($colFilter);
            if ($colFilter !== '')
                $cfilt = $colFilter;
            else
                $cfilt = (array) json_decode(request('colFilter'));
            $query = $this;
            // dump($cfilt,$colFilter);
            if ($filter != null && $filter != '') {
                $query = $query->where(function($q) use ($filter,$cfilt) {
                    foreach ($cfilt as $key => $val) {
                        // dump($key, $val);
                        $fil = !is_numeric($key) ? $key : $val;
                        $q = $q->orWhere($fil,'LIKE', '%' . $filter . '%');
                    }
                });
            }
            if ($colFilter === '' && count($cfilt) > 0) {
                foreach ($cfilt as $key => $val) {
                    if ($val !== '')
                        $query = $query->where($key,'LIKE', '%' . $val . '%');
                }
                return $query;
            }
            return $query->select('*');
        });

        Builder::macro('searchAllFieldsOld', function () {
            $filter = request('filter');
            $query = $this;
            if ($filter != null && func_num_args() > 0) {
                $props = func_get_args();
                $query = $query->where(function($q) use ($props,$filter) {
                    foreach ($props as $prop) {
                        foreach ($prop['fields'] as $col) {
                            $q = $q->orWhere($prop['table'].'.'.$col,'LIKE', '%' . $filter . '%');
                        }
                    }
                });
                return $query->select('*');
            }
            return $query->select('*');
        });

        Builder::macro('searchFields', function () {
            $filter = request('colFilter');
            $query = $this;
            if ($filter != null && func_num_args() > 0) {
                $props = func_get_args();
                $query = $query->where(function($q) use ($props,$filter) {
                    foreach ($props as $prop) {
                        foreach ($filter as $col) {
                            $q = $q->where($prop['table'].'.'.$col,'LIKE', '%' . $filter[$col] . '%');
                        }
                    }
                });
                return $query->select('*');
            }
            return $query->select('*');
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
