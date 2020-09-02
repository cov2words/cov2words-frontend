import { FirebaseApp } from "@angular/fire";
export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    //private tokenExpirationDate: Date
  ) {}

  get token() {
    return this._token;
  }
}
