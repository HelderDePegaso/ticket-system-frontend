import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class RootHttpClient {
    
    private http: HttpClient =  inject(HttpClient)

    private readonly baseApi: string = "http://localhost:3000"

    
    constructor() {

    }


    makePost(path: string, data: any) {
        const endPoint: string = this.resolveEndPoint(path)

        return this.http.post(endPoint, data)
    }


    private resolveEndPoint(path: string) {
        return this.baseApi +  path
    }
}