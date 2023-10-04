
// export interface LoginUsuario{
//   username:string;
//   password:string
// }

export interface Usuario{
  id: number,
  dni: string,
  name: string,
  lastname: string,
  username: string,
  //password:string,
  sex: string,
  photo: string,
  enabled: boolean,
  first_session: boolean,
  cod_gen:string;
  user_created_id:number;
  created_at:Date;
  user_updated_id:number;
  updated_at:Date;
  phone:string;
  birth_date:Date

}
export interface Roles{
  id:number,
  role_name:string
}
export interface AuthResponse{
  access_token:string;
  token_type:string;
  expires_in:number;
  usuario: Usuario[];
  roles: Roles[]
}
export interface UsuarioResponse{
  id: number,
  dni: string,
  name: string,
  lastname: string,
  username: string,
  sex: string,
  photo: string,
  status:true
}
