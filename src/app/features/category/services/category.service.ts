import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getAllCategories():Observable<any>{
    return this.httpClient.get(environments.baseUrl+'categories')
  }
  getCategoryDetails(id:string|null){
    return this.httpClient.get(environments.baseUrl+`categories/+${id}`)
  }
}
