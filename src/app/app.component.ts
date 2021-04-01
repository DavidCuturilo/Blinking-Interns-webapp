import { DataFromServerService } from './services/data-from-server.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ DataFromServerService ]
})
export class AppComponent {
  title = 'blinking-interns-webapp';
}
