import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { ContactPayload } from '../models/portfolio.models';
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  send(payload: ContactPayload): Observable<void> {
    return this.http.post<void>('/api/contact', payload).pipe(
      timeout(10_000),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
    );
  }
}
