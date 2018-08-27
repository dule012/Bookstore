import {
    booksArr
} from './dataModule.js'
import {
    createBookGrid,
    createBookList,
    bookInfoDisplay,
    postCommentsBookstoore,
    openAndCloseMobileWrappers,
    sumOfPricesAndCreateCartCard,
    createBookmarkCardandDelete,
    bookmarkIconChangeColor,
    GridorListView,
    searchingBooks,
    createLocalStorage,
    displayCartCardsFromLocalStorage
} from './UIModule.js'

const apiBooks = 'https://www.googleapis.com/books/v1/volumes?q=with&printType=books&projection=full&maxResults=40'

fetch(apiBooks).then((data) => {
    return data.json()
}).then((data) => {
    displayCartCardsFromLocalStorage(JSON.parse(localStorage.getItem('cartCardsArr')))
    createBookGrid(booksArr(data))
    createBookList(booksArr(data))
    bookInfoDisplay()
    postCommentsBookstoore()
    openAndCloseMobileWrappers()
    sumOfPricesAndCreateCartCard()
    createBookmarkCardandDelete()
    bookmarkIconChangeColor()
    GridorListView()
    searchingBooks()
    createLocalStorage()
})