import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { AddScategorieComponent } from './scategorie/add-scategorie/add-scategorie.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';
import{ BrowserAnimationsModule} from'@angular/platform-browser/animations';
import{MatSliderModule}from'@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DatePipe } from '@angular/common';
const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];
const appRoutes:Routes=[

  {path:'',redirectTo:'fournisseurs',pathMatch:'full'},
  {path:'clients',component: ListClientComponent},
  {path:'client',component: AddClientComponent},
  {path:'categories',component: ListCategorieComponent},
  {path:'categorie',component: AddCategorieComponent},
  {path:'scategories',component: ListScategorieComponent},
  {path:'scategorie',component: AddScategorieComponent},
  {path:'fournisseurs',component: ListFournisseurComponent},
  {path:'fournisseur',component: AddFournisseurComponent},
  {path:'articles',component: ListArticleComponent},
  {path:'article',component: AddArticleComponent},
  {path:'registre',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  
]
@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ListClientComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    ListScategorieComponent,
    AddScategorieComponent,
    AddFournisseurComponent,
    ListFournisseurComponent,
    ListArticleComponent,
    AddArticleComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
   // MatToolbarModule,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    



    
    

    
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
