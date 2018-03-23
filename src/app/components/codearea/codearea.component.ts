import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-codearea',
  templateUrl: './codearea.component.html',
  styleUrls: ['./codearea.component.scss']
})
export class CodeareaComponent implements OnInit {

  @Input() title: string;

  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  updateCode($event): void {
    this.codeChanged.emit($event);
  }
}
