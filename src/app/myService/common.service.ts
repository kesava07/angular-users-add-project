import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: Http) { }
  getName() {
    return "chenna kesava";
  }
  getData() {
    return this.http.get("https://jsonplaceholder.typicode.com/users")
      .map(res => res.json())
      .catch(err => err.json())
  }


}
