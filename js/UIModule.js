const openAndCloseMobileWrappers = () => {

    const info = document.querySelector('.info')
    const comments = document.querySelector('.comments')
    const homeIcon = document.querySelector('.home-icon')
    const commentsIcon = document.querySelector('.comments-icon')
    const mobileIconsI = document.querySelectorAll('.mobile-iconsI')
    const mobileWrappers = document.querySelectorAll('.mobile-wrappers')
    let whichIsClicked = undefined
    let resize = undefined
    const cartWrapper = document.querySelector('.cart-wrapper')
    const loginWrapper = document.querySelector('.login-wrapper')
    const loginComp = document.querySelector('.login')
    const cartComp = document.querySelector('.cart')
    const close = document.querySelectorAll('.close')
    const closeCart = document.querySelector('.cart-wrapper .close')
    const closeLogin = document.querySelector('.login-wrapper .close')
    const loginBackground = document.querySelector('.login-background')

    for (let i = 0; i < mobileWrappers.length; i++) {

        (function (i) {

            mobileIconsI[i].addEventListener('click', () => {
                // console.log(this)  sto je ovo thiis undefined???
                for (let j = 0; j < mobileWrappers.length; j++) {
                    if (mobileIconsI[i] == mobileIconsI[j]) {
                        mobileWrappers[j].style.display = 'block'
                        whichIsClicked = j
                    } else {
                        mobileWrappers[j].style.display = 'none'
                    }
                }
            })

        })(i)

    }

    for (let i = 0; i < close.length; i++) {
        (function (i) {
            close[i].addEventListener('click', () => {
                if (i == 1 && resize >= 992) { // loginWrapper na > 992 prikazu
                    loginWrapper.style.top = '35%'
                    setTimeout(() => {
                        loginWrapper.style.display = 'none'
                        loginBackground.style.display = 'none'
                    }, 401)
                } else {
                    mobileWrappers[i].style.display = 'none'
                    loginBackground.style.display = 'none'
                }
                whichIsClicked = undefined
            })
        })(i)
    }

    // da prebacuje kliknuti wrapper    > 992       u     < 992
    window.addEventListener('click', (e) => {
        if (resize >= 992) {
            if (e.target.closest('.cart') != cartComp || e.target.closest('.cart-wrapper') != cartWrapper || e.target.closest('.login') != loginComp || e.target.closest('.login-wrapper') != loginWrapper) {
                whichIsClicked = undefined
            }
            if (e.target.closest('.cart') == cartComp || e.target.closest('.cart-wrapper') == cartWrapper && e.target.closest('.cart-wrapper .close') != closeCart) {
                whichIsClicked = 2
            }
            if (e.target.closest('.login') == loginComp || e.target.closest('.login-wrapper') == loginWrapper && e.target.closest('.login-wrapper .close') != closeLogin) {
                whichIsClicked = 1
            }
        }
        if (resize < 992) {
            if (e.target.closest('.info') != info && e.target.closest('.home-icon') != homeIcon) {
                info.style.display = 'none'
                whichIsClicked = undefined
            }

            if (e.target.closest('.comments') != comments && e.target.closest('.comments-icon') != commentsIcon) {
                comments.style.display = 'none'
                whichIsClicked = undefined
            }
        }
    })

    let changeBiggerThen992 = true //da ne display-uje stalno na  vecem prikazu od 992  wrapper kliknutog icon-a prilikom resize-a
    let changeLessThen992 = true

    window.addEventListener('resize', () => {
        resize = window.innerWidth

        console.log(whichIsClicked)

        if (window.innerWidth >= 992) {
            if (changeBiggerThen992 && whichIsClicked != undefined) {
                mobileWrappers[whichIsClicked].style.display = 'block'
                changeBiggerThen992 = false
            }
            info.style.display = 'block' // zbog dizajnu treba stalno biti block
            comments.style.display = 'block' // zbog dizajna treba stalno bitti block
            changeLessThen992 = true
        } else {

            if (whichIsClicked == undefined) {
                for (let i = 0; i < mobileWrappers.length; i++) {
                    mobileWrappers[i].style.display = 'none'
                }
            } else {
                if (changeLessThen992 == true) {
                    for (let i = 0; i < mobileWrappers.length; i++) {
                        mobileWrappers[i].style.display = 'none'
                    }
                    mobileWrappers[whichIsClicked].style.display = 'block'
                    changeLessThen992 = false
                }
            }
            changeBiggerThen992 = true
        }

    })



    const search = document.querySelector('header input')
    const searchOutput = document.querySelector('.search-output')

    search.addEventListener('keydown', () => {
        searchOutput.classList.toggle('block')
    })
}



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


const openAndCloseCartWrapper = () => {

    const cartComp = document.querySelector('.cart')
    const closeCart = document.querySelector('.cart-wrapper .close')
    const cartWrapper = document.querySelector('.cart-wrapper')
    const cartIcon = document.querySelector('.cart-icon')
    // const cartI = document.querySelector('.fa-shopping-cart')

    cartComp.addEventListener('click', () => {
        cartWrapper.style.display = 'block'
    })

    // closeCart.addEventListener('click', () => {
    //     cartWrapper.style.display = 'none'
    // })

    const closeCartWrapper = (e) => {
        if (e.target.closest('.cart-wrapper') != cartWrapper && e.target.closest('.cart') != cartComp && e.target.closest('.cart-icon') != cartIcon) {
            cartWrapper.style.display = 'none'
        }
    }

    window.addEventListener('click', closeCartWrapper)

}

const openAndCloseLoginWrapper = () => {

    const loginWrapper = document.querySelector('.login-wrapper')
    const loginBackground = document.querySelector('.login-background')
    const loginComp = document.querySelector('.login')
    const loginClose = document.querySelector('.login-wrapper .close')
    const loginIcon = document.querySelector('.login-icon')

    // loginIcon.addEventListener('click', () => {
    //     if (loginWrapper.style.display == 'none') {
    //         loginWrapper.style.display = 'block'
    //         loginBackground.style.display = 'block'
    //     } else {
    //         loginWrapper.style.display = 'none'
    //         loginBackground.style.display = 'none'
    //     }
    // })

    // loginComp.addEventListener('click', () => {
    //     loginWrapper.style.display = 'block'
    //     loginBackground.style.display = 'block'
    //     setTimeout(() => {
    //         loginWrapper.style.top = '50%'
    //     }, 10)
    // })


    // const closingLogin = () => {
    //     if (window.innerWidth >= 992) {
    //         loginWrapper.style.top = '35%'
    //         setTimeout(() => {
    //             loginWrapper.style.display = 'none'
    //             loginBackground.style.display = 'none'
    //         }, 401)
    //     } else {
    //         loginWrapper.style.display = 'none'
    //         loginBackground.style.display = 'none'
    //     }
    // }

    // loginClose.addEventListener('click', closingLogin)

    // const closeLoginWrapperComp = (e) => {
    //     if (e.target.closest('.login-wrapper') != loginWrapper && e.target.closest('.login') != loginComp && e.target.closest('.login-icon') != loginIcon) {
    //         if (window.innerWidth >= 992) {
    //             loginWrapper.style.top = '35%'
    //             setTimeout(() => {
    //                 loginWrapper.style.display = 'none'
    //                 loginBackground.style.display = 'none'
    //             }, 401)
    //         } else {
    //             loginWrapper.style.display = 'none'
    //             loginBackground.style.display = 'none'
    //         }
    //     }
    // }

    // window.addEventListener('click', closeLoginWrapperComp)

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            loginWrapper.style.top = '50%'
            loginWrapper.style.left = '50%'
        } else {
            loginWrapper.style.top = '0'
            loginWrapper.style.left = '0'
            loginWrapper.style.right = '0'
            loginWrapper.style.bottom = '50px'
        }
    })

}

const postCommentsBookstoore = () => {
    const input = document.querySelector('.leaving-comments input')
    const sendComment = document.querySelector('.leaving-comments i')
    const displayComments = document.querySelector('.display-comments')

    const createCommentCard = () => {
        let CommentCard = document.createElement('div')
        CommentCard.setAttribute('class', 'comment-card')

        let CommentCardImg = document.createElement('img')
        CommentCardImg.setAttribute('src', './user-icon.png')
        CommentCardImg.setAttribute('alt', 'Comment Card Img')
        CommentCard.append(CommentCardImg)

        let CommentCardP = document.createElement('p')
        let CommentCardPText = document.createTextNode(input.value)
        CommentCardP.append(CommentCardPText)
        CommentCard.append(CommentCardP)
        displayComments.append(CommentCard)

        input.value = ''
    }

    input.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && input.value != '') {
            createCommentCard()
        }
    })

    sendComment.addEventListener('click', () => {
        if (input.value != '') {
            createCommentCard()
        }
    })
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

const sumOfPrices = (e) => {
    const carts = document.querySelectorAll('.fa-shopping-cart:not(last)')
    const cartWrapper = document.querySelector('.cart-wrapper')
    const cartCard = document.getElementsByClassName('cart-card')
    const cartCardsTitle = document.getElementsByClassName('cart-card-title')
    const cartCardCounter = document.getElementsByClassName('cart-card-counter')
    const cartCardPrice = document.getElementsByClassName('cart-card-price')
    const noOfBooks = document.querySelector('.no-of-books')
    const total = document.querySelector('.total > span')
    const totalComp = document.querySelector('.i-total-comp')
    const bookCardsTitle = document.querySelectorAll('.book-title-grid a')
    const bookCardsImg = document.querySelectorAll('.book-card-grid > img')
    const bookCardsPrice = document.querySelectorAll('.book-price-grid')

    for (let i = 0; i < carts.length; i++) {

        (function (i) {
            carts[i].addEventListener('click', () => {

                for (let j = 0; j < cartCardsTitle.length; j++) {
                    if (bookCardsTitle[i].textContent == cartCardsTitle[j].textContent) {
                        console.log(total.textContent, cartCardPrice[cartCardPrice.length - 1].textContent + 'EXIST')

                        cartCardCounter[j].textContent = parseFloat(cartCardCounter[j].textContent) + 1

                        total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[j].textContent)).toFixed(2)
                        return
                    }
                }
                let cartCardDiv = document.createElement('div')
                cartCardDiv.setAttribute('class', 'cart-card')

                let img = document.createElement('img')
                img.setAttribute('src', bookCardsImg[i].src)
                cartCardDiv.append(img)

                let p = document.createElement('p')
                p.setAttribute('class', 'cart-card-title')
                let pText = document.createTextNode(bookCardsTitle[i].textContent)
                p.append(pText)
                cartCardDiv.append(p)

                let div = document.createElement('div')
                let p1 = document.createElement('p')
                p1.setAttribute('class', 'cart-card-counter')
                let p1text = document.createTextNode('1')
                p1.append(p1text)
                div.append(p1)
                let p2 = document.createElement('p')
                p2.setAttribute('class', 'cart-card-price')
                let p2Text = document.createTextNode(bookCardsPrice[i].textContent)
                p2.append(p2Text)
                div.append(p2)
                cartCardDiv.append(div)
                cartWrapper.append(cartCardDiv)
                console.log(total.textContent, cartCardPrice[cartCardPrice.length - 1].textContent + 'new')
                total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[cartCardPrice.length - 1].textContent)).toFixed(2)
                noOfBooks.textContent = 'No. of books: ' + cartCard.length

            })

        })(i)
    }
}



export {
    createBookGrid,
    bookInfoDisplay,
    openAndCloseCartWrapper,
    openAndCloseLoginWrapper,
    postCommentsBookstoore,
    openAndCloseMobileWrappers,
    sumOfPrices
}