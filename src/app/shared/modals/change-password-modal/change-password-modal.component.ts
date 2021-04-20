import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataFromServerService } from 'src/app/services/data-from-server.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  providers: [DataFromServerService]
})
export class ChangePasswordModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
              private _snackBar: MatSnackBar,
              private dataService: DataFromServerService) { }

  changeForm: FormGroup;
  hide = true;
  hide1 = true;
  hide2 = true;




  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'oldPassword': new FormControl(null,[Validators.required,Validators.minLength(6)]), 
      'newPassword' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmNew' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
  }

  closeModal() {
    this.dialogRef.close();
  }



  getErrorMessage(control: string) {
    if(this.changeForm.get(control).hasError('required')){
      return 'You must enter a value';
    }
    return 'Password must contain at least 8 characters';
  }

  doesTheNewPasswordMatch() {
    const newPassword = this.changeForm.get('newPassword');
    const confirmNew = this.changeForm.get('confirmNew');

    if(!newPassword.touched || !confirmNew.touched) return true;

    if(newPassword.value!=='' && confirmNew.value!=='') {
      return newPassword.value === confirmNew.value;
    }

    return true;
  }

  isTheNewPasswordSameAsOld() {


    const oldPassword = this.changeForm.get('oldPassword');
    const newPassword = this.changeForm.get('newPassword');

    if(!newPassword.touched || !oldPassword.touched) return false;

    if(newPassword.value !=='' && oldPassword.value!=='') {
      return newPassword.value === oldPassword.value;
    }
    return false;
  }

  isValid() {
    if(this.changeForm.invalid){
      return false;
    }
    return true;
  }

  submitChange() {
    this._snackBar.open('Successfully changed password!', 'Close',{
      duration: 2000,
    });
    this.dataService.changePassword(this.changeForm.get('oldPassword').value, this.changeForm.get('confirmNew').value , this.changeForm.get('newPassword').value)
    .subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);

    })
    this.changeForm.reset();
  }
  onClose(){
    this.dialogRef.close();
  }
}
