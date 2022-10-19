import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user$=this.authService.currentUser$;
  @ViewChild('fileSelect') myInputVariable?: ElementRef;
  formfile:any;
  file:any;
  filename:any;
  format:any;
  showLoader:boolean=false;
  constructor(
    private snack:MatSnackBar,
    private http: HttpClient,
    private router:Router,
    private authService: AuthenticationService
  ){}
  

  ngOnInit(): void {
  }
  onFileSelect(event:any){
    try{
      this.file=event.target.files[0];
      if(this.file){
        this.filename=this.file.name;
        this.format=this.filename.split('.');
        if(this.format[1]!='csv'){
          this.snack.open("Please select only CSV file", "Close", { duration: 2000 });
          this.deleteFile();
        }else{
          this.formfile= new FormData();
          this.formfile.append('file',this.file);
        }
      }
    }catch(error){
      this.deleteFile();
      console.log('no file selected');
    }
  }
  fileUpload(){
    if(this.file){
      this.http.post("http://localhost:5000/api/file_upload",this.formfile).subscribe((Response)=>{
        
        this.showLoader = false;
        this.snack.open("File successfully uploaded","Ok", { duration: 5000 });
        this.router.navigate(['/output'])
        
      },
      
       (error)=>{
        this.showLoader = false;

        this.snack.open(error.message,"close",{duration:5000});
       });
       
    }else{
      this.snack.open("Please select the file", "Ok", { duration: 3000 });
    }
  }deleteFile(){

    this.file=null;
    this.format=null;
    this.filename=null;
    this.formfile.delete('file');

  }

}
