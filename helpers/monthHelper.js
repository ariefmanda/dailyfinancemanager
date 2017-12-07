function ConvertMonth(month){
    let nameMount=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return nameMount[Number(month)-1]
}
function ConvertDate(date){
    let nameMounts=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let tanggal=parseInt(String(date).split(' ').slice(2,3))
    let bulan=(nameMounts.indexOf(String(date).split(' ').slice(1,2).join('')))+1;
    let tahun=parseInt(String(date).split(' ').slice(3,4))
    return [tanggal,bulan,tahun]
}



module.exports={
    ConvertMonth   :   ConvertMonth,
    ConvertDate    :   ConvertDate
}