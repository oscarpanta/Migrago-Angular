export interface Stories {
  id?: bigint;
  guide_id: bigint;
  country_id: bigint;
  city_id: bigint;
  migration_mode_id: bigint;
  way_migration_id: bigint
  title: string;
  arrival_date: Date;
  story_text: string;
  rating: number;
  photo_story: string;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
  status: string
}

export interface ResponseStories {
  linksFirst: string;
  linksNext: null;
  linksLast: string;
  linksPrevious: null;
  totalPages: string;
  totalElements: string;
  data: DataStories[];
}

export interface DataStories {
  storie_id: string;
  title: string;
  guide_id: string;
  name: string;
  lastname: string;
  nationality_id: string;
  nationality_name: string;
  flag_img: string;
  photo_story: string;
  contry_id: string;
  country_name: string;
  city_id: string;
  city_name: string;
  way_migration_id: string;
  name_way_migration: string;
  status: string;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}

export interface DataStoriesDetalle {
  storie_id: string;
  title: string;
  guide_id: string;
  name: string;
  lastname: string;
  nationality_id: string;
  nationality_name: string;
  flag_img: string;
  photo_story: string;
  contry_id: string;
  country_name: string;
  city_id: string;
  city_name: string;
  way_migration_id: string;
  name_way_migration: string;
  arrival_date:string;
  migration_mode_id:string;
  description_mode:string;
  story_text:string;
  status: string;
  cod_gen: string;
  user_created_id: string;
  created_at: string;
  user_updated_id: string;
  updated_at: string;
}

export interface StoriasImages {
  id: string;
  title: string;
  guide_id: string;
  name: string;
  lastname: string;
  nationality_id: string;
  nationality_name: string;
  flag_img: string;
  photo_story: string;
  contry_id: string;
  country_name: string;
  city_id: string;
  city_name: string;
  way_migration_id: string;
  name_way_migration: string;
  status: string;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}

export interface ResponseStoriesDetalle {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: DataStoriesDetalle[]

}
export interface StoriesImages {
  id: string;
  story_id:string;
  imagen_story:string;
  status: string;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}




