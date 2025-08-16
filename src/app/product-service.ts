import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  private server:string=" http://192.168.1.203:6060/api/";
  
  constructor(private http:HttpClient){

  }
  getItem(id:number):Observable<any>{

       const body = {
      limit: 10,
      page: 1
    };

    return this.http.post(`${this.server}items/geitems/ItemCategory/${id}/1/0`,body) as Observable<any>;
  
  }
 
  getLatestMenItems(limit = 8): Observable<any> {
    const url = `${this.server}/items/getLatestItems`;
    return this.http.get<any>(url)
  }
}
