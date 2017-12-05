function ConvertMonth(month){
    let nameMount=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return nameMount[Number(month)-1]
}
module.exports={
    ConvertMonth : ConvertMonth
  }