const homeIcon = document.querySelector('.home-icon')
const info = document.querySelector('.info')
homeIcon.addEventListener('click', () => {
    info.classList.toggle('block')
})

const loginIcon = document.querySelector('.login-icon')
const login = document.querySelector('.login-wrapper')
loginIcon.addEventListener('click', () => {
    login.classList.toggle('block')
})

const comments = document.querySelector('.comments')
const commentsIcon = document.querySelector('.comments-icon')

commentsIcon.addEventListener('click', () => {
    comments.classList.toggle('block')
})

const cartWrapperMobile = document.querySelector('.cart-wrapper')
const cartIcon = document.querySelector('.cart-icon')

cartIcon.addEventListener('click', () => {
    cartWrapperMobile.classList.toggle('block')
})

const search = document.querySelector('header input')
const searchOutput = document.querySelector('.search-output')

search.addEventListener('keydown', () => {
    searchOutput.classList.toggle('block')
})



const createBookGrid = (arr) => {

    const container = document.querySelector('.container')
    const starWrapperGrid = document.getElementsByClassName('star-wrapper-grid')
    arr.forEach((el, i) => {
        let bookCardGrid = document.createElement('div')
        bookCardGrid.setAttribute('class', 'book-card-grid')
        bookCardGrid.setAttribute('key', el.id)

        let image = document.createElement('img')
        image.setAttribute('src', el.smallThumbnail)
        image.setAttribute('alt', 'Book Image')
        bookCardGrid.append(image)

        let pTitle = document.createElement('p')
        pTitle.setAttribute('class', 'book-title-grid')

        let pTitleA = document.createElement('a')
        pTitleA.setAttribute('href', './bookInfo.html')
        if (el.title.length > 35) {
            let aTextTitle = document.createTextNode(el.title.slice(0, 35) + '...')
            pTitleA.append(aTextTitle)
            pTitle.append(pTitleA)
            bookCardGrid.append(pTitle)
        } else {
            let aTextTitle = document.createTextNode(el.title)
            pTitleA.append(aTextTitle)
            pTitle.append(pTitleA)
            bookCardGrid.append(pTitle)
        }

        let pAuthor = document.createElement('p')
        pAuthor.setAttribute('class', 'book-author-grid')
        pAuthor.setAttribute('key', el.id)

        let pAuthorA = document.createElement('a')
        pAuthorA.setAttribute('href', './bookInfo.html')
        if (el.author.legnth > 35) {
            let aTextAuthor = document.createTextNode(el.author.slice(0, 35) + '...')
            pAuthorA.append(aTextAuthor)
            pAuthor.append(pAuthorA)
            bookCardGrid.append(pAuthor)
        } else {
            let aTextAuthor = document.createTextNode(el.author)
            pAuthorA.append(aTextAuthor)
            pAuthor.append(pAuthorA)
            bookCardGrid.append(pAuthor)
        }

        let divPriceWrapper = document.createElement('div')
        divPriceWrapper.setAttribute('class', 'prive-wrapepr')

        let pPriceGrid = document.createElement('p')
        pPriceGrid.setAttribute('class', 'book-price-grid')
        let pPriceGridText = document.createTextNode(el.price + ' $')
        pPriceGrid.append(pPriceGridText)
        divPriceWrapper.append(pPriceGrid)

        let pCartGrid = document.createElement('p')
        pCartGrid.setAttribute('class', 'book-cart-grid')
        let pCartGridText = document.createTextNode('+')
        pCartGrid.append(pCartGridText)
        let iCartGrid = document.createElement('i')
        iCartGrid.setAttribute('class', 'fa fa-shopping-cart')
        pCartGrid.append(iCartGrid)
        divPriceWrapper.append(pCartGrid)
        bookCardGrid.append(divPriceWrapper)

        let bookCardInfo = document.createElement('div')
        bookCardInfo.setAttribute('class', 'book-card-info')

        let pInfoTitle = document.createElement('p')
        pInfoTitle.setAttribute('class', 'book-info-title')
        let pInfoTitleText = document.createTextNode(el.title)
        pInfoTitle.append(pInfoTitleText)
        bookCardInfo.append(pInfoTitle)

        let pInfoAuthor = document.createElement('p')
        pInfoAuthor.setAttribute('class', 'book-info-author')
        let pInfoAuthorText = document.createTextNode(el.author)
        pInfoAuthor.append(pInfoAuthorText)
        bookCardInfo.append(pInfoAuthor)

        let pSummary = document.createElement('p')
        pSummary.setAttribute('class', 'book-info-summary')
        let pSummaryText = document.createTextNode('summary')
        pSummary.append(pSummaryText)
        bookCardInfo.append(pSummary)

        let pDescription = document.createElement('p')
        pDescription.setAttribute('class', 'book-info-description')

        if (el.description != undefined) {
            let pDescriptionText = document.createTextNode(el.description.slice(0, el.description.indexOf(' ', 70)) + '...')
            pDescription.append(pDescriptionText)
            bookCardInfo.append(pDescription)
        } else {
            let pDescriptionTextNone = document.createTextNode('none')
            pDescription.append(pDescriptionTextNone)
            bookCardInfo.append(pDescription)
        }

        let divStarWrapperGrid = document.createElement('div')
        divStarWrapperGrid.setAttribute('class', 'star-wrapper-grid')

        let pRating = document.createElement('p')
        pRating.setAttribute('class', 'book-info-rating')
        let pRatingText = document.createTextNode('rating')
        pRating.append(pRatingText)
        divStarWrapperGrid.append(pRating)
        if (el.averageRating != undefined) {
            for (let j = 0; j < 5; j++) {
                if (j < Math.floor(el.averageRating)) {
                    let iStarYellow = document.createElement('i')
                    iStarYellow.setAttribute('class', 'fa fa-star yellow')
                    divStarWrapperGrid.append(iStarYellow)
                } else {
                    let iStarGrey = document.createElement('i')
                    iStarGrey.setAttribute('class', 'fa fa-star grey')
                    divStarWrapperGrid.append(iStarGrey)
                }
            }
            bookCardInfo.append(divStarWrapperGrid)
        } else {
            let iNone = document.createElement('i')
            iNone.style.color = 'white'
            let iNoneText = document.createTextNode('none')
            iNone.append(iNoneText)
            divStarWrapperGrid.append(iNone)
            bookCardInfo.append(divStarWrapperGrid)
        }
        let divBookamrkWrapperGrid = document.createElement('div')
        divBookamrkWrapperGrid.setAttribute('class', 'bookmark-icon-wrapper-grid')

        let iBookmark = document.createElement('i')
        iBookmark.setAttribute('class', 'fa bookmark-icon-grid')
        // let iBookmarkText = document.createTextNode('&#xf097;') // ne radi za text node
        iBookmark.innerHTML = '&#xf097'
        divBookamrkWrapperGrid.append(iBookmark)
        bookCardInfo.append(divBookamrkWrapperGrid)

        let divGridBackground = document.createElement('div')
        divGridBackground.setAttribute('class', 'book-card-grid-background')
        bookCardGrid.append(divGridBackground)

        bookCardGrid.append(bookCardInfo)
        container.append(bookCardGrid)
    })
}





const bookInfoDisplay = () => {
    const bookCardGrid = document.querySelectorAll('.book-card-grid')
    const bookCardInfo = document.querySelectorAll('.book-card-info')
    const bookCardGridBackground = document.querySelectorAll('.book-card-grid-background')
    console.log(bookCardGrid, bookCardInfo, bookCardGridBackground)
    for (let i = 0; i < bookCardGrid.length; i++) {
        (function (i) {
            bookCardGrid[i].addEventListener('mouseover', () => {
                bookCardInfo[i].style.display = 'block'
                bookCardGridBackground[i].style.display = 'block'
            })
            bookCardGrid[i].addEventListener('mouseout', () => {
                bookCardInfo[i].style.display = 'none'
                bookCardGridBackground[i].style.display = 'none'
            })
        })(i)
    }
}


// const bookmarkIconChangeColor = () => {
//     const bookmarkIconWrapperList = document.querySelectorAll('.bookmark-icon-wrapper-list')
//     const bookmarkIconWrapperList_i = document.querySelectorAll('.bookmark-icon-wrapper-list')
//     for (let i = 0; i < bookmarkIconWrapperList.lenght; i++) {
//         (function (i) {
//             bookmarkIconWrapperList[i].addEventListener('mousemove', (i) => {
//                 bookmarkIconWrapperList[i].style.backgroundColor = 'black'
//                 bookmarkIconWrapperList_i[i].style.color = 'white'
//             })
//         })(i)
//         (function (i) {
//             bookmarkIconWrapperList[i].addEventListener('mouseover', (i) => {
//                 bookmarkIconWrapperList[i].style.backgroundColor = 'wihte'
//                 bookmarkIconWrapperList_i[i].style.color = 'black'
//             })
//         })()
//     }
// }


export {
    createBookGrid,
    bookInfoDisplay,
}











// <i class="fa fa-star yellow"></i>
// <i class="fa fa-star"></i>
// <i class="fa fa-star"></i>
// <i class="fa fa-star grey"></i>
// <i class="fa fa-star"></i>