import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  private server:string=" http://192.168.1.203:6060/api/";
  

  constructor(private http:HttpClient){

  }
   private searchQuerySource = new BehaviorSubject<string>(''); // default empty
  currentSearch = this.searchQuerySource.asObservable();

  updateSearch(query: string) {
    this.searchQuerySource.next(query);
  }
   getCurrentSearch(): string {
    return this.searchQuerySource.getValue();
  }
  getItem(id:number):Observable<any>{

       const body = {
      limit: 10,
      page: 1
    };

    return this.http.post(`${this.server}items/geitems/ItemCategory/${id}/1/0`,body) as Observable<any>;
  
  }
 
  getLatestMenItems(): Observable<any> {
    const url = `${this.server}items/getallrecomended/0`;
    return this.http.get<any>(url)
  }
  getAllItems(): Observable<any> {
    const url = `${this.server}items/getLatestItems/`;
    return this.http.get<any>(url);
  }
  getItemsBySearchQuery(query: string): Observable<any> {
    const url = `${this.server}items/getItemSuggestions/${query}/1/30/0/0/0/-1`;
    return this.http.get<any>(url);
  }
}
