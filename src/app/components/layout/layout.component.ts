import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { AppModule } from 'src/app/app.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [HeaderComponent, FooterComponent,RouterOutlet,MatIconModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
