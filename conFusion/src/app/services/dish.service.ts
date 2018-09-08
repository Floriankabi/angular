import { Injectable } from '@angular/core';
import {Dish } from '../shared/dish';
import {Http,Response} from '@angular/http';
import  {Observable} from 'rxjs/observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { error } from 'util';
//import { resolve } from 'path';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular : Restangular,private processHTTPMsgService :ProcessHTTPMsgService) { }

getDishes():Observable<Dish[]> {
return this.restangular.all('dishes').getList();
//return this.http.get(baseURL+'dishes').map(res=>{return this.processHTTPMsgService.extractDate(res)}).catch(error =>{return this.processHTTPMsgService.handleError(error)});old
}

getDish(id:number):Observable<Dish>{
  return  this.restangular.one('dishes',id).get();
 // return this.http.get(baseURL+'dishes/'+id).map(res=>{return this.processHTTPMsgService.extractDate(res)}).catch(error =>{return this.processHTTPMsgService.handleError(error)});
}
postDish(dish:Dish):void {
  this.restangular.all('dishes').post({dish});
}
getFeaturedDish():Observable<Dish>{
  return this.restangular.all('dishes').getList({featured:true}).map(dishes => dishes[0]);

//  return this.http.get(baseURL+'dishes?featured=ture').map(res => {return this.processHTTPMsgService.extractDate(res)[0];}).catch(error =>{return this.processHTTPMsgService.handleError(error)});
}
getDishIds(): Observable<number[]>{
  return this.getDishes().map(dishes => { return dishes.map(dish => dish.id)})
  .catch(error => { return Observable.of(error); });
}

}
