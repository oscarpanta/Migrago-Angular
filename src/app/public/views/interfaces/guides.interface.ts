export interface Guides {
  id?: bigint;
  user_id : bigint;
  country_id: bigint;
  city_id: bigint;
  rating: number;
  status: boolean;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}
