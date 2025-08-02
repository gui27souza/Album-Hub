function getTimeLog() {
    
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let hour = date.getHours() < 10? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes()
    let second = date.getSeconds() < 10? '0' + date.getSeconds() : date.getSeconds()
    
    let millisecond = date.getMilliseconds()   
    if (millisecond < 100) millisecond = '0' + millisecond
    else if (millisecond < 10) millisecond = '00'+millisecond

    return day+'-'+month+'-'+year+' '+hour+':'+minute+':'+second+':'+millisecond
}

module.exports = {
    getTimeLog
}