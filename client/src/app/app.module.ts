import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';     
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BiopsyFormComponent } from './components/biopsy-form/biopsy-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BiopsyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,         
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
