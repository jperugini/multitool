import { Injectable } from '@angular/core';
import { TypeScriptFile } from '../definitions/typescript-file.definition';
import { CONVERSION_TYPES } from '../definitions/attribute-type-conversion.definition';

@Injectable()
export class SwaggerConvertService {

    constructor() { }

    convert(swaggerString: string): Array<TypeScriptFile> {
        const files = new Array<TypeScriptFile>();
        const swaggerSplit: Array<string> = swaggerString.split('}');
        swaggerSplit.forEach(
            split => {
                if (split !== '') {
                    if (split.indexOf('{') > -1) {
                        const file = new TypeScriptFile();
                        const splittedFile = split.split('{');
                        file.filename = splittedFile[0].replace(' ', '').trim();
                        file.filename = file.filename.charAt(0).toLowerCase() + file.filename.slice(1) + '.definition.ts';
                        file.content = this.convertFileBody(splittedFile[0].replace(' ', ''), splittedFile[1]);
                        files.push(file);
                    }
                }
            }
        );
        return files;
    }

    convertFileBody(objectName: string, fileBody: string): Array<string> {
        const fileArray = new Array<string>();
        fileArray.push('export class ' + objectName.trim() + ' {');
        const splittedLines = fileBody.split('\n');
        splittedLines.forEach(
            line => {
                if (line.indexOf('(') > -1) {
                    const splittedLine = line.split('(');
                    const attribut = splittedLine[0].replace(' ', '').trim();
                    if (splittedLine[1].indexOf(')') > -1) {
                        let attributType = splittedLine[1].split(')')[0];
                        if (attributType.indexOf(', optional') > -1) {
                            attributType = attributType.replace(', optional', '').trim();
                            CONVERSION_TYPES.forEach(
                                type => attributType = attributType.replace(type.oldType, type.newType)
                            );
                            fileArray.push('\t' + attribut + '?: ' + attributType + ';');
                        } else {
                            fileArray.push('\t' + attribut + ': ' + attributType + ';');
                        }
                    }
                }
            }
        );
        fileArray.push('}');
        return fileArray;
    }

}
