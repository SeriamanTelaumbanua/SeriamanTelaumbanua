let booksComplete = [];
// let booksComplete;
let booksIncomplete = [];
// let booksIncomplete;
let all;
const container = document.querySelector(".container");
const bookStorageComplete = "bookStorageComplete";
const bookStorageIncomplete = "bookStorageIncomplete";
const submenuAdd = document.getElementById("submenu-add");
const addForm = document.querySelector(".addForm");
const btnAdd = document.getElementById("btn-add");
const searchBox = document.querySelectorAll(".searchBox");

searchBox.forEach(function () {
    const btnSearch = document.getElementById('search');
    btnSearch.addEventListener("click", function () {
        let inputSearch = document.getElementById("inputSearch").value;
        if (inputSearch != "") {
            for (const book of all) {
                if (inputSearch === book.title) {
                    const mybook = document.querySelector('.mybook');
                    let resultCard = `<div class=cards>
                                        <figure>
                                            <img src="assets/2030-annual-report.jpg" alt="Gambar">
                                            <figcaption>
                                                <p>Judul : <span >${book.title}</span></span></p>
                                                <p>Tahun : <span >${book.year}</span></p>
                                                <button class="btn-modal" onclick="moreDetails">More</button>
                                            </figcaption>
                                        </figure>
                                    </div>`;
                    mybook.innerHTML = resultCard;
                }
            }
        }
    });
});

// let all = booksComplete.concat(booksIncomplete);
let titleHook;

const checkStorage = () => {
    if (typeof (localStorage) == undefined) {
        alert('Your Browser not support web storage');
    }
    console.log("Your Browser Support Local Storage");
}
checkStorage();

const loadData = () => {
    booksComplete = JSON.parse(localStorage.getItem(bookStorageComplete)) ? JSON.parse(localStorage.getItem(bookStorageComplete)) : [];
    booksIncomplete = JSON.parse(localStorage.getItem(bookStorageIncomplete)) ? JSON.parse(localStorage.getItem(bookStorageIncomplete)) : [];
    all = booksComplete.concat(booksIncomplete);

    const showCompleteBooks = document.querySelector(".complete");
    const showIncompleteBooks = document.querySelector(".incomplete");
    let cards = "";
    booksComplete.forEach(function (book) {
        const card = `<div class="cards">
                        <figure>
                            <img src="assets/2030-annual-report.jpg" alt="Gambar">
                            <figcaption>
                                <p>Judul : <span class="book-title">${book.title}</span></p>
                                <p>Tahun : <span >${book.year}</span></p>
                                <button class="btn-modal">More</button>
                            </figcaption>
                        </figure>
                    </div>`;
        cards += card;
    })
    showCompleteBooks.innerHTML = cards;
    cards = "";
    booksIncomplete.forEach(function (book) {
        const card = `<div class="cards">
                        <figure>
                            <img src="assets/sutet.webp" alt="Gambar">
                            <figcaption>
                                <p>Judul : <span >${book.title}</span></p>
                                <p>Tahun : <span >${book.year}</span></p>
                                <button class="btn-modal">More</button>
                            </figcaption>
                        </figure>
                    </div>`;
        cards += card;
    })
    showIncompleteBooks.innerHTML = cards;

    const mybook = document.querySelector(".mybook");
    mybook.addEventListener("click", function (e) {
        if (e.target.className == "btn-modal") {
            const parEl = e.target.parentElement;
            const booktitleEl = parEl.firstElementChild.firstElementChild;
            titleHook = booktitleEl.textContent;
            // console.log(titleHook);
            moreDetails(titleHook);
            // parEl = "";
            // booktitleEl = "";
            // titleHook = "";
        }
    })
    // })

}
loadData();

container.addEventListener("click", navigationModal);

// const addForm = document.getElementById("submenu-add");
submenuAdd.addEventListener("click", function (e) {
    // const addForm = document.querySelector(".addForm");
    addForm.classList.add('active');
    btnAdd.addEventListener("click", () => {
        addNewBook();
        addForm.remove();
        return false;

    });
    e.preventDefault();
})










function saveBook(status, newbook) {
    if (status == true) {
        booksComplete.push(newbook);
        localStorage.setItem(bookStorageComplete, JSON.stringify(booksComplete));
    } else {
        booksIncomplete.push(newbook);
        localStorage.setItem(bookStorageIncomplete, JSON.stringify(booksIncomplete));
    }
    // status = "";
    // newbook = "";
    console.log("Data Buku Tersimpan");
    loadData();
}

function makeBookData(Judul, Penulis, Tahun, Status) {
    this.id = String(new Date()),
        this.title = Judul,
        this.author = Penulis,
        this.year = Number(Tahun),
        this.isComplete = Status
}

function addNewBook(e) {
    let Judul = document.querySelector("#inputTitle").value;
    let Penulis = document.querySelector("#inputAuthor").value;
    let Tahun = document.querySelector("#inputYear").value;
    let checkBox = document.querySelector("#inputStatus");
    // console.log(checkBox.checked);
    let Status = checkBox.checked ? true : false;
    console.log(Status);
    let newBook = new makeBookData(Judul, Penulis, Tahun, Status);
    if (Judul == "" || Penulis == "" || Tahun == "") {
        alert("Isi data buku");
        return false;
    } else {
        saveBook(Status, newBook);

    }

}




// function searchBook() {
//     let inputSearch = document.getElementById("inputSearch").value;
//     const mybook = document.querySelector('.mybook');
//     if (inputSearch!="") {
//         for (const book of all) {
//             if (inputSearch === book.title) {
//                 let resultCard = `<div class=cards>
//                                     <figure>
//                                         <img src="assets/2030-annual-report.jpg" alt="Gambar">
//                                         <figcaption>
//                                             <p>Judul : <span >${book.title}</span></span></p>
//                                             <p>Tahun : <span >${book.year}</span></p>
//                                             <button class="btn-modal" onclick="moreDetails">More</button>
//                                         </figcaption>
//                                     </figure>
//                                 </div>`;
//                 mybook.innerHTML = resultCard;
//                 inputSearch = "";
//             }
//         }
//     }else{
//         console.log("not found");
//     }

//         // switch (inputSearch) {
//         //     case "":
//         //         {
//         //             console.log("Not Found");
//         //         }
//         //         break;
//         //     case book.title:
//         //         {
//         //             console.log("berhasil");
//         //         }
//         //         break;
//         //     default:
//         //         {
//         //             console.log("Not Found");
//         //         }

//         // }
//     }

//     if (inputSearch === "") {
//         loadData();
//         alert("Masukkan kata kunci");
//         return false;

//     } else{
//         for (const book of all) {
//             // let inputSearch = document.getElementById("inputSearch").value;
//             if (inputSearch === book.title) {
//                 const mybook = document.querySelector('.mybook');
//                 let resultCard = `<div class=cards>
//                                     <figure>
//                                         <img src="assets/2030-annual-report.jpg" alt="Gambar">
//                                         <figcaption>
//                                             <p>Judul : <span >${book.title}</span></span></p>
//                                             <p>Tahun : <span >${book.year}</span></p>
//                                             <button class="btn-modal" onclick="moreDetails">More</button>
//                                         </figcaption>
//                                     </figure>
//                                 </div>`;
//                 mybook.innerHTML = resultCard;
//             }
//         }
//     }
//     return false;
// }

function moreDetails(titleHook) {
    for (const book of all) {
        const modal = document.createElement('div');
        if (book.title == titleHook) {
            modal.id = "modal";
            modal.className = "modal";
            const contentModal = `<div class="modal-content">
                                    <div class="content">
                                        <figure>
                                            <img src="./assets/2030-annual-report.jpg" alt="Gambar" width="150px">
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
                                        <button class="btnDelete">Delete</button>
                                        <button class="btnMove">Move</button>
                                        <button class="close-modal">X</button>
                                    </div>
                                </div>`;
            modal.innerHTML = contentModal;
            container.appendChild(modal);
        }
    }
}


function navigationModal(e) {
    const modalEl = document.getElementById('modal');
    const btnTarget = e.target.className;
    // let x = e.target.parentElement;
    // console.log(x);
    // console.log(x.classList.length);

    switch (btnTarget) {
        case "btnDelete":
            {
                // console.log(btnTarget);
                for (const book of all) {
                    // console.log(booksComplete);
                    if (book.title == titleHook && book.isComplete == true) {
                        let newbooksComplete = booksComplete.filter(book => book.title !== titleHook);
                        booksComplete = newbooksComplete;
                        localStorage.setItem(bookStorageComplete, JSON.stringify(booksComplete));
                        modalEl.remove();
                        loadData();
                        // console.log(booksComplete);
                        // console.log(all);
                        titleHook = "";
                        return false;
                    } else if (book.title == titleHook && book.isComplete == false) {
                        // console.log(book.title);
                        // console.log(booksIncomplete);
                        let newbooksIncomplete = booksIncomplete.filter(book => book.title !== titleHook);
                        booksIncomplete = newbooksIncomplete;
                        localStorage.setItem(bookStorageIncomplete, JSON.stringify(booksIncomplete));
                        modalEl.remove();
                        loadData();
                        // console.log(booksIncomplete);
                        // console.log(all);
                        titleHook = "";
                        return false;
                    }
                }

            }
            break;
        case "btnMove":
            {
                console.log(btnTarget);
                for (const book of all) {
                    if (book.title == titleHook && book.isComplete == true) {
                        let newbooksComplete = booksComplete.filter(book => book.title !== titleHook);
                        booksComplete = newbooksComplete;
                        localStorage.setItem(bookStorageComplete, JSON.stringify(booksComplete));

                        let book = booksComplete.filter(book => {
                            return book.title == titleHook;
                        }



                            // if (book.title == titleHook) {
                            //     let newBook = new makeBookData(book.title, book.author, book.year, false);
                            //     console.log(newBook);
                            //     // booksIncomplete.push(newBook);
                            //     // localStorage.setItem(bookStorageIncomplete, JSON.stringify(booksIncomplete));
                            //     // loadData();
                            //     modalEl.remove();
                            //     newBook = "";
                            //     return false;
                            // }
                        );
                        console.log(book);



                    } else if (book.title == titleHook && book.isComplete == false) {
                        let newbooksIncomplete = booksIncomplete.filter(book => book.title !== titleHook);
                        booksIncomplete = newbooksIncomplete;
                        localStorage.setItem(bookStorageIncomplete, JSON.stringify(booksIncomplete));

                        booksIncomplete.filter(book => {
                            if (book.title == titleHook) {
                                let newBook = new makeBookData(book.title, book.author, book.year, true);
                                booksComplete.push(newBook);
                                localStorage.setItem(bookStorageComplete, JSON.stringify(booksComplete));
                                newBook = "";
                                modalEl.remove();
                                loadData();
                                return false;
                            }
                        });
                    }
                    titleHook = "";
                }
                // e.stopPropagation();

            }
            break;
        case "close-modal":
            {
                modalEl.remove();
            }
            break;
    }
    e.preventDefault();
}







