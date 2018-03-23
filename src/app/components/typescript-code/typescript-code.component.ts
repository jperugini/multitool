import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-typescript-code',
  templateUrl: './typescript-code.component.html',
  styleUrls: ['./typescript-code.component.scss']
})
export class TypescriptCodeComponent implements OnInit {

  constructor(private _toolbarService: ToolbarService) { }

  ngOnInit() {
    // Update toolbar
    this._toolbarService.setComponentToLoad(null);
  }

}
