import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RootHttpClient {
  
  private http = inject(HttpClient);
  private readonly baseApi = "http://localhost:3000";

  /** Garante que o caminho sempre comece com "/" */
  private resolveEndPoint(path: string): string {
    return path.startsWith("/")
      ? this.baseApi + path
      : this.baseApi + "/" + path;
  }

  makeGet<T>(path: string, params?: any): Observable<T> {
    return this.http.get<T>(this.resolveEndPoint(path), { params });
  }

  makePost<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.resolveEndPoint(path), data);
  }

  makePut<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(this.resolveEndPoint(path), data);
  }

  makeDelete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.resolveEndPoint(path));
  }
}
