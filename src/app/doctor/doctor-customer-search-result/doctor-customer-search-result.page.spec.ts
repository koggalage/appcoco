import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCustomerSearchResultPage } from './doctor-customer-search-result.page';

describe('DoctorCustomerSearchResultPage', () => {
  let component: DoctorCustomerSearchResultPage;
  let fixture: ComponentFixture<DoctorCustomerSearchResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCustomerSearchResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCustomerSearchResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
