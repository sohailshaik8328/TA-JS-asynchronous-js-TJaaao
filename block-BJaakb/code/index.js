let input = document.querySelector("input");
let ul = document.querySelector('ul');

function displayUI(data) {
    ul.innerHTML = "";
    data.results.forEach(elm => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = elm.urls.small;
        li.append(img);
        ul.append(img);
    });
};

function handleInput(event) {
    if(event.keyCode === 13) {
        fetch(event);
    }
}

function fetch(event) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = `https://api.unsplash.com/search/photos?query=${event.target.value}&client_id=O6-HgHCU6Jg_aNZvpAHOAACPMyV5RZ4RiEo5tvgg9vY`;
        xhr.open("GET", url);
        xhr.onload = () => {
            let searchData = resolve(JSON.parse(xhr.response));
            // let searchData = JSON.parse(xhr.response);
            console.log(searchData);
            displayUI(searchData);
        }
        xhr.onerror = () => {
            reject(`Something went wrong!`);
        }
        xhr.send();
        event.target.value = "";
    })
}




input.addEventListener("keyup", handleInput);