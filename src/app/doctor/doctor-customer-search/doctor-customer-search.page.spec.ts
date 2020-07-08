import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCustomerSearchPage } from './doctor-customer-search.page';

describe('DoctorCustomerSearchPage', () => {
  let component: DoctorCustomerSearchPage;
  let fixture: ComponentFixture<DoctorCustomerSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCustomerSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCustomerSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
