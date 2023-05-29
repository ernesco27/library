const newBook_btn = document.querySelector('.newbook-btn');
const card_container = document.querySelector('.card-container');
const form_modal = document.querySelector('.form-group');
const add_btn = document.querySelector('.add-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const closeIcon = document.querySelector('.close-icon');
const bookCard = document.querySelectorAll('.card');
const inputs = document.querySelectorAll('input');



function getSelectedOption(){
    const read = document.querySelector('#read');
    const unread = document.querySelector('#unread');

    if(read.checked){
        return read.value
    }else if(unread.checked){
        return unread.value
    }
}



let myLibrary = [];


// function Book(title,author){
//     this.title = title,
//     this.author = author
// }

// function BookInfo(title,author,pages,bookStatus,coverImage){
//     Book.call(this,title,author);
//     this.pages = pages,
//     this.bookStatus = bookStatus,
//     this.coverImage = coverImage
// }



// Object.setPrototypeOf(BookInfo.prototype,Book.prototype);  //this sets BookInfo object prototype to match Book prototype


class Book{
    constructor(title,author,pages,bookStatus,coverImage){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.bookStatus = bookStatus;
        this.coverImage = coverImage;
    }
}


//this function adds the new book to the myLibrary array



function addBookToLibrary(){
    let bookStatus = getSelectedOption();
    let coverImage = selectImage();
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value,bookStatus,coverImage);


    myLibrary.push(book);
    displayBook();
    closeModal();
}



//this function is to display the books in the array to the grid
function displayBook(){
    card_container.textContent = '';
    let bookStatus = getSelectedOption();
    let coverImage = selectImage();
    
    //created a loop that iterates through the myLibrary array and displays the card for each book
    for(let i = 0; i < myLibrary.length; i++){ 
        let book = myLibrary[i];
        let card = document.createElement('div');
        card.classList.add('card');
        //created title and author elements
        let title = document.createElement('p');
        let bk_author = document.createElement('p');
        bk_author.classList.add('bk-author');
        title.classList.add('bk-title');
        title.textContent = book.title;
        bk_author.textContent = book.author;

        //created elements for pages
        let pages = document.createElement('p');
        pages.classList.add('bk-pages');
        pages.textContent = `Pages: ${book.pages}`;

        let coverDiv = document.createElement('div');
        coverDiv.classList.add('book-image');

        let coverImage = document.createElement('img');
        coverImage.src = book.coverImage;

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

        //this creates the element for the read status of each book with a read status button that returns the book status when clicked
        let readStatus = document.createElement('button');
       
        function checkReadStatus(){
            if(book.bookStatus === 'read'){
                readStatus.textContent = book.bookStatus;
                readStatus.classList.add('read-status2');
            }else if(book.bookStatus === 'unread'){
                readStatus.textContent = book.bookStatus;
                readStatus.classList.add('read-status')
            }
        }

        checkReadStatus();


    
       //below adds an event listener to the readstatus button

        readStatus.addEventListener('click', () =>{
            changeBookStatus(i);
            if(book.bookStatus === 'read'){
                 readStatus.textContent = book.bookStatus;
                 readStatus.style.backgroundColor = 'green'
            }else{
                readStatus.textContent = book.bookStatus;
                readStatus.style.backgroundColor = 'red'
            }
        })
    

    //this adds the various DOM elements to the DOM
        coverDiv.appendChild(coverImage);
        card.appendChild(coverDiv);
        card.appendChild(title);
        card.appendChild(bk_author);
        card.appendChild(pages);
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
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';

}

//added event listeners to the various buttons
add_btn.addEventListener('click', addBookToLibrary);
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

//function to change the book status when called

function changeBookStatus(book){
    if(myLibrary[book].bookStatus === 'read'){
        myLibrary[book].bookStatus = 'unread';
    }else{
        myLibrary[book].bookStatus = 'read';
    }

}


