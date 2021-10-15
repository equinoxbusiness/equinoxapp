export function convertToInternationalCurrencySystem(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e9 ?
      (Math.abs(Number(labelValue)) / 1.0e9).toFixed(5) + "B" :
      Math.abs(Number(labelValue)) >= 1.0e6 ?
      (Math.abs(Number(labelValue)) / 1.0e6).toFixed(5) + "M" :
      Math.abs(Number(labelValue)) >= 1.0e3 ?
      (Math.abs(Number(labelValue)) / 1.0e3).toFixed(5) + "K" :
      Math.abs(Number(labelValue)).toFixed(5);
  }
  