import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from './../../service/apis.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  public fav:any;
  constructor(private valor:LoginService,private api:ApisService) {
    
   }

  getValor(){
    return this.valor.getUser();
  }

  getFav(){
    let user_id=this.valor.getUser()[0].user_id 
    console.log(JSON.stringify(this.valor.userId) )
    return this.api.getFavorites(user_id).subscribe((data)=>{
      this.fav=data;
    }) 
  }
  delFav(favId,index){
    return this.api.deleteFavorites(favId).subscribe((data)=>{
      console.log(data)
      this.fav.splice(index,1)
    })
  }

  ngOnInit():any {
    this.getFav();
  }

}
