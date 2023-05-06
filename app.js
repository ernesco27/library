const newBook_btn = document.querySelector('.newbook-btn');
const card_container = document.querySelector('.card-container');
const form_modal = document.querySelector('.form-group');
const add_btn = document.querySelector('.add-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const closeIcon = document.querySelector('.close-icon');


let myLibrary = [];

function Book(title,author){
    this.title = title,
    this.author = author
}

function BookInfo(title, author,pages,status){
    Book.call(this,title,author);
    this.pages = pages,
    this.status = status
}

Object.setPrototypeOf(BookInfo.prototype,Book.prototype);  //this sets BookInfo prototype to match Book


//this function adds the new book to the myLibrary array
function addBookToLibrary(){
    let book = new Book(bookTitle.value, bookAuthor.value);
    myLibrary.push(book);
    displayBook();
    closeModal();

}

//this function is to display the books in the array to the grid
function displayBook(){
    card_container.textContent = '';
    for(let i = 0; i < myLibrary.length; i++){
    let card = document.createElement('div');
    card.classList.add('card');

    let title = document.createElement('p');
    let bk_author = document.createElement('p');
    bk_author.classList.add('bk-author');
    title.classList.add('bk-title');
    title.textContent = myLibrary[i].title;
    bk_author.textContent = myLibrary[i].author;

    if(myLibrary.includes(myLibrary[i].title && myLibrary[i].author)){
        alert('Book Already Listed');
        return
        

        }else{
            card.appendChild(title);
            card.appendChild(bk_author);
            card_container.appendChild(card);
            
        }
    } 
}



//this function is to close the new book modal
function closeModal(){
    form_modal.style.display = 'none';
}

//added event listeners to the various buttons
add_btn.addEventListener('click',addBookToLibrary);
closeIcon.addEventListener('click', closeModal);

//this button displays the new book modal
newBook_btn.addEventListener('click', () => {
    form_modal.style.display = 'block';

});

