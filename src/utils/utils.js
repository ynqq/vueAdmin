export function readASBase(file) {
  return new Promise((resolve, reject) => {
    let fs = new FileReader();
    fs.readAsDataURL(file);
    fs.onload = res => {
      let base64 = res.target.result
      let img = new Image()
      img.src = base64
      img.onload = function () {
        resolve({
          base64,
          width: img.width,
          height: img.height,
          type: file.type.replace('image/', '')
        });
      }
    };
  });
}


export const NUMREG = /^[0-9]{0,}$/

export const SMALLNUMREG = /^[0-9]{0,}(\.[0-9]{0,3})?$/


export function GET_DateObj(date, type = '-', timeType = ':') {
  if (date) {
    date = new Date(date)
  } else {
    date = new Date()
  }
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    mm = date.getMinutes(),
    s = date.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  mm = mm < 10 ? '0' + mm : mm
  s = s < 10 ? '0' + s : s
  return {
    date: `${y}${type}${m}${type}${d}`,
    time: `${h}${timeType}${mm}${timeType}${s}`
  }
}