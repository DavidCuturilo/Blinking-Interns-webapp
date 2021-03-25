import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskInfoModalComponent } from '../shared/modals/task-info-modal/task-info-modal.component';
import { Task } from '../shared/models/task.model';

import { TaskType } from '../shared/models/task.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  tasks: Task[] = [{title: 'Node js', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iusto non vero assumenda deserunt facere, esse quam autem, nihil tempora repudiandae? Ut quasi incidunt quas pariatur, labore consequuntur sapiente optio est totam iure magnam fugit commodi. Similique iste itaque totam?', status: false, type: TaskType.BACK_END, progress: 30},
                   {title: 'Angular App', text: 'vise informacija', status: false, type: TaskType.FRONT_END, progress: 15},
                   {title: 'Full service', text: 'vise informacija', status: true, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},

                   {title: 'Task3', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 80}];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.modalActive=false;
  }

  public modalData: Task;
  public modalActive:boolean;

  getImageUrl(taskType: TaskType) {
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

  showDetails(task:Task) {

    this.dialog.open(TaskInfoModalComponent,{data: {...task}});
    this.modalData=task;
  }

}
