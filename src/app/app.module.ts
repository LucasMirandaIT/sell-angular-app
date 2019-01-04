import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportsMaterialModule } from './shared/imports-material/imports-material.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { AdmAreaComponent } from './pages/adm-area/adm-area.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import {NgxMaskModule} from 'ngx-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { AddBrandModal } from './modals/add-brand/add-brand.component';
import { CarsComponent } from './pages/cars/cars.component';
import { PartsComponent } from './pages/parts/parts.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoadingComponent,
    AdmAreaComponent,
    LoginComponent,
    RegisterComponent,
    ProfileConfigComponent,
    AddBrandModal,
    CarsComponent,
    PartsComponent,
    FlipCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ImportsMaterialModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    }),

    NgxMaskModule.forRoot(),
    ImageCropperModule,
    ClipboardModule,

    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddBrandModal
  ],
  providers: [
    HttpClientModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
