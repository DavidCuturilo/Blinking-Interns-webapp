import { TaskType } from '../shared/models/task.model';

export class HelperMethodService {
    
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
    
}