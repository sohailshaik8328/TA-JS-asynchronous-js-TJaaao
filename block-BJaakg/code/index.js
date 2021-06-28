(function () {
    let url = `https://www.anapioficeandfire.com/api/books`;
let ul = document.querySelector('ul');

let fetchedURL = fetch(url);

function handleSpinner(status = false) {
    if(status) {
        ul.innerHTML = ` <div class="spinner center"><div class="donut"></div></div>`;
    }
}

function displayUI(data) {
    ul.innerHTML = "";
    data.forEach(elm => {
        let li = document.createElement('li');
        li.classList.add('card');

        let name = document.createElement('h2');;
        name.innerText = elm.name;

        let author = document.createElement('p');
        author.innerText = elm.authors;

        let characters = document.createElement('a');
        characters.innerText = ` Show characters (${elm.characters.length})`;

        li.append(name, author, characters);
        ul.append(li);
    })
}

function init() {
    handleSpinner(true)
    fetchedURL
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Something went wrong!");
        }
    })
    .then(result => {
        handleSpinner();
        displayUI(result);
    })
    .catch(error => ul.innerHTML = error);
}

if(navigator.onLine) {
    init()
}else {
    throw new Error("Something went wrong!");
}

init();

})();