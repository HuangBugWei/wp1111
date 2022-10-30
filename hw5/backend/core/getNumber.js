var number = 0
var rockNumber = 0

export const getNumber = () => {
    return number
}

export const genNumber = () => {
    number = Math.floor(Math.random() * 99 + 1)
    console.log(number)
    console.log('number')
}

export const genRockNumber = () => {
    rockNumber = Math.floor(Math.random() * 3)
    console.log('rockNumber')
    console.log(rockNumber)
    return rockNumber
}