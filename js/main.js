import booksArr from './dataModule.js'
import {
    createBookGrid,
    bookInfoDisplay,
    // bookmarkIconChangeColor
    openAndCloseCartWrapper,
    openAndCloseLoginWrapper,
    postCommentsBookstoore,
    openAndCloseMobileWrappers,
    sumOfPrices
} from './UIModule.js'

const apiBooks = 'https://www.googleapis.com/books/v1/volumes?q=with&printType=books&projection=full'

fetch(apiBooks).then((data) => {
    return data.json()
}).then((data) => {
    createBookGrid(booksArr(data))
    bookInfoDisplay()
    openAndCloseCartWrapper()
    openAndCloseLoginWrapper()
    postCommentsBookstoore()
    openAndCloseMobileWrappers()
    sumOfPrices()
})