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

    // search.addEventListener('keydown', () => {
    //     searchOutput.classList.toggle('block')
    // })
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
const bookmarkIconChangeColor = () => {
    const bookmarkIconWrapperList = document.querySelectorAll('.bookmark-icon-wrapper-list')
    const bookmarkIconWrapperList_i = document.querySelectorAll('.bookmark-icon-wrapper-list > i')

    for (let i = 0; i < bookmarkIconWrapperList.length; i++) {

        (function (i) {

            bookmarkIconWrapperList[i].addEventListener('mouseover', () => {
                bookmarkIconWrapperList[i].style.backgroundColor = 'black'
                bookmarkIconWrapperList_i[i].style.color = 'white'
            })

            bookmarkIconWrapperList[i].addEventListener('mouseout', () => {
                bookmarkIconWrapperList[i].style.backgroundColor = 'white'
                bookmarkIconWrapperList_i[i].style.color = 'black'
            })

        })(i)
    }
}

const sumOfPricesAndCreateCartCard = (e) => {
    const carts = document.querySelectorAll('.fa-shopping-cart:not(last)')
    const cartWrapper = document.querySelector('.cart-wrapper')
    const cartCard = document.getElementsByClassName('cart-card')
    const cartCardsTitle = document.getElementsByClassName('cart-card-title')
    const cartCardCounter = document.getElementsByClassName('cart-card-counter')
    const cartCardPrice = document.getElementsByClassName('cart-card-price')
    const noOfBooks = document.querySelector('.no-of-books > span')
    const total = document.querySelector('.total > span')
    const totalComp = document.querySelector('.i-total-comp > i')
    const bookCardsTitle = document.querySelectorAll('.book-title-grid > a ')
    const bookCardsImg = document.querySelectorAll('.book-card-grid > img')
    const bookCardsPrice = document.querySelectorAll('.book-price-grid')
    const iX = document.getElementsByClassName('delete-cart-card')

    for (let i = 0; i < carts.length; i++) {

        (function (i) {
            carts[i].addEventListener('click', () => {
                // Find existing cart card in cartWrapper and suming it in total
                for (let j = 0; j < cartCardsTitle.length; j++) {
                    if (bookCardsTitle[i].textContent == cartCardsTitle[j].textContent) {

                        cartCardCounter[j].textContent = parseFloat(cartCardCounter[j].textContent) + 1

                        total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[j].textContent)).toFixed(2)
                        totalComp.textContent = total.textContent
                        return
                    }
                }
                // Create Cart Cards
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
                let iDelete = document.createElement('i')
                iDelete.className = 'fa delete-cart-card'
                iDelete.innerHTML = '&#xf00d;'
                div.append(iDelete)
                cartCardDiv.append(div)
                cartWrapper.append(cartCardDiv)
                // Suming in total  for new cart card
                total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[cartCardPrice.length - 1].textContent)).toFixed(2)
                totalComp.textContent = total.textContent
                noOfBooks.textContent = cartCard.length
                //             Delete Cart Cards
                iX[iX.length - 1].addEventListener('click', (e) => {
                    for (let k = 0; k < cartCard.length; k++) {
                        if (e.target.closest('.cart-card') == cartCard[k]) {
                            total.textContent = (parseFloat(total.textContent) - (parseFloat(cartCardCounter[k].textContent) * parseFloat(cartCardPrice[k].textContent))).toFixed(2)
                            totalComp.textContent = total.textContent
                            noOfBooks.textContent = parseFloat(noOfBooks.textContent) - 1
                            cartCard[k].remove()
                        }
                    }
                })
            })

        })(i)
    }

}


const createBookmarkCardandDelete = () => {
    const bookmarksWrapper = document.querySelector('.bookmarks-wrapper')
    const bookmarkWrapperGrid = document.querySelectorAll('.bookmark-icon-wrapper-grid')
    const bookmarkTitle = document.getElementsByClassName('bookmark-title-a')
    const bookmarksCard = document.getElementsByClassName('bookmarks-card')
    const bookCard = document.querySelectorAll('.book-card-grid')
    const bookCardsTitle = document.querySelectorAll('.book-title-grid > a')
    const bookCardsAuthor = document.querySelectorAll('.book-author-grid > a')
    const iDelete = document.getElementsByClassName('delete-bookmark-card')

    for (let i = 0; i < bookmarkWrapperGrid.length; i++) {

        (function (i) { // ?????????????????????????????????????????????????????????? Zasto i je undefined NEVEROVATNO!
            let a = i
            bookmarkWrapperGrid[i].addEventListener('click', () => {
                for (let j = 0; j < bookmarkTitle.length; j++) {
                    if (bookCardsTitle[a].textContent == bookmarkTitle[j].textContent) {
                        return
                    }
                }
                let div = document.createElement('div')
                div.setAttribute('class', 'bookmarks-card')
                div.setAttribute('key', bookCard[a].getAttribute('key'))

                let p1 = document.createElement('p')
                p1.setAttribute('class', 'bookmarks-title')
                let a1 = document.createElement('a')
                a1.setAttribute('href', './bookInfo.html')
                a1.setAttribute('class', 'bookmark-title-a')
                let a1t = document.createTextNode(bookCardsTitle[a].textContent)
                a1.append(a1t)
                p1.append(a1)
                div.append(p1)
                let p2 = document.createElement('p')
                p2.setAttribute('class', 'bookmarks-author')
                let a2 = document.createElement('a')
                let a2t = document.createTextNode(bookCardsAuthor[a].textContent)
                a2.append(a2t)
                p2.append(a2)
                div.append(p2)
                let i = document.createElement('i')
                i.className = 'fa  delete-bookmark-card'
                i.innerHTML = '&#xf00d;'
                div.append(i)
                bookmarksWrapper.append(div)

                iDelete[iDelete.length - 1].addEventListener('click', (еvenet) => {
                    for (let k = 0; k < iDelete.length; k++) {
                        if (event.target.closest('.bookmarks-card') == bookmarksCard[k]) {
                            bookmarksCard[k].remove()
                        }
                    }
                })
            })

        })(i)
    }

}

const createBookList = (arr) => {
    const container = document.querySelector('.container')

    arr.forEach((el) => {

        let div = document.createElement('div')
        div.setAttribute('class', 'book-card-list')
        div.setAttribute('key', el.id)

        let img = document.createElement('img')
        img.setAttribute('src', el.smallThumbnail)
        div.append(img)

        let p1 = document.createElement('p')
        p1.setAttribute('class', 'book-title-list')
        let a1 = document.createElement('a')
        a1.setAttribute('href', './bookInfo.html')
        if (el.title.length > 49) {
            let a1t = document.createTextNode(el.title.slice(0, 40) + '...')
            a1.append(a1t)
        } else {
            let a1t = document.createTextNode(el.title)
            a1.append(a1t)
        }
        p1.append(a1)
        div.appendChild(p1)

        let p2 = document.createElement('p')
        p2.setAttribute('class', 'book-author-list')
        let a2 = document.createElement('a')
        a2.setAttribute('href', './bookInfo.html')
        let a2t = document.createTextNode(el.author)
        a2.append(a2t)
        p2.appendChild(a2)
        div.appendChild(p2)

        let p3 = document.createElement('p')
        p3.setAttribute('class', 'book-description-list')
        let p3t = document.createTextNode(el.description.slice(0, el.description.indexOf(' ', 80)) + '...')
        p3.appendChild(p3t)
        div.appendChild(p3)

        let divStar = document.createElement('div')
        divStar.setAttribute('class', 'star-wrapper-list')
        let counter = 0
        if (el.averageRating != undefined) {

            for (let i = 0; i < 5; i++) {

                if (i < Math.floor(el.averageRating)) {

                    let iy = document.createElement('i')
                    iy.setAttribute('class', 'fa fa-star yellow')
                    divStar.appendChild(iy)
                } else {

                    let ig = document.createElement('i')
                    ig.setAttribute('class', 'fa fa-star grey')
                    divStar.appendChild(ig)
                }
            }
            div.appendChild(divStar)
        }

        let p4 = document.createElement('p')
        p4.setAttribute('class', 'book-price-list')
        let p4t = document.createTextNode(el.price + '$')
        p4.appendChild(p4t)
        div.appendChild(p4)

        let p5 = document.createElement('p')
        p5.setAttribute('class', 'book-cart-list')
        let p5t = document.createTextNode('+')
        p5.appendChild(p5t)
        let i5 = document.createElement('i')
        i5.className = 'fa fa-shopping-cart'
        p5.appendChild(i5)
        div.appendChild(p5)

        let divBookamark = document.createElement('div')
        divBookamark.setAttribute('class', 'bookmark-icon-wrapper-list')
        let iBookmark = document.createElement('i')
        iBookmark.className = 'fa bookmark-icon-list'
        iBookmark.innerHTML = '&#xf097;'
        divBookamark.appendChild(iBookmark)
        div.appendChild(divBookamark)

        container.appendChild(div)

    })

}


