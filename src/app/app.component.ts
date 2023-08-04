import { Component } from '@angular/core';
import { ApiServiceService} from './api-service.service';
// importing Model Class :

import { User_info } from './Model/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TDF2';
  public myForm:any=[];
  public show:boolean=false;
  public misMatchPassError:boolean=false;
  constructor(private aService:ApiServiceService){
    this.myForm=new User_info('','','','','');
  }
  password(){
      this.show=!this.show
  }
  submit(userData:any){
     console.log(userData.value);
     let formData={
      'name':userData.value.n1,
      'phone':userData.value.p1,
      'email':userData.value.e1,
      'pass1':userData.value.pas1
     }
     console.log('server data');
     console.log(formData);
     this.aService.submitForm(formData).subscribe((res:any)=>{
      console.log(res);
      alert(res.message);
      userData.reset();
     
     });
  
  }
  checkpass(pass1:any,pass2:any){
    if(pass1.value==pass2.value){
      this.misMatchPassError=false;
    }else{
      this.misMatchPassError=true;
    }
  }
}
