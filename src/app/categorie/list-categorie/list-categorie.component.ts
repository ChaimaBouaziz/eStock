import { Component, Inject, OnInit } from '@angular/core';
import {Validator,ReactiveFormsModule,FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { NgModule } from "@angular/core";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})

export class  ListCategorieComponent implements OnInit{
  categorie : Categorie;
  control: FormControl=new FormControl('');
  constructor(public crudApi: CategorieService,public toastr: ToastrService,private router :Router,
    public fb :FormBuilder, private matDialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,){}
  ngOnInit() {
    this.getData();
  }
  addCategorie(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCategorieComponent,dialogConfig);

  }
  getData(){
    this.crudApi.getAll().subscribe(
Response => {this.crudApi.listData=Response;}
    );
  }
  removeData(id:number){
    if(window.confirm("are you sure you want to delete this categorie")){
      this.crudApi.deleteData(id).subscribe(
        data =>{
          console.log(data);
          this.toastr.success('Data successfuly deleted');
          this.getData();
        },
        error =>console.log(error)
      );
    }
  }
  selectData(item :Categorie){
    this.crudApi.choixmenu="M";
    this.crudApi.dataForm= this.fb.group(Object.assign({},item));
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";

    this.matDialog.open(AddCategorieComponent,dialogConfig);
  }
  
}

