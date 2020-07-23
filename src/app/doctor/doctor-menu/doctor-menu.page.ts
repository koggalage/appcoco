import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.page.html',
  styleUrls: ['./doctor-menu.page.scss'],
})
export class DoctorMenuPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onDailyUpdateClick() {
    this.router.navigate(['/daily-update']);
  }

  public onHistoryListClick() {
    this.router.navigate(['/history-list']);
  }

}
