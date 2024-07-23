

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ApiServiceService } from '../api-service.service';

@Injectable()
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private apiService: ApiServiceService
  ) {}
 downloadPdf(id: any): Observable<Blob> {
    return this.apiService.invoiceslip(id).pipe(
      switchMap((data: any) => {
        return this.http.get(`/api/download-pdf`, {
          responseType: 'blob',
          params: id, // Pass your invoice slip parameters here
        });
      })
    );
  }
}