const GridorListView = () => {
    const grid = document.querySelector('.grid')
    const list = document.querySelector('.list')
    const booksGrid = document.querySelectorAll('.book-card-grid')
    const booksList = document.querySelectorAll('.book-card-list')

    grid.addEventListener('click', () => {
        for (let i = 0; i < booksGrid.length; i++) {
            booksGrid[i].style.display = 'block'
            booksList[i].style.display = 'none'
        }
    })

    list.addEventListener('click', () => {
        for (let i = 0; i < booksList.length; i++) {
            booksGrid[i].style.display = 'none'
            booksList[i].style.display = 'block'
        }
    })
}

const searchingBooks = () => {
    const input = document.querySelector('header > input')
    const searchOutputWrapper = document.querySelector('.search-output')
    const searchOutputCards = document.getElementsByClassName('search-output-card')
    const container = document.querySelector('.container')

    input.addEventListener('keydown', () => {

        for (let i = 0; i < searchOutputCards.length; i++) {
            searchOutputCards[i].remove()
            i--
        }


        if (input.value.length >= 2) {

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}&printType=books&projection=full`)
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    let arr = data.items

                    if (arr.length > 10) {
                        arr.slice(0, 10)
                    }

                    searchOutputWrapper.style.display = 'block'

                    arr.forEach((el) => {
                        let div = document.createElement('div')
                        div.setAttribute('class', 'search-output-card')
                        div.setAttribute('key', el.id)

                        let a = document.createElement('a')
                        a.setAttribute('href', './bookInfo.html')

                        let img = document.createElement('img')
                        if (el.volumeInfo.imageLinks.smallThumbnail != undefined) {
                            img.setAttribute('src', el.volumeInfo.imageLinks.smallThumbnail)
                        }
                        img.setAttribute('alt', 'No Image')
                        a.appendChild(img)

                        let aDiv = document.createElement('div')

                        let p1 = document.createElement('p')
                        if (el.volumeInfo.title.length > 45) {
                            let p1t = document.createTextNode(el.volumeInfo.title.slice(0, 40) + '...')
                            p1.appendChild(p1t)
                        } else {

                            let p1t = document.createTextNode(el.volumeInfo.title)
                            p1.appendChild(p1t)
                        }
                        aDiv.appendChild(p1)

                        let p2 = document.createElement('p')
                        if (el.volumeInfo.authors != undefined) {
                            let p2t = document.createTextNode(el.volumeInfo.authors[0] || el.volumeInfo.authors[1])
                            p2.appendChild(p2t)
                        }
                        aDiv.appendChild(p2)

                        a.appendChild(aDiv)

                        div.appendChild(a)

                        searchOutputWrapper.appendChild(div)
                    })
                })
        } else {
            searchOutputWrapper.style.display = 'none'
        }
    })

    window.addEventListener('click', (e) => {
        if (e.target.closest('.search-output') != searchOutputWrapper && e.target.closest('header > input') != input) {
            searchOutputWrapper.style.display = 'none'
        }
    })

}

export {
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

}