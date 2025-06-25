// CallBack

function sum(a, b) {
    console.log(a + b)
}

function sumCalculate(a, b, sumCallback) {
    sumCallback(a, b)
}

// call function directly
// sumCalculate(2, 3, sum);

// call function logic
sumCalculate(3, 3, (a, b) => {
    console.log(a + b)
})

// CallBack Hell

function getData(dataId, getNextData) {
    setTimeout(() => {
        console.log("data", dataId)
        if (getNextData) {
            getNextData()
        }
    }, 2000)
}

getData(1, () => {
    console.log("getting data 1....")
    getData(2, () => {
        console.log("getting data 2....")
        getData(3, () => {
            console.log("getting data 3....")
            getData(4)
        })
    })
})