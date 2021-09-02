// hide error
document.getElementById('error-message').style.display = 'none';

const loadBookLibray = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear the input value
    searchField.value = '';

    if(searchText === ''){
        displayError();
    }
    else{
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';

        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch (url)
        .then(res => res.json())
        .then(data => displayBookLibray(data))
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('search-result').textContent ='';
}

const displayBookLibray = booksData => {
    // console.log(booksData);
    const searchResultContainer = document.getElementById('search-result');
    // clear the previous search result
    searchResultContainer.textContent = '';

    const fundNumber = document.getElementById('found-number')
    // clear the previous search item found
    fundNumber.textContent = '';

    const books = booksData.docs;
    
    if(books === null){
        displayError();
    }
    else{
        document.getElementById('error-message').style.display = 'none';

        const h1 = document.createElement('h1');
        h1.classList.add('style-h1')
        h1.innerText = `Books Found: ${booksData.numFound}`;
        fundNumber.appendChild(h1);

        books.forEach (book => {
            // console.log(book);
    
            const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            // console.log(imgUrl);
    
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <h5>Author Name: ${book.author_name[0]}</h5>
                    <h5>Publisher: ${book.publisher}</h5>
                    <h5>First Published Year : ${book.first_publish_year}</h5>
                </div>
            </div>
            `
            searchResultContainer.appendChild(div);
        })
    }
    
}
