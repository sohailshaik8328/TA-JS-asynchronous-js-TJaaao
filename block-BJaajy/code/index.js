 // one

let first = new Promise((res, rej) => {
    setTimeout(() => {
        res(1);
    }, 1000);
}).then(res => console.log(res))

let second = new Promise((res, rej) => {
    setTimeout(() => {
        res(2);
    }, 2000);
}).then(res => console.log(res))

let third = new Promise((res, rej) => {
    setTimeout(() => {
        res(3);
    }, 3000);
}).then(res => console.log(res))

let fourth = new Promise((res, rej) => {
    setTimeout(() => {
        res(4);
    }, 4000);
}).then(res => console.log(res))

let all = Promise.all([first, second, third, fourth]);

// // two

const usernames = [
    'getify',
    'gaearon',
    'AArnott',
    'subtleGradient',
    'piranha',
    'sophiebits'
]

let usernameData = Promise.all(
    usernames.map((user) => fetch(`https://api.github.com/users/${user}`).then(res => res.json()))
).then((users) => {
    users.forEach((user) => console.log(user.followers))
})

//three

let race = Promise.race(
    [
        fetch(`https://random.dog/woof.json`).then(res => res.json()).then(data => console.log(data)),
        fetch(`https://aws.random.cat/meow`).then(res => res.json()).then(data => console.log(data))
    ]
)
console.log(race)

// four

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
).then(res => console.log(res)).catch((error) => console.error(error));

const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
).then(res => console.log(res)).catch((error) => console.error(error));

const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
).then(res => console.log(res)).catch((error) => console.error(error));

let promiseSettled = Promise.allSettled(
    [one, two, three]
)

