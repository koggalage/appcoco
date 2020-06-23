import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.page.html',
  styleUrls: ['./app-header.page.scss'],
})
export class AppHeaderPage implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
