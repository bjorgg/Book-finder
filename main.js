const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.querySelector('#clear-btn');
const contentDiv = document.getElementById("books");
const radios = document.querySelectorAll('.radio-input');
 
// Event listener on the input, enables you to press the enter key to search
searchBar.addEventListener("keyup", e => {
    (e.code === 'Enter') ? searchBtn.click() : ""
}); 
 

// Clear search results and input field by clicking on clear button
clearBtn.addEventListener("click", () => {
    contentDiv.innerHTML ="";
    searchBar.value ="";
})


searchBtn.addEventListener('click', () => {
    if (!searchBar || !searchBar.value) return;
    const searchStr = searchBar.value;
    const orderBy = document.querySelector(".radio-input:checked").value;
    getBooks(searchStr, orderBy);
});

function getBooks (searchStr, orderBy) {
    fetch(`http://localhost:3000/books?q=${searchStr}&orderBy=${orderBy}`)
    .then(r=>r.json())
    .then(data => {
        console.log(data);

        const books = data.items;
        displayBooks(books);
    })
    .catch(error => {
        console.error(error);
    });
}



function displayBooks(books) {
    contentDiv.innerHTML ="";

    const bookEl = books.map(book => {
        let bookImage;
        (book.volumeInfo.imageLinks)
           ? bookImage = `<img class="book-cover" src="${book.volumeInfo.imageLinks.thumbnail}"></img>`
           : bookImage = `<div class="no-img">No image available</div>`
        return `
        <div class="book"> 
            <div>
                ${bookImage}
            </div>
            <div class="info-wrapper">
                <div class="book-title">
                    <h2>${book.volumeInfo.title}</h2>
                </div>
                <div class="book-info">
                    <strong>Authors:</strong> <span>${book.volumeInfo.authors}</span><br>
                    <strong>Publisher:</strong> <span>${book.volumeInfo.publisher}</span><br>
                    <strong>Published date:</strong> <span>${book.volumeInfo.publishedDate}</span><br>
                    <strong>Average rating:</strong> <span>${book.volumeInfo.averageRating}</span><br>
                    <strong>Categories:</strong> <span>${book.volumeInfo.categories}</span><br>
                </div>
                <div>
                    <a href="${book.volumeInfo.previewLink}" target="blank"><img class="google-btn" alt="Google preview" src="images/gbs_preview_button1.gif"></a>
                </div>
            </div>
        </div>
    `;
    });

    contentDiv.innerHTML = bookEl.join("");   
}


radios.forEach(radio => radio.addEventListener('change', () => {
    if (!searchBar || !searchBar.value) return;
     const searchStr = searchBar.value;
     const orderBy = document.querySelector(".radio-input:checked").value;
     getBooks(searchStr, orderBy);
}));


