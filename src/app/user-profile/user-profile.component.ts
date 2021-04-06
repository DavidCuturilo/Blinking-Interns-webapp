import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HelperMethodService } from '../services/helper-method.service';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Intern } from '../shared/models/intern.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [HelperMethodService,AuthInterceptorService]
})
export class UserProfileComponent implements OnInit {
  activeFilters: string[];

  userType: string;

  intern:Intern;
  assignments;

  load: boolean =  false;

  edit = false;
  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService) { }

  // public modalData: Intern;

  ngOnInit(): void {
    if (this.helperMethodService.getDataFromAccesToken().type === 'intern'){
     let {email} = this.helperMethodService.getDataFromAccesToken();
     this.intern = {email,full_name: ''};
    } else {
      this.intern = JSON.parse(localStorage.getItem("intern"));
    }
    this.dataFromServerService.getInternAssignments(this.intern).subscribe(response => {
      this.assignments=response.payload;
    }, error => console.log(error))
    this.activeFilters = ["Completed"];

    this.userType = this.helperMethodService.getDataFromAccesToken().type;
  }

  editStatus(){
    this.edit = !this.edit;
  }

  changePassword(intern: Intern) {
    this.dialog.open(ChangePasswordModalComponent,{data: {...intern}});
    // this.modalData=intern;
  }

  statusActive(filter: string,btn: HTMLButtonElement){

    this.load= !this.load;

    if(this.activeFilters.includes(filter)){
      btn.classList.remove('statusActive');
    }
    else{
      btn.classList.add('statusActive');
    }

    setTimeout(() => {
      this.load= !this.load;
      if(this.activeFilters.includes(filter)){
        this.activeFilters = this.activeFilters.filter(el => el !== filter);
      }
      else{
        this.activeFilters.push(filter);
      }
    },300);
  }

}
