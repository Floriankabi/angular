import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import  {Observable} from 'rxjs/observable';

import {Http,Response} from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { observable } from 'rxjs';
@Injectable()
export class PromotionService {

  constructor(private restangular : Restangular,private processHTTPMsgService :ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured:true}).map(Promotion => Promotion[0]);
  }
}
