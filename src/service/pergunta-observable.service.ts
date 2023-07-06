import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PerguntaObservableService {
  URL = 'https://api.openai.com/v1/chat/completions';
  codigoErro = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ['Bearer teste'],
    }),
  };

  constructor(private httpClient: HttpClient) {}

  post(pergunta: string): Observable<string> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: pergunta }],
    };
    return this.httpClient
      .post<string>(this.URL, JSON.stringify(body), this.httpOptions)
      .pipe(retry(2), 
      catchError(this.erro));
  }

  erro(error: HttpErrorResponse) {
    
    alert("Erro código: " +error.status);
    return 'Ocorreu um erro';

  }
}
