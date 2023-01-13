import { Component, OnInit,Inject } from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { CategorieService} from '../../service/categorie.service';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Article} from '../../model/article';
import { Categorie} from '../../model/categorie';
import { Scategorie} from '../../model/scategorie';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  CategorieList: Categorie[];
  ScategorieList: any;
  scategorie : any={};
  wcode : string = '';

  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddArticleComponent>,
    
    ) { }
  ngOnInit() {
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
     this.scategorieService.getAll().subscribe(
      response =>{this.ScategorieList = response;}
     );

   }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        pa: [0, [Validators.required]],
        pv: [0, [Validators.required]],
        tva: [0, [Validators.required]],
        fodec: [0, [Validators.required]],
        code_categ: ['', [Validators.required]],
        code_scateg: ['', [Validators.required]],
        
      });
    }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
    this.updateData()
    }   
}
onSelectedCateg(id_cat:string){
  this.scategorieService.listScateg(id_cat).subscribe(
    response=>{
      this.ScategorieList=response;
    }
  )
}

onSelectedScateg(id_scateg: string)
{
 this.scategorieService.getData(id_scateg).subscribe(
    response =>{
    this.scategorie =response;
    this.wcode = (10000 + this.scategorie.rang).toString().substring(1);
    this.wcode = this.scategorie.id_categ+this.scategorie.code+this.wcode;
    this.crudApi.dataForm.controls['code'].setValue(this.wcode);

      }
   );  
} 

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe(data=>{

    this.scategorieService.updateRang(this.crudApi.dataForm.value.id_scat,this.crudApi.dataForm.value).subscribe(
      data=>{
        console.log("update rang")
      }
    )
    this.dialogRef.close();
this.crudApi.getAll().subscribe(
  Response=>{this.crudApi.listData=Response;}
);
    this.router.navigate(['/articles']); 
  });
 
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        Response=>{this.crudApi.listData=Response;}
      );
      this.router.navigate(['/articles']); 
    });
  }

  
}
