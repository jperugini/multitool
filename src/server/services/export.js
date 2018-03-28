const express = require('express');
const router = express.Router();
var xl = require('excel4node');
var getStyles = require('./xl-styles');
var uuid = require('node-uuid');

module.exports = function exportWeekly(report, callbackSuccess, callbackErr) {
  // Create a new instance of a Workbook class 
  var wb = new xl.Workbook();
  var tasks = report.tasks || [];

  // Add Worksheets to the workbook 
  var ws = wb.addWorksheet('week ' + report.header.week.toString());

  // Create a reusable style 
  var styles = getStyles(wb);

  // Add bred image 
  ws.addImage({
    path: './src/assets/bred_small.png',
    type: 'picture',
    position: {
      type: 'absoluteAnchor',
      x: '0in',
      y: '0.15in'
    }
  });

  ws.row(1).setHeight(60);
  ws.column(1).setWidth(30);
  ws.column(2).setWidth(45);
  ws.column(3).setWidth(25);
  // Set row height
  var i = 4;
  for (i; i < 13; i++) {
    ws.column(i).setWidth(15);
  }

  // Title header
  ws.cell(1, 1, 1, 11, true).string('Weekly report').style(styles.titleStyle);

  // Sub header
  ws.cell(4, 1).string('Provider :').style(styles.subTitleStyle);
  ws.cell(4, 2).string(report.header.provider || '').style(styles.subNormalStyle);

  ws.cell(5, 1).string('Drafter : ').style(styles.subTitleStyle);
  ws.cell(5, 2).string(report.header.drafter || '').style(styles.subNormalStyle);

  ws.cell(6, 1).string('Drafting date : ').style(styles.subTitleStyle);
  ws.cell(6, 2).string(report.header.draftingDate || '').style(styles.subNormalStyle);

  ws.cell(7, 1).string('Period : ').style(styles.subTitleStyle);
  ws.cell(7, 2).string(report.header.period || '').style(styles.subNormalStyle);

  ws.cell(8, 1).string('Week : ').style(styles.subTitleStyle);
  ws.cell(8, 2).string(report.header.week.toString() || '').style(styles.subNormalStyle);

  ws.cell(9, 3).string('Working Days : ' + report.header.working || '0').style(styles.taskStyle);
  ws.cell(9, 4).string('Holiday : ' + report.header.holidays || '0').style(styles.taskStyle);
  ws.cell(9, 5).string('Vacation : ' + report.header.vacations || '0').style(styles.taskStyle);
  ws.cell(9, 6).string('Sick Leave : ' + report.header.sick || '0').style(styles.taskStyle);

  ws.cell(10, 1).string('Project Manager ').style(styles.subTitleStyle);
  ws.cell(10, 2).string(report.header.projectManager || '').style(styles.subNormalStyle);

  // Table header
  ws.row(12).setHeight(45);

  ws.cell(12, 1).string('Project').style(styles.boldStyle);
  ws.cell(12, 2).string('Tasks').style(styles.boldStyle);
  ws.cell(12, 3).string('Contributor(s)').style(styles.boldStyle);
  ws.cell(12, 4).string('Consumed during the period (d/h)').style(styles.boldStyleBlue);
  ws.cell(12, 5).string('Planned (d/h)').style(styles.boldStyle);
  ws.cell(12, 6).string('Consumed (d/h)').style(styles.boldStyle);
  ws.cell(12, 7).string('Remains to be done (d/h)').style(styles.boldStyleBlue);
  ws.cell(12, 8).string('End date').style(styles.boldStyleBlue);
  ws.cell(12, 9).string('Palan').style(styles.boldStyleBlue);
  ws.cell(12, 10).string('% Progress ').style(styles.boldStyleBlue);
  ws.cell(12, 11).string('Comments ').style(styles.boldStyleBlue);

  var iter = 13;
  tasks.forEach(function (task) {
    ws.cell(iter, 1).string(task.project || '').style(styles.taskStyle);
    ws.cell(iter, 2).string(task.tasks || '').style(styles.taskStyle);
    ws.cell(iter, 3).string(task.contributor || '').style(styles.taskStyle);
    ws.cell(iter, 4).string(task.consumedPeriod || '').style(styles.taskStyleBlue);
    ws.cell(iter, 5).string(task.planned || '').style(styles.taskStyle);
    ws.cell(iter, 6).string(task.consumed || '').style(styles.taskStyle);
    ws.cell(iter, 7).string(task.remain || '').style(styles.taskStyleBlue);
    ws.cell(iter, 8).string(task.endDate || '').style(styles.taskStyleBlue);
    ws.cell(iter, 9).string(task.palan || '').style(styles.taskStyleBlue);
    ws.cell(iter, 10).string(task.progress.toString() || '').style(styles.taskStyleBlue);
    ws.cell(iter, 11).string(task.comment || '').style(styles.taskStyleBlue);
    iter++;
  }, this);

  // Last 2 rows with grey color
  ws.cell(iter, 1, iter, 11, false).style(styles.grey1);
  ws.cell(iter + 1, 1, iter + 1, 11, false).style(styles.grey2);

  var uuid1 = uuid.v1();
  var name = "";
  if(report.header.drafter.indexOf(" ") > -1) {
    name = report.header.drafter.split(" ")[0].toLowerCase(); // get firstname
    name = name.charAt(0).toUpperCase() + name.slice(1); // capitalize first letter
    name = name + report.header.drafter.split(" ")[1].charAt(0);
  }

  var filename = 'Weekly Report - ' + report.header.provider + ' services - ' + name + ' - week' + report.header.week.toString() + '.xlsx';
  
  // Try to write 
  wb.write('reports/' + filename, function (err, stats) {
    if (err) {
      callbackErr(err);
    } else {
      // console.log(stats); // Prints out an instance of a node.js fs.Stats object 
      // Send download
      callbackSuccess(filename);
    }
  });
}
