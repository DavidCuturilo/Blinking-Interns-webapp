import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HelperMethodService } from '../services/helper-method.service';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Task, TaskStatus, TaskType } from '../shared/models/task.model';

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
  load: boolean =  false;
                
  edit = false;
  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService) { }

  public modalData: Task;

  ngOnInit(): void {
    this.activeFilters = [];
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
    setTimeout(() => {
      this.load= !this.load;
      if(this.activeFilters.includes(filter)){
        btn.classList.remove('statusActive');
        this.activeFilters = this.activeFilters.filter(el => el !== filter);
      }
      else{
        btn.classList.add('statusActive');
        this.activeFilters.push(filter);
      }
    },500);
     
    
    
  
    
  }

}
