import { Injectable } from '@angular/core';
import {Feedback} from '../shared/feadback';
//server
import {Http,Response} from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
//rxjs
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import  {Observable} from 'rxjs/observable';

import { error } from 'util';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular : Restangular,private processHTTPMsgService :ProcessHTTPMsgService) { }

 addFeedBack(feedback:Feedback):Observable <any> {
   return this.restangular.all('feedback').post(feedback).catch(error => { return Observable.of(error); });
 }

}


