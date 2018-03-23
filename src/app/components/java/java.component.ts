import { Component, OnInit } from '@angular/core';
import { TypeScriptFile } from '../../definitions/typescript-file.definition';
import { SwaggerConvertService } from '../../services/swagger-convert.service';

@Component({
  selector: 'app-java',
  templateUrl: './java.component.html',
  styleUrls: ['./java.component.scss']
})
export class JavaComponent implements OnInit {

  private convertedFiles: Array<TypeScriptFile>;

  constructor(private _swaggerService: SwaggerConvertService) { }

  ngOnInit() {
  }

  updateSwagger($event): void {
    this.convertedFiles = this._swaggerService.convert($event);
  }
}
