// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeTimeCard) {
    return employeeTimeCard.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, timeEvent){
    let [date, hour] = timeEvent.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, timeEvent){
    let [date, hour] = timeEvent.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, hoursWorked){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === hoursWorked
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === hoursWorked
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, earnedOnDate){
    let rawWage = hoursWorkedOnDate(employee, earnedOnDate)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(payroll){
    return payroll.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}