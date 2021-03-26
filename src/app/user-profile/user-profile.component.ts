import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Task, TaskType } from '../shared/models/task.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  tasks: Task[] = [{title: 'Node js', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iusto non vero assumenda deserunt facere, esse quam autem, nihil tempora repudiandae? Ut quasi incidunt quas pariatur, labore consequuntur sapiente optio est totam iure magnam fugit commodi. Similique iste itaque totam?', status: false, type: TaskType.BACK_END, progress: 30},
                  //  {title: 'Angular App', text: 'vise informacija', status: false, type: TaskType.FRONT_END, progress: 15},
                  //  {title: 'Full service', text: 'vise informacija', status: true, type: TaskType.FULL_STACK, progress: 60},
                  ];


  constructor(public dialog: MatDialog) { }

  public modalData: Task;

  ngOnInit(): void {
  }

  getImageUrl(taskType: TaskType){
    let imageUrl = '../../assets/pictures/';
    switch(taskType){
      case TaskType.BACK_END: imageUrl += 'back.jpg'
      break;
      case TaskType.FRONT_END: imageUrl += 'front.jpeg'
      break;
      case TaskType.FULL_STACK: imageUrl += 'full.jpeg'
      break;

      default: imageUrl += 'Angular.png';
    }
    return imageUrl;
  }

  changePassword(task: Task) {
    this.dialog.open(ChangePasswordModalComponent,{data: {...task}});
    this.modalData=task;
  }

}
