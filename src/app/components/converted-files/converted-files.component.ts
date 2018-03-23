import { Component, OnInit, Input } from '@angular/core';
import { TypeScriptFile } from '../../definitions/typescript-file.definition';
import { saveAs } from 'file-saver/dist/FileSaver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-converted-files',
  templateUrl: './converted-files.component.html',
  styleUrls: ['./converted-files.component.scss']
})
export class ConvertedFilesComponent implements OnInit {

  private collapseOpened: Array<boolean>;

  private _convertedFiles: Array<TypeScriptFile>;

  @Input()
  set convertedFiles(convertedFiles: Array<TypeScriptFile>) {
    this._convertedFiles = convertedFiles;
    if (this.convertedFiles !== null && this.convertedFiles !== undefined && this.convertedFiles.length > 0) {
      // Reset collapse opened
      this.collapseOpened = new Array<boolean>(this.convertedFiles.length);
      this.collapseOpened.fill(false);
    }
  }

  get convertedFiles(): Array<TypeScriptFile> {
    return this._convertedFiles;
  }

  constructor() { }

  ngOnInit() {
  }

  downloadFile(file: TypeScriptFile) {
    const blob = new Blob([file.content.join('\n')], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, file.filename);
  }

  downloadAll() {
    const zip = new JSZip();
    if (this.convertedFiles !== null || this.convertedFiles !== undefined) {
      this.convertedFiles.forEach(file => {
        zip.file(file.filename, file.content.join('\n'));
      });
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        saveAs(content, 'convertedTs.zip');
      });
    }
  }

}
