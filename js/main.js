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
    searchingBooks
} from './UIModule.js'

const apiBooks = 'https://www.googleapis.com/books/v1/volumes?q=with&printType=books&projection=full&maxResults=40'

fetch(apiBooks).then((data) => {
    return data.json()
}).then((data) => {
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
})