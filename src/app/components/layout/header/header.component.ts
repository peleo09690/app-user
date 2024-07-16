import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductService } from 'src/app/services/product.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../register/register.component';
import { LoginComponent } from '../../login/login.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, MatButtonModule, MatMenuModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChildren('menuRefs') menuRefs: QueryList<MatMenu> | any;
  @ViewChildren('subMenuRefs') subMenuRefs: QueryList<MatMenu> | any;
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  isShowDropdown: boolean = false;
  textSearchProduct = '';
  menus: any = [
    {
      name: 'Collagen',
      icon: '💧',
      subMenus: [
        { name: 'Collagen - Placenta' }
      ]
    },
    {
      name: 'Thực Phẩm Làm Đẹp',
      icon: '🧴',
      subMenus: [
        { name: 'Trị Nám - Trắng Da' }
      ]
    },
    {
      name: 'Giảm Cân',
      icon: '👙',
      subMenus: [
        { name: 'Giảm Cân' }
      ]
    },
    {
      name: 'Chăm Sóc Sức Khỏe',
      icon: '❤️',
      subMenus: [
        { name: 'Tăng Chiều Cao' }
      ]
    },
    {
      name: 'Chăm Sóc Da Mặt',
      icon: '🧴',
      subMenus: [
        {
          name: 'Sinh Lý Nam - Nữ',
          subMenus: []
        },

        {
          name: 'Chăm Sóc Da Mặt',
          subMenus: [
            { name: 'Sub Category 1' },
            { name: 'Sub Category 2' }
          ]
        }
      ]
    },
    {
      name: 'Trang Điểm',
      icon: '💄',
      subMenus: []
    },
    {
      name: 'Chăm Sóc Cơ Thể',
      icon: '🧼',
      subMenus: [
        { name: 'Chăm Sóc Cơ Thể' }
      ]
    },
    {
      name: 'Mẹ & Bé',
      icon: '🍼',
      subMenus: []
    },
    {
      name: 'Điện Gia Dụng',
      icon: '🔌',
      subMenus: []
    },
    {
      name: 'Nhà Cửa & Đời Sống',
      icon: '🏠',
    },
    {
      name: 'Thực Phẩm Nhật Bản',
      icon: '🍱',
    },
    {
      name: 'Hương Thơm Nhật Bản',
      icon: '🌸',
    }
  ];
  categories: any = [];

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog : MatDialog,
  ) {

  }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getListCategories();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if (index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }


  setActiveNavItem(index: number) {
    this.activeNavItem = index;
    //alert(this.activeNavItem);
  }
  showDropdown() {
    this.isShowDropdown = !this.isShowDropdown;
  }
  doSomething() { }
  doSomethingElse() { }

  menuName(index: number): any {
    return `menu-${index}`;
  }

  subMenuName(menuIndex: number, subMenuIndex: number): any {
    return `submenu-${menuIndex}-${subMenuIndex}`;
  }

  onSearchProduct() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product'], { queryParams: { productName: this.textSearchProduct }, queryParamsHandling: 'merge' });
    });

  }

  getListCategories() {
    let param = {
      "type": ["PRODUCT_CATEGORY"]
    }

    this.categoryService.getListCategoryType(param).subscribe({
      next: (categories) => {
        if (categories.result_data.categoryInfo) {
          this.categories = categories.result_data?.categoryInfo.slice(0, 5);
          this.menus = categories.result_data?.categoryInfo;
        }
      },
      complete: () => {
        ;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  searchProductByCategory(category: any) {
    this.textSearchProduct = '';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product'], { queryParams: { categoryId: category.category_id }, queryParamsHandling: 'merge' });
    });
  }
  registerUser(){
    const dialog = this.dialog.open(RegisterComponent, {
      width: '500px',
      id: 'dialog-register',
      disableClose: true,
      panelClass: [ 'dialog-register'],
    });
    dialog.afterClosed().subscribe((res) => {
      if (res =='OK') {
        
      }
      // this.refreshData();
    });
  }

  loginUser(){
    const dialog = this.dialog.open(LoginComponent, {
      width: '500px',
      id: 'dialog-login',
      disableClose: true,
      panelClass: [ 'dialog-login'],
    });
    dialog.afterClosed().subscribe((res) => {
      if (res =='OK') {
        
      }
      // this.refreshData();
    });
  }
  

}
