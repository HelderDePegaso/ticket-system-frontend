import { inject, Inject , Injectable } from "@angular/core";
import { LoginData } from "../../interface/login-data";
import { ResponseObject } from "../../type/response.type";
import { RootHttpClient } from "../httpClient-instance";
import { firstValueFrom } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class UserHttpclient {

    private http: RootHttpClient = inject(RootHttpClient)

    profile() {
        return firstValueFrom(this.http.makeGet<ResponseObject>("/profile"));
    }

    updateProfile(data: any) {
        return firstValueFrom(this.http.makePut<ResponseObject>("/profile", data));
    }

    
}
