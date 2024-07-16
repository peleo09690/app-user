import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, AngularMaterialModule, FormsModule,MatButtonModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterComponent implements OnInit {

  requestRegister: any = {
    "first_name": '',
    "last_name": "",
    "email": "",
    "password": "",
    "role_id": 1
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private userService : UserService
  ) { }

  ngOnInit() {
  }

  registerUser(){
    this.userService.register(this.requestRegister).subscribe({
      next: (value) => {
        
      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
  onCloseDialog(){
    this.dialogRef.close();
  }
}
