/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterSalesRegulationsComponent } from './footer-sales-regulations.component';

describe('FooterSalesRegulationsComponent', () => {
  let component: FooterSalesRegulationsComponent;
  let fixture: ComponentFixture<FooterSalesRegulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSalesRegulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSalesRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
