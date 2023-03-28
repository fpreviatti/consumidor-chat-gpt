import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DescricaoImagemObservableService {
  URL = 'https://api.openai.com/v1/images/generations';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ['Bearer seutoken'],
    }),
  };

  constructor(private httpClient: HttpClient) {}

  post(descricao: string): Observable<string> {
    const body = {
      "prompt": descricao,
      "n": 1,
      "size": "1024x1024"
    };
    return this.httpClient
      .post<string>(this.URL, JSON.stringify(body), this.httpOptions)
      .pipe(retry(2), catchError(this.erro));
  }

  erro() {
    return 'Ocorreu um erro';
  }
}
