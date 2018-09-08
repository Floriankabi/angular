import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import  {Observable} from 'rxjs/observable';
//server 
import {Http,Response} from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular : Restangular,private processHTTPMsgService :ProcessHTTPMsgService) { }

  getLeaders():Observable<Leader[]>{
    return this.restangular.all('leaders').getList();
  }
  getLeader(id:number): Observable<Leader>{
    return  this.restangular.one('leaders',id).get();
    
  }
  getFeaturedLeader():Observable<Leader>{
    return this.restangular.all('leaders').getList({featured:true}).map(Leader => Leader[0]);


  }
}
  