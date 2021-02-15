export function isIsoDate(inputDate : string) {
    //if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(inputDate)) return false;
    if (!/\d{4}-\d{2}-\d{2}/.test(inputDate)) return false;
    var convertedDate = new Date(inputDate); 
    return convertedDate.toISOString().slice(0,10) === inputDate;
    //return true;
  }
  