const newBook_btn = document.querySelector('.newbook-btn');
const card_container = document.querySelector('.card-container');
const form_modal = document.querySelector('.form-group');
const add_btn = document.querySelector('.add-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const closeIcon = document.querySelector('.close-icon');
const bookCard = document.querySelectorAll('.card');
//const bookStatus = document.querySelector('')






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

Object.setPrototypeOf(BookInfo.prototype,Book.prototype);  //this sets BookInfo object prototype to match Book prototype


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
    
    //created a loop that iterates through the myLibrary array and displays the card for each book
    for(let i = 0; i < myLibrary.length; i++){ 
        let card = document.createElement('div');
        card.classList.add('card');
        let title = document.createElement('p');
        let bk_author = document.createElement('p');
        bk_author.classList.add('bk-author');
        title.classList.add('bk-title');
        title.textContent = myLibrary[i].title;
        bk_author.textContent = myLibrary[i].author;

        let coverDiv = document.createElement('div');
        coverDiv.classList.add('book-image');

        let coverImage = document.createElement('img');
        coverImage.src = selectImage();

        let icons_ctn = document.createElement('div');
        icons_ctn.classList.add('icons-div');

        let iconDel = document.createElement('i');
        iconDel.innerHTML = '<i class="fa-solid fa-trash"></i>';

        //added an eventlistener to call a function to delete the book on click
        iconDel.addEventListener('click', () =>{
            const bookToDelete = i
            myLibrary.splice(bookToDelete, 1);
            card.remove();
            }
        );

        let iconHeart = document.createElement('i');
        iconHeart.innerHTML = '<i class="fa-regular fa-heart"></i>';

        let readStatus = document.createElement('div');
        readStatus.classList.add('read-status');
        readStatus.textContent = 'Unread';

        readStatus.addEventListener('click', () =>{
            this.status = 'Read'
           
            readStatus.textContent = 'Read';
            readStatus.style.backgroundColor = 'green';
        })

    
        coverDiv.appendChild(coverImage);
        card.appendChild(coverDiv);
        card.appendChild(title);
        card.appendChild(bk_author);
        icons_ctn.appendChild(iconDel);
        icons_ctn.appendChild(iconHeart);
        icons_ctn.appendChild(readStatus);
        card.appendChild(icons_ctn);
        card_container.appendChild(card);
    
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
    bookTitle.focus();

});

//function to select random images to upload

function selectImage(){
    let images = ['imageFolder/A.jpg','imageFolder/B.jpg', 'imageFolder/C.jpg','imageFolder/D.jpg'];

    let randomIndex = Math.floor((Math.random() * images.length));
    return images[randomIndex];
}

//function to delete book card








//function to disable book submission button

