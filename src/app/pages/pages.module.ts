import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ConsultaComponent } from './consulta/consulta.component';
import { CreacionComponent } from './creacion/creacion.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FormatDatePipe } from '../pipes/format-date.pipe';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ConsultaComponent,
    CreacionComponent,
    PagesComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ConsultaComponent,
    CreacionComponent,
    PagesComponent,
    FormatDatePipe
  ],
  providers: []
})
export class PagesModule { }