import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMenuPage } from './doctor-menu.page';

describe('DoctorMenuPage', () => {
  let component: DoctorMenuPage;
  let fixture: ComponentFixture<DoctorMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
