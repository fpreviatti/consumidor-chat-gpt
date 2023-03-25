import { PerguntaObservableService } from './../../service/pergunta-observable.service';

import { OnInit } from '@angular/core';
import { NgModule, Component, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
})
export class LandPageComponent implements OnInit {
  
  texto: string;
  pergunta: string;
  resposta: any;

  message: any;

  results: any;
   apiURL: any;
  
  
  constructor( private router: Router, private perguntaObservableService: PerguntaObservableService) {
    
    this.texto = '';
    this.pergunta = '';
    this.resposta = '';
    
  }



  ngOnInit(): void {
    this.apiURL = 'https://api.openai.com/v1/chat/completions';
  }

  onButtonClick() {}

  onSubmit() {

    //this.perguntaObservableService.post

    this.perguntaObservableService.post(this.pergunta).subscribe(
      response =>  this.getResposta(response) ,
      error => console.log(error)
    );

    console.log('resposta chat gpt: ' +this.resposta);
    
  }

  getResposta(response: any){

    console.log(response);

    console.log(response.choices[0].message.content);

    this.resposta = (response.choices[0].message.content);

  }

}

        
      



