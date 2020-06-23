import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agreement-form',
  templateUrl: './agreement-form.component.html',
  styleUrls: ['./agreement-form.component.scss'],
})
export class AgreementFormComponent implements OnInit {

  public preview_url: string;
  // @Input() url: string;
  // @Output() startNewChatSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.preview_url = "https://www.sj.vic.edu.au/wp-content/uploads/2015/05/signature-Img.jpg";

  }

  ngOnInit() { }

  onChange() {
    //this.startNewChatSelected.emit()
  }

}
