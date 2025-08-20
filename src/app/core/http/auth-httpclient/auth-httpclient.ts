import { HttpClient } from "@angular/common/http";

import { RootHttpClient } from '../httpClient-instance'


import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
class AuthHttpClient {
    
    private http: RootHttpClient = inject(RootHttpClient);

    logar(loginData: LoginData) {
        
    }
}