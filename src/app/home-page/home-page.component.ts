import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';

import { TaskType } from '../shared/models/task.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  tasks: Task[] = [{title: 'Task1', text: 'vise informacija', status: true, type: TaskType.BACK_END, progress: 30}, 
                   {title: 'Task2', text: 'vise informacija', status: false, type: TaskType.FRONT_END, progress: 15}, 
                   {title: 'Task3', text: 'vise informacija', status: true, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Task3', text: 'vise informacija', status: true, type: TaskType.FULL_STACK, progress: 80}];

  constructor() { }

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

  showDetails(task){
    console.log(task);
  }
}
