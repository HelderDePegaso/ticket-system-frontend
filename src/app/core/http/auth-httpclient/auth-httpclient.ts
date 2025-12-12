import { HttpClient } from "@angular/common/http";

import { RootHttpClient } from '../httpClient-instance'


import { inject, Injectable } from "@angular/core";
import { LoginData } from "../../interface/login-data";
import { firstValueFrom } from "rxjs";
import { ResponseObject } from "../../type/response.type";

@Injectable({
    providedIn: "root"
})
export class AuthHttpClient {

    private http: RootHttpClient = inject(RootHttpClient);

    signup(signupData: any) {
        return firstValueFrom(this.http.makePost<ResponseObject>("/signup", signupData));
    }
    /**
    * Realiza login.
    * O loginData já foi validado pelos Angular Forms.
    */
    login(loginData: LoginData) {
        return firstValueFrom(this.http.makePost<ResponseObject>("/login", loginData));
    }

    signout() {
        return firstValueFrom(this.http.makeDelete<ResponseObject>("/logout"));
    }


}