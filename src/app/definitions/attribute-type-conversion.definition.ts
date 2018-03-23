class ConversionType {
    oldType: RegExp;
    newType: string;

    constructor(oldType: RegExp, newType: string) {
        this.oldType = oldType;
        this.newType = newType;
    }
}

export const CONVERSION_TYPES = [
    new ConversionType(/^integer$/, 'number'),
    new ConversionType(/^array\[(\w+)\]$/, 'Array<$1>')
];
