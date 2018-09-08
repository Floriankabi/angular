import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';

import {  MaterialModule} from '@angular/material'
import { MdInputModule  } from '@angular/material';

import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import {HttpModule} from '@angular/http'
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import {DishService} from './services/dish.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component'

import {AppRoutingModule} from './app-routing/app-routing.module';
import {PromotionService} from './services/promotion.service';
import {LeaderService} from './services/leader.service';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component'
import {baseURL} from  './shared/baseurl';
import {ProcessHTTPMsgService} from './services/process-httpmsg.service';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './direvtives/highlight.directive';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    HighlightDirective,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,  
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
    MdInputModule,  
    HttpModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    {provide:'BaseURL',useValue:baseURL},
    ProcessHTTPMsgService
  ],// server provaider
  entryComponents:[
    LoginComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
 