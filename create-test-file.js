const XLSX = require('xlsx');

// Create a workbook to simulate a Numbers export
function createNumbersExportTest() {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Scenario 1: Standard headers but with Numbers-specific formatting
  const dataStandard = [
    // Generate a blank row as Numbers sometimes adds at beginning
    [''],
    // Actual headers but with period-delimited dates
    ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['5.23.2025', 'Monday', 'Terry', '9:00 am to 5:00 pm', 'John', 'Basic Training'],
    ['5.24.2025', 'Tuesday', 'Sarah', '10:00 am to 6:00 pm', 'Mary', 'Advanced Training'],
    ['5.25.2025', 'Wednesday', 'Galen', '8:00 am to 4:00 pm', 'Michael', 'Refresher Course']
  ];
  const wsStandard = XLSX.utils.aoa_to_sheet(dataStandard);
  XLSX.utils.book_append_sheet(wb, wsStandard, 'Standard');
  
  // Scenario 2: Single letter headers (common in Numbers auto-generation)
  const dataSingleLetters = [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['5.23.2025', 'Monday', 'Terry', '9:00 am to 5:00 pm', 'John', 'Basic Training'],
    ['5.24.2025', 'Tuesday', 'Sarah', '10:00 am to 6:00 pm', 'Mary', 'Advanced Training']
  ];
  const wsSingleLetters = XLSX.utils.aoa_to_sheet(dataSingleLetters);
  XLSX.utils.book_append_sheet(wb, wsSingleLetters, 'SingleLetters');
  
  // Scenario 3: Headers buried in metadata
  const dataBuriedHeaders = [
    ['TransDev Training Schedule'],
    ['Generated by Numbers'],
    ['Export Date: June 1, 2025'],
    [''],
    [''],
    ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['5.23.2025', 'Monday', 'Terry', '9:00 am to 5:00 pm', 'John', 'Basic Training']
  ];
  const wsBuriedHeaders = XLSX.utils.aoa_to_sheet(dataBuriedHeaders);
  XLSX.utils.book_append_sheet(wb, wsBuriedHeaders, 'BuriedHeaders');
  
  // Scenario 4: Text-based dates and different formats
  const dataTextDates = [
    ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['May 23, 2025', 'Monday', 'Terry', '9:00 am to 5:00 pm', 'John', 'Basic Training'],
    ['2025-05-24', 'Tuesday', 'Sarah', '10:00 am to 6:00 pm', 'Mary', 'Advanced Training']
  ];
  const wsTextDates = XLSX.utils.aoa_to_sheet(dataTextDates);
  XLSX.utils.book_append_sheet(wb, wsTextDates, 'TextDates');
  
  // Scenario 5: Multiple tables in the same worksheet (common in Numbers)
  const dataMultipleTables = [
    ['Table 1: Training Schedule'],
    ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['5.23.2025', 'Monday', 'Terry', '9:00 am to 5:00 pm', 'John', 'Basic Training'],
    [''],
    [''],
    ['Table 2: Additional Information'],
    ['Note', 'Details'],
    ['Contact', 'training@transdev.com']
  ];
  const wsMultipleTables = XLSX.utils.aoa_to_sheet(dataMultipleTables);
  XLSX.utils.book_append_sheet(wb, wsMultipleTables, 'MultipleTables');
  
  // Scenario 6: Website Format - Dates as columns
  const dataWebsiteFormat = [
    ['', '5/25/2025', '5/26/2025', '5/27/2025', '5/28/2025', '5/29/2025'],
    ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    ['Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (19)'],
    ['Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep'],
    ['Galen', '5:00 am to 1:00 pm', 'Annette', 'BTW- 8hr Advanced'],
    ['Sisay', '5:00 am to 1:00 pm', 'Juan', 'BTW-finish Advanced-final eval'],
    ['Patsy', '5:00 am to 1:00 pm', 'David', 'BTW-finish basic-start advanced']
  ];
  const wsWebsiteFormat = XLSX.utils.aoa_to_sheet(dataWebsiteFormat);
  XLSX.utils.book_append_sheet(wb, wsWebsiteFormat, 'WebsiteFormat');
  
  // Scenario 7: Website Format with period-delimited dates (Numbers style)
  const dataWebsiteNumbersFormat = [
    ['', '5.25.2025', '5.26.2025', '5.27.2025', '5.28.2025', '5.29.2025'],
    ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    ['Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (19)'],
    ['Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep'],
    ['Galen', '5:00 am to 1:00 pm', 'Annette', 'BTW- 8hr Advanced'],
    ['Sisay', '5:00 am to 1:00 pm', 'Juan', 'BTW-finish Advanced-final eval'],
    ['Patsy', '5:00 am to 1:00 pm', 'David', 'BTW-finish basic-start advanced']
  ];
  const wsWebsiteNumbersFormat = XLSX.utils.aoa_to_sheet(dataWebsiteNumbersFormat);
  XLSX.utils.book_append_sheet(wb, wsWebsiteNumbersFormat, 'WebsiteFormatNumbers');
  
  // Scenario 8: Website Format with text dates (Month format)
  const dataWebsiteTextFormat = [
    ['', 'May 25, 2025', 'May 26, 2025', 'May 27, 2025', 'May 28, 2025', 'May 29, 2025'],
    ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    ['Trainer', 'Hours', 'Participant', 'Level/Goal'],
    ['Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (19)'],
    ['Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep']
  ];
  const wsWebsiteTextFormat = XLSX.utils.aoa_to_sheet(dataWebsiteTextFormat);
  XLSX.utils.book_append_sheet(wb, wsWebsiteTextFormat, 'WebsiteFormatText');

  // Write the file
  XLSX.writeFile(wb, 'NumbersExportTest.xlsx');
  console.log('Test file created: NumbersExportTest.xlsx');
}

createNumbersExportTest();
