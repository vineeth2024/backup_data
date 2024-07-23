// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, ObservedValueOf } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http: HttpClient) { }

//   // getProduct(): Observable<any> {
//   //   return this.http.get<any>("https://fakestoreapi.com/products");
//   // }

//   // getProductById(id: number): Observable<any> {
//   //   return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
//   // }

//   getProduct(): Observable<any> {
//     return this.http.get<any>("http://localhost:3001/products");
//   }

//   getProductById(id: number): Observable<any> {
//     return this.http.get<any>(`http://localhost:3001/products/${id}`);
//   }

//   // getCategories(): Observable<any> {
//   //   return this.http.get<any>("http://localhost:3000/categories");
//   // }

//   getCategories(): Observable<any>{
//     return this.http.get<any>("http://localhost:3001/categories");
//   }

//   getCategoriesById(id: number):Observable<any>{
//     return this.http.get<any>(`http://localhost:3001/categories/${id}`)
//   }

//   getSubcategories():Observable<any>{
//     return this.http.get<any>("http://localhost:3001/subcategories");
//   }

//   getSubcategoriesById(id: number):Observable<any>{
//     return this.http.get<any>("http://localhost:3001/subcategories/${id}")
//   }

//   getSubsubcategories():Observable<any>{
//     return this.http.get<any>("http://localhost:3001/subsubcategories");
//   }

//   getSubsubcategoriesById(id: number): Observable<any> {
//     return this.http.get<any>(`http://localhost:3001/subsubcategories/${id}`);
//   }
  
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProduct(): Observable<any> {
    return this.http.get<any>(`http://localhost:3003/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3003/products/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(`http://localhost:3003/categories`);
  }

  getCategoriesById(id: number):Observable<any>{
    return this.http.get<any>(`http://localhost:3003/categories/${id}`)
  }

  getSubcategories():Observable<any>{
    return this.http.get<any>(`http://localhost:3003/subcategories`);
  }

  getSubcategoriesById(id: number):Observable<any>{
    return this.http.get<any>(`http://localhost:3003/subcategories/${id}`)
  }

  getSubsubcategories():Observable<any>{
    return this.http.get<any>(`http://localhost:3003/subsubcategories`);
  }

  getSubsubcategoriesById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3003/subsubcategories/${id}`);
  }
}

