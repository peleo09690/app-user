import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service'; // Import RoleService
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { Role } from '../../models/role'; // Đường dẫn đến model Role
import { UserResponse } from '../../responses/user/user.response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  model:any = {email : '', password:''};
  userModel?: any;
  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  showPassword = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
  ) { }

  ngOnInit() {
    
  }
  createAccount() {
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/register']);
  }
  login() {
      this.model.email = 'quangtan1197@gmail.com'
      this.model.password = '123456'
      this.userService.login(this.model).subscribe({
        next: (response: any) => {
          const token = response.result_data?.token as string;
          const userId = response.result_data?.userId as string;
          if (this.rememberMe) {
            this.tokenService.setToken(token);
            this.userService.getUserById(userId).subscribe({
              next: (response: any) => {
                this.userModel = response.result_data;
                this.userService.saveUserResponseToLocalStorage(this.userModel);
                if (this.userModel?.roleId == '1') {
                  this.router.navigate(['/']).then(() => {
                    window.location.reload();
                  });
                } else if (this.userModel?.roleId == '2') {
                  this.router.navigate(['/login']);
                }
  
              },
              complete: () => {
              },
              error: (error: any) => {
                alert(error.error.message);
              }
            });
          }
        },
        complete: () => {
        },
        error: (error: any) => {
          alert(error.error.message);
        }
      });
    
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
