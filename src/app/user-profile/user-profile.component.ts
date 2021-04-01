import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HelperMethodService } from '../services/helper-method.service';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Task, TaskStatus, TaskType } from '../shared/models/task.model';
import { Intern } from '../shared/models/intern.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [HelperMethodService,AuthInterceptorService]
})
export class UserProfileComponent implements OnInit {
  tasks: Task[] = [{title: 'Node js', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iusto non vero assumenda deserunt facere, esse quam autem, nihil tempora repudiandae? Ut quasi incidunt quas pariatur, labore consequuntur sapiente optio est totam iure magnam fugit commodi. Similique iste itaque totam?', status: TaskStatus.COMPLETED, type: TaskType.BACK_END, progress: 30},
                   {title: 'Angular App', text: 'vise informacija', status: TaskStatus.ACTIVE, type: TaskType.FRONT_END, progress: 15},
                   {title: 'Full service', text: 'vise informacija', status: TaskStatus.OVERDUE, type: TaskType.FULL_STACK, progress: 60},
                  ];

  activeFilters: string[];

  intern:Intern;
  assignments;

  load: boolean =  false;

  edit = false;
  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService) { }

  public modalData: Task;

  ngOnInit(): void {
    this.intern = JSON.parse(localStorage.getItem("intern"));
    this.dataFromServerService.getInternAssignments(this.intern).subscribe(response => {
      this.assignments=response.payload;
    }, error => console.log(error))
    this.activeFilters = ["Completed"];
  }

  editStatus(){
    this.edit = !this.edit;
  }

  changePassword(task: Task) {
    this.dialog.open(ChangePasswordModalComponent,{data: {...task}});
    this.modalData=task;
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
