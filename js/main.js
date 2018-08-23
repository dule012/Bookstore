import booksArr from './dataModule.js'
import {
    createBookGrid,
    createBookList,
    bookInfoDisplay,
    openAndCloseCartWrapper,
    openAndCloseLoginWrapper,
    postCommentsBookstoore,
    openAndCloseMobileWrappers,
    sumOfPricesAndCreateCartCard,
    createBookmarkCardandDelete,
    bookmarkIconChangeColor,
    GridorListView,
    searchingBooks
} from './UIModule.js'

const apiBooks = 'https://www.googleapis.com/books/v1/volumes?q=with&printType=books&projection=full'

fetch(apiBooks).then((data) => {
    return data.json()
}).then((data) => {
    createBookGrid(booksArr(data))
    createBookList(booksArr(data))
    bookInfoDisplay()
    openAndCloseCartWrapper()
    openAndCloseLoginWrapper()
    postCommentsBookstoore()
    openAndCloseMobileWrappers()
    sumOfPricesAndCreateCartCard()
    createBookmarkCardandDelete()
    bookmarkIconChangeColor()
    GridorListView()
    searchingBooks()
})