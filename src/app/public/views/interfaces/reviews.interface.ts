export interface Story_Reviews {
  id?: bigint;
  story_id: bigint;
  user_id: bigint;
  review: string;
  score: number;
  creation_date: Date;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}
export interface Data_Story_Reviews{
  reviews_id: number,
  story_id: number,
  user_id: number,
  name: string,
  lastname:string,
  creation_date: Date,
  score:number,
  review: string,
  cod_gen: string,
  user_created_id: number,
  created_at: Date,
  user_updated_id:number,
  updated_at: Date

}
