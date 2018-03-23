import { Component, OnInit } from '@angular/core';
import { SwaggerConvertService } from '../../services/swagger-convert.service';
import { TypeScriptFile } from '../../definitions/typescript-file.definition';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements OnInit {

  private convertedFiles: Array<TypeScriptFile>;

  constructor(private _swaggerService: SwaggerConvertService) { }

  ngOnInit() {
  }

  updateSwagger($event): void {
    this.convertedFiles = this._swaggerService.convert($event);
  }

}
