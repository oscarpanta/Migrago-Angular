export interface WayMigration {
  id?:               bigint;
 name_way_migration:string;
 status:boolean;
  cod_gen:string;
  user_created_id:bigint;
  created_at:Date;
  user_updated_id:bigint;
  updated_at:Date;

}

export interface DetalleModoHistoria {
  mode_type_migration_description: string;
  amount:number;
  cod_gen:string;
  user_created_id:bigint;
  created_at:Date;
  user_updated_id:bigint;
  updated_at:Date;

}
