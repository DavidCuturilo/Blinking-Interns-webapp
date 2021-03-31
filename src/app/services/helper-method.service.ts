import { TaskType } from '../shared/models/task.model';

interface AccessToken {
  email:string,
  id:number,
  type:string,
  iat:number,
  exp: number
}
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

      getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      getDataFromAccesToken(): AccessToken {
        const accessToken = this.getCookie("accessToken");
        return JSON.parse(atob(accessToken.split('.')[1]));
      }

}
