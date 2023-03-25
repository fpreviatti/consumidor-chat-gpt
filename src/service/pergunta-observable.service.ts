import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PerguntaObservableService {
  URL = 'https://api.openai.com/v1/chat/completions';

  httpOptions = {
    
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Authorization":["Bearer sk-seutokenaqui"] 
    
    }),
  };

  constructor(private httpClient: HttpClient) {}

  post(pergunta: string): Observable<string> {
    const body = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": pergunta}]
    };
    return this.httpClient
      .post<string>(this.URL, JSON.stringify(body), this.httpOptions)
      .pipe(retry(2), catchError(this.erro));
  }

  erro(){
    return 'Ocorreu um erro';
  }


}