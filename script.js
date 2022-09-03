const container = document.querySelector('.container');
const addMenu = document.querySelector('.addMenu');
const completeCards = document.querySelector('.complete-cards');
const incompleteCards = document.querySelector('.incomplete-cards');
const mybook = document.querySelector('.mybook');
const imgModal = document.getElementById('img-modal');

const keyStorage = "bookApp";
let books = [];
let completeBooks = [];
let incompleteBooks = [];
let cardSearch;


const checkStorage = () => {
    if (typeof (Storage) == undefined) {
        alert("Your browser not support web storage");
        return false;
    }
    return true;
};

const saveBook = () => {
    const stringifyBookData = JSON.stringify(books);
    localStorage.setItem(keyStorage, stringifyBookData);
    document.dispatchEvent(new Event('ondatasaved'));
};

const loadDatafromStorage = () => {
    const getDataLocal = localStorage.getItem(keyStorage);
    const parseBookData = JSON.parse(getDataLocal);
    if (parseBookData !== null) {
        books = parseBookData;
        for (book of books) {
            if (book.isComplete) {
                completeBooks.push(book);
            } else {
                incompleteBooks.push(book);
            }
        }
    } else {
        console.log("Buku Masih Kosong");
    }
    // console.log(`Total buku yang sudah dibaca : ${completeBooks.length}`);
    // console.log(`Total buku yang belum dibaca : ${incompleteBooks.length}`);
    showBooks();
    document.dispatchEvent(new Event('ondataloaded'));
};
loadDatafromStorage();

function showBooks(e) {
    let cards = "";
    for (book of completeBooks) {
        let card = `<div class="cards">
                        <figure>
                            <img src="assets/2030-annual-report.jpg" alt="Gambar">
                            <hr>
                            <figcaption>
                                <p>Judul : <span id="judul-buku">${book.title}</span></p>
                                <p>Tahun : <span >${book.year}</span></p>
                                <button class="btn-modal" id="btn-modal">More</button>
                            </figcaption>
                        </figure>
                    </div>`;
        cards += card;
    }
    completeCards.innerHTML = cards;
    cards = "";
    for (book of incompleteBooks) {
        let card = `<div class="cards">
                        <figure>
                            <img src="assets/different-winter.jpg" alt="Gambar">
                                <hr>
                            <figcaption>
                                <p>Judul : <span id="judul-buku">${book.title}</span></p>
                                <p>Tahun : <span >${book.year}</span></p>
                                <button class="btn-modal" id="btn-modal">More</button>
                            </figcaption>
                        </figure>
                    </div>`;
        cards += card;
    }
    incompleteCards.innerHTML = cards;
    cards = "";

}

const updateDatatoStorage = () => {
    if (checkStorage()) {
        saveBook();
    }
};

const makeBookData = (bookTitle, bookAuthor, bookYear, bookStatus) => {
    return {
        id: String(new Date()),
        title: bookTitle,
        author: bookAuthor,
        year: Number(bookYear),
        isComplete: bookStatus
    }
};


const addForm = () => {
    const divForm = document.createElement('div');
    divForm.className = "addForm";
    divForm.id = "addForm";
    formData = ` <h2>Tambahkan Buku</h2>
                <form id="form-data">
                    <p><span>Judul</span> <input type="text" id="inputTitle" placeholder="Title" required></p>
                    <p><span>Penulis</span> <input type="text" id="inputAuthor" placeholder="Author" required></p>
                    <p><span>Tahun</span><input type="number" id="inputYear" placeholder="Year" required></p>
                    <p><span>Status Baca</span><input type="checkbox" id="inputStatus" placeholder="Status"></p>
                    <div id="btn-form">
                        <button type="submit" id="btn-add">Tambah</button>
                        <button type="button" id="btn-close">Close</button>
                    </div>
                </form>`;
    divForm.innerHTML = formData;
    return divForm;
};

