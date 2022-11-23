user1 = {
    us_id: 1,
    timeBlocks: [
        {
            start: new Date(2019, 11, 1, 10, 30, 0),
        },
        {
            start: new Date(2019, 11, 1, 11, 0, 0),
        },
        {
            start: new Date(2019, 11, 1, 11, 30, 0),
        },
        {
            start: new Date(2019, 11, 1, 12, 0, 0),
        }
    ]
}

user2 = {
    us_id: 2,
    timeBlocks: [
        {
            start: new Date(2019, 11, 1, 11, 30, 0),
        },
        {
            start: new Date(2019, 11, 1, 12, 0, 0),
        }
    ]
}

user3 = {
    us_id: 3,
    timeBlocks: [
        {
            start: new Date(2019, 11, 1, 12, 0, 0),
        }
    ]
}

let users = [user1, user2, user3]


// store in a variable all the timeBlocks of all users
function allTimeBlocks(users) {
    let timesOfAllUsers = []
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].timeBlocks.length; j++) {
            timesOfAllUsers.push(users[i].timeBlocks[j])
        }
    }
    return timesOfAllUsers
}

let timesOfAllUsers = allTimeBlocks(users)
console.log(timesOfAllUsers)

// filter just to have the different times
function differentTimes(timesOfAllUsers) {
    let differentTimes = []
    for (let i = 0; i < timesOfAllUsers.length; i++) {
        if (differentTimes.length === 0) {
            differentTimes.push(timesOfAllUsers[i])
        } else {
            for (let j = 0; j < differentTimes.length; j++) {
                if (timesOfAllUsers[i].start.getTime() === differentTimes[j].start.getTime()) {
                    break
                } else if (j === differentTimes.length - 1) {
                    differentTimes.push(timesOfAllUsers[i])
                }
            }
        }
    }
    return differentTimes
}

let differentTimesFiltered = differentTimes(timesOfAllUsers)
console.log(differentTimesFiltered)

// make a function that return the differentTimesFiltered with a empty array of users without modifying the original differentTimesFiltered
function differentTimesFilteredWithUsers(differentTimesFiltered) {
    let differentTimesFilteredWithUsers = []
    for (let i = 0; i < differentTimesFiltered.length; i++) {
        differentTimesFilteredWithUsers.push({
            start: differentTimesFiltered[i].start,
            users: []
        })
    }
    return differentTimesFilteredWithUsers
}

let differentTimesFilteredWithUsersEmpty = differentTimesFilteredWithUsers(differentTimesFiltered)
console.log(differentTimesFilteredWithUsersEmpty)

// make a function that put in the array "users" which users are available in the same time
function differentTimesFilteredWithUsersFilled(differentTimesFilteredWithUsersEmpty, users) {
    for (let i = 0; i < differentTimesFilteredWithUsersEmpty.length; i++) {
        for (let j = 0; j < users.length; j++) {
            for (let k = 0; k < users[j].timeBlocks.length; k++) {
                if (differentTimesFilteredWithUsersEmpty[i].start.getTime() === users[j].timeBlocks[k].start.getTime()) {
                    differentTimesFilteredWithUsersEmpty[i].users.push(users[j].us_id)
                }
            }
        }
    }
    return differentTimesFilteredWithUsersEmpty
}

let differentTimesFilteredWithUsersFilledResult = differentTimesFilteredWithUsersFilled(differentTimesFilteredWithUsersEmpty, users)
console.log(differentTimesFilteredWithUsersFilledResult)