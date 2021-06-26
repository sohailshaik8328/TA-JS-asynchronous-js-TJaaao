let ul = document.querySelector('ul');
let spaceflightNow = document.querySelector('.option1');

let data = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`);

function displayUI(newsData) {
    ul.innerHTML = "";
    newsData.forEach((news) => {
        let li = document.createElement('li');
        li.classList.add("card");
        li.classList.add('flex')

        let img = document.createElement('img');
        img.src = news.imageUrl;

        let div = document.createElement('div');
        div.classList.add('card_data')

        let source = document.createElement('p');
        source.innerText = news.newsSite

        let title = document.createElement('h2');
        title.innerText = news.title;

        let readMoreBtn = document.createElement('a');
        readMoreBtn.innerText = `Read More`;
        readMoreBtn.href = news.url;

        div.append(source, title, readMoreBtn);

     

        li.append(img, div);
        ul.append(li);
    })
}

spaceflightNow.addEventListener('click', () => {
    if(source.innerText == news.newsSite) {
        displayUI(newsData)
    }
})



data.then(res => res.json()).then(result => displayUI(result));