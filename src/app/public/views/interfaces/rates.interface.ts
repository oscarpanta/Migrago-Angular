export interface Rates {
  id?: bigint;
  time_rate: bigint;
  price: bigint;
  coin: string;
  status: number;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}
