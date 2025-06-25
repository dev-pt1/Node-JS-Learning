// promises

function getData(dataId, getNextData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("data", dataId);
            resolve("Success")
            // reject("error")
            if (getNextData) {
                getNextData()
            }
        }, 5000)
    })
}

// let promise = getData(2);
// console.log(promise)
// setTimeout(() => {
//     console.log(promise)
// }, 5000)

// with promise chining
getData(1).then((res) => {
    return getData(2)
}).then((res) => {
    console.log("🚀 ~ getData ~ res:", res)
})

// const getPromise = () => {
//     return new Promise((resolve, reject) => {
//         console.log("I am promise")
//         resolve("success")
//     })
// }

// let promise = getPromise();
// promise.then((res) => {
//     console.log("Promised full filled", res)
// })

// promise.catch((err) => {
//     console.log("Promise rejected", err)
// })

// promise chining

// function asyncFunc1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("data1....")
//             resolve("success")
//         }, 2000)
//     })
// }

// function asyncFunc2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("data2....")
//             resolve("success")
//         }, 2000)
//     })
// }

// // console.log("fetching data1....");
// // let p1 = asyncFunc1();
// // p1.then(() => {
// //     console.log("fetching data2....");
// //     let p2 = asyncFunc2();
// //     p2.then(() => { })
// // })

// console.log("fetching data1....");
// asyncFunc1().then(() => {
//     console.log("fetching data2....")
//     asyncFunc2().then(() => { })
// })