const loadBookLibray = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear the input value
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displayBookLibray(data))
}

const displayBookLibray = booksData => {
    console.log(booksData);
    const searchResultContainer = document.getElementById('search-result');
    // clear the previous search result
    searchResultContainer.textContent = '';

    const fundNumber = document.getElementById('found-number')
    // clear the previous search item found
    fundNumber.textContent = '';
    const h1 = document.createElement('h1');
    h1.classList.add('style-h1')
    h1.innerText = `Books Found: ${booksData.numFound}`;
    fundNumber.appendChild(h1);

    const books = booksData.docs;
    books.forEach (book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        searchResultContainer.appendChild(div);
    })
    
}
