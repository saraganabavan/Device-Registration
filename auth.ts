import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
const apiUrl = "http://localhost:1337/35.225.176.255/";
// /Inv/User/Login/1.0.0
// /Inv/Init/AppRegistration/1.0.0
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(public http: Http) {
    console.log("Hello AuthProvider Provider");
  }
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http
        .post(apiUrl + type, JSON.parse(JSON.stringify(credentials)), {
          headers: headers
        })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
