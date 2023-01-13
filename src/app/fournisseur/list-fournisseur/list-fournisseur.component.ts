import { Component, OnInit,Inject } from '@angular/core';
import { FournisseurService} from '../../service/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur} from '../../model/fournisseur';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddFournisseurComponent } from '../../fournisseur/add-fournisseur/add-fournisseur.component';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent {
  listData : Fournisseur[];
  constructor(public crudApi: FournisseurService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddFournisseurComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.listData = response;}
     );
   
  }
  
  addfournisseur()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddFournisseurComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this fourniiseur ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddFournisseurComponent, dialogConfig);
  }
}