export function dateConversion(period) {
  if (period.length === 7) {
    const yer = parseInt(period.slice(0, 4));
    const month = parseInt(period.slice(6, 8));
    const endDey = new Date(yer, month, 0).getDate();
    // console.log(new Date(yer, month, 0).getFullYear());

    return {
      beginningOfPeriod: period + `-${'01'}`,
      endOfPeriod: period + `-${endDey}`,
    };
  }
  if (period.length === 4) {
    return {
      beginningOfTheYear: period + `-01-01`,
      endOfTheYear: period + `-12-31`,
    };
  }
}