container.addEventListener("click", (e) => {
    if (e.target.className == 'addMenu') {
        container.appendChild(addForm());
        const form = document.getElementById('addForm');
        const btnAdd = document.getElementById('btn-add');
        const btnClose = document.getElementById('btn-close');
        btnClose.addEventListener('click', () => {
            form.remove();
        })
        btnAdd.addEventListener('click', () => {
            let Judul = document.getElementById('inputTitle').value;
            let Penulis = document.getElementById('inputAuthor').value;
            let Tahun = document.getElementById('inputYear').value;
            let Status = document.getElementById('inputStatus').checked ? true : false;
            let newBook = makeBookData(Judul, Penulis, Tahun, Status);

            if (Judul == "" || Penulis == "" || Tahun == "") {
                console.log("Isi dulu");
            } else {
                books.push(newBook);
                updateDatatoStorage();
                Judul = "";
                Penulis = "";
                Tahun = "";
                Status = "";
                newBook = "";
            }
        });

    }
    if (e.target.className == "btn-modal") {
        let judulBuku = e.target.parentElement.firstChild.nextElementSibling.lastChild.textContent;
        moreDetails(judulBuku);
        judulBuku = "";
    }

    if (e.target.id == "input-search") {
        const btnSearch = document.getElementById('search');
        const inputSearch = document.getElementById('input-search');
        inputSearch.addEventListener('input', (e) => {
            console.log(inputSearch.value);
            btnSearch.addEventListener('click', (e) => {
                if (inputSearch.value != "") {
                    const bookResult = books.filter(book => { return book.title == inputSearch.value });
                    if (bookResult.length > 0) {
                        for (book of bookResult) {
                            if (book.isComplete) {
                                cardSearch = `<div class="card-result">
                                                    <figure>
                                                        <img src="assets/2030-annual-report.jpg" alt="Gambar">
                                                        <hr>
                                                        <figcaption>
                                                            <p>Judul : <span id="judul-buku">${book.title}</span></p>
                                                            <p>Tahun : <span >${book.year}</span></p>
                                                            <button class="btn-modal" id="btn-modal">More</button>
                                                        </figcaption>
                                                    </figure>
                                                </div>`;

                            } else {
                                cardSearch = `<div class="card-result">
                                                    <figure>
                                                        <img src="assets/different-winter.jpg" alt="Gambar">
                                                        <hr>
                                                        <figcaption>
                                                            <p>Judul : <span id="judul-buku">${book.title}</span></p>
                                                            <p>Tahun : <span >${book.year}</span></p>
                                                            <button class="btn-modal" id="btn-modal">More</button>
                                                        </figcaption>
                                                    </figure>
                                                </div>`;
                            }

                        }
                    } else {
                        cardSearch = `<p>${inputSearch.value} Not Found ..!!!</p>`;

                    }

                }
                mybook.innerHTML = cardSearch;
                cardSearch = "";
                e.preventDefault();

            })

        })
    }
});


const moreDetails = (judulBuku) => {
    for (book of books) {
        let contentModal;
        const divModal = document.createElement('div');
        divModal.id = "modal";
        divModal.className = "modal";
        if (book.title == judulBuku) {
            if (book.isComplete) {
                contentModal = `<div class="modal-content">
                                    <div class="content">
                                        <figure>
                                            <img id="img-modal" src="./assets/2030-annual-report.jpg" alt="Gambar" width="150px">
                                        </figure>
                                        <figcaption>
                                            <p>Id     <span>: ${book.id}</span></p>
                                            <p>Judul  <span>: ${book.title}</span></p>
                                            <p>Penulis<span>: ${book.author}</span></p>
                                            <p>Tahun  <span>: ${book.year}</span></p>
                                            <p>Status <span>: ${book.isComplete}</span></p>
                                        </figcaption>
                                    </div>
                                    <div class="navModal">
                                        <button class="btn-delete">Delete</button>
                                        <button class="btn-move">Move</button>
                                        <button class="btn-close">X</button>
                                    </div>
                                 </div>`;
                divModal.innerHTML = contentModal;
                container.appendChild(divModal);
            } else {
                contentModal = `<div class="modal-content">
                                    <div class="content">
                                        <figure>
                                            <img id="img-modal" src="./assets/different-winter.jpg" alt="Gambar" width="150px">
                                        </figure>
                                        <figcaption>
                                            <p>Id     <span>: ${book.id}</span></p>
                                            <p>Judul  <span>: ${book.title}</span></p>
                                            <p>Penulis<span>: ${book.author}</span></p>
                                            <p>Tahun  <span>: ${book.year}</span></p>
                                            <p>Status <span>: ${book.isComplete}</span></p>
                                        </figcaption>
                                    </div>
                                    <div class="navModal">
                                        <button class="btn-delete">Delete</button>
                                        <button class="btn-move">Move</button>
                                        <button class="btn-close">X</button>
                                    </div>
                                 </div>`;
                divModal.innerHTML = contentModal;
                container.appendChild(divModal);
            }

        }
    }
    const modal = document.querySelector('.modal');
    modal.addEventListener('click', (e) => {
        const btnTarget = e.target.className;
        switch (btnTarget) {
            case 'btn-delete': {
                books = books.filter(el => { return el.title != judulBuku; });
                updateDatatoStorage();
                modal.remove();
                document.location.reload(true);
                break;
            }
            case 'btn-move': {
                let booktoMove = books.filter(el => { return el.title == judulBuku; });
                books = books.filter(el => { return el.title != judulBuku });
                console.log(`ini books ${books.length}`);
                console.log(booktoMove[0].isComplete);
                if (booktoMove[0].isComplete) {
                    let bookDatatoMove = makeBookData(booktoMove[0].title, booktoMove[0].author, booktoMove[0].year, false);
                    books.push(bookDatatoMove);
                    bookDatatoMove = "";
                    modal.remove();
                    updateDatatoStorage();

                } else {
                    let bookDatatoMove = makeBookData(booktoMove[0].title, booktoMove[0].author, booktoMove[0].year, true);
                    books.push(bookDatatoMove);
                    bookDatatoMove = "";
                    modal.remove();
                    updateDatatoStorage();
                }
                document.location.reload(true);
                booktoMove = "";
                break;
            }
            case 'btn-close': {
                modal.remove();
                break;
            }
        }
    })
}



