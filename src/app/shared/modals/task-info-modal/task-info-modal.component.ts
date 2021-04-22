import { MatSnackBar } from '@angular/material/snack-bar';
import { DataFromServerService } from './../../../services/data-from-server.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperMethodService } from 'src/app/services/helper-method.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss'],
  providers: [HelperMethodService]
})
export class TaskInfoModalComponent implements OnInit {

  statusColor = "red"
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskInfoModalComponent>,
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.data.task_status === "Active") this.statusColor="blue"
    else if(this.data.task_status === "Completed") this.statusColor="green"
    else this.statusColor="red"
  }

  filePreview=false;
  newBase64;

  closeModal() {
    this.dialogRef.close();
  }

  viewFile(){
    this.loadFileFromServer()
    .then(res => {
      const base64string = res.payload;
      if(base64string){
        this.filePreview=true
        this.newBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(base64string);
      };
      return this.snackBar.open("No file for this task", '',{duration:2000});;
    })
    .catch(console.log);
  }

  downloadFile(){
    this.loadFileFromServer()
    .then(res => {
      const base64string = res.payload;
      if(base64string) return this.decodeFile(res.payload);
      return null;
    })
    .then(blob => {
      if(blob)return this.download(blob);
      let snackBarRef = this.snackBar.open("No file for this task", '',{duration:3000});
      return null;
    })
    .catch(console.log);
  }

  //loads base64 encoded FILE from server (by task id)
  async loadFileFromServer(){
    return this.dataFromServerService.getFile(this.data.task.task_id).toPromise();
  }

  //Converts base64 string to BLOB object
  async decodeFile(base64String){
    console.log(base64String)
    const res = await fetch(base64String);
    const blob = await res.blob();
    return blob;
  }


  //Popups download dialog with file
  download(data: Blob) {
    console.log(data)
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = this.data.task.title;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
