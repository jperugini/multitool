function getStyles(wb) {
  var thinBorder = {
    style: 'thin',
    color: '000000'
  };

  var allBorders = {
    left: thinBorder,
    right: thinBorder,
    top: thinBorder,
    bottom: thinBorder
  };

  var blueCell = {
    alignment: {
      wrapText: true,
      horizontal: 'left',
      vertical: 'center',
      shrinkToFit: true
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: 'ccccff'
    },
    border: allBorders
  };

  return {
    example_style: wb.createStyle({
      font: {
        color: '#FF0800',
        size: 12
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -'
    }),

    titleStyle: wb.createStyle({
      font: {
        bold: true,
        size: 24
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center',
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'ccccff'
      },
      border: allBorders
    }),

    subTitleStyle: wb.createStyle({
      font: {
        bold: true
      },
      alignment: blueCell.alignment,
      fill: blueCell.fill,
      border: allBorders
    }),

    subNormalStyle: wb.createStyle({
      alignment: blueCell.alignment,
      fill: blueCell.fill,
      border: allBorders
    }),

    boldStyle: wb.createStyle({
      font: {
        bold: true
      },
      alignment: blueCell.alignment,
      border: allBorders
    }),

    boldStyleBlue: wb.createStyle({
      font: {
        bold: true
      },
      alignment: blueCell.alignment,
      fill: blueCell.fill,
      border: allBorders
    }),

    taskStyle: wb.createStyle({
      alignment: blueCell.alignment,
      border: allBorders
    }),

    taskStyleBlue: wb.createStyle({
      alignment: blueCell.alignment,
      fill: blueCell.fill,
      border: allBorders
    }),

    grey1: wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: '808080'
      },
      border: allBorders
    }),

    grey2: wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'c0c0c0'
      },
      border: allBorders
    }),
  }
};

module.exports = getStyles;
