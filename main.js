// Getting elements from the DOM and storing them in global variables
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.querySelector('#clear-btn');
const contentDiv = document.getElementById("books");
const radios = document.querySelectorAll('.radio-input');
// The backend server url stored in a variable
const apiUrl = "https://javascript-backend-server.vercel.app";

// Event listener on the input, enables you to press the enter key to search
searchBar.addEventListener("keyup", e => {
    // Conditional ternary operator instead of if/else statement
    (e.code === 'Enter') ? searchBtn.click() : ""
}); 
 

// Clear search results and input field by clicking on clear button
clearBtn.addEventListener("click", () => {
    contentDiv.innerHTML ="";
    searchBar.value ="";
})


// Listen to the search button. If the input is empty, do nothing else get the input
// value and the radio button value and call the getBooks function.
searchBtn.addEventListener('click', () => {
    if (!searchBar || !searchBar.value) return;
    const searchStr = searchBar.value;
    const orderBy = document.querySelector(".radio-input:checked").value;
    getBooks(searchStr, orderBy);
});


// Function to get the books from the server. 
function getBooks (searchStr, orderBy) {
    // Fetch from the local host. Fetch() method returns a promise.
    fetch(`${apiUrl}/books?q=${searchStr}&orderBy=${orderBy}`)
    // Then() methods to handle the promise. The promise will resolve into a response object
    // Return json method to handle the respective type of data.
    .then(r=>r.json())
    // Calling the displayBooks function and pass the data in.
    .then(data => {
        console.log(data);
        const books = data.items;
        displayBooks(books);
    })
    // Catching errors
    .catch(error => {
        console.error(error);
    });
}


// Function to display books in the DOM
function displayBooks(books) {
    contentDiv.innerHTML ="";
    // Mapping the book result array and returning elements and values
    const bookEl = books.map(book => {
        let bookImage;
        // Conditional ternary operator instead of if/else statement to handle if image link is missing in result
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
    // Joining the map result and displaying it in DOM.
    contentDiv.innerHTML = bookEl.join("");   
}

// Listen for chance in the radio buttons to sort the results by relevance or newest.
// Then call the getBooks function
radios.forEach(radio => radio.addEventListener('change', () => {
    if (!searchBar || !searchBar.value) return;
     const searchStr = searchBar.value;
     const orderBy = document.querySelector(".radio-input:checked").value;
     getBooks(searchStr, orderBy);
}));


