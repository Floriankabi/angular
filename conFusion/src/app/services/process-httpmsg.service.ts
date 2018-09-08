import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractDate(res: Response){
    let body  =res.json();

    return body || {};
  }
public handleError(error:Response | any )
{
let errMsg : string
if (error instanceof Response){
  const body = error.json() || '';
  const err = body.error || JSON.stringify(body);
  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
}else
{
  errMsg = error.message ? error.message : error.toString();
}
return  Observable.throw(errMsg);
}


}
