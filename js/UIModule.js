const openAndCloseMobileWrappers = () => {

    const info = document.querySelector('.info')
    const comments = document.querySelector('.comments')
    const cartWrapper = document.querySelector('.cart-wrapper')
    const loginWrapper = document.querySelector('.login-wrapper')

    const homeIcon = document.querySelector('.home-icon')
    const commentsIcon = document.querySelector('.comments-icon')
    const loginIcon = document.querySelector('.login-icon')
    const cartIcon = document.querySelector('.cart-icon')

    const mobileIconsI = document.querySelectorAll('.mobile-iconsI')
    const mobileWrappers = document.querySelectorAll('.mobile-wrappers')

    let whichIsClicked = undefined
    let resize = window.innerWidth

    const loginComp = document.querySelector('.login')
    const cartComp = document.querySelector('.cart')

    const close = document.querySelectorAll('.close')
    const closeCart = document.querySelector('.cart-wrapper .close')
    const closeLogin = document.querySelector('.login-wrapper .close')

    const deleteCartCard = document.getElementsByClassName('delete-cart-card')
    let X = []
    const shoppingCart = document.querySelectorAll('.fa-shopping-cart:not(.i-cart-comp)')

    const deletBookmarkCard = document.getElementsByClassName('delete-bookmark-card')
    const bookmarkWrapperGrid = document.querySelectorAll('.bookmark-icon-wrapper-grid')
    let XBookmark = []


    const loginBackground = document.querySelector('.login-background')

    for (let i = 0; i < mobileWrappers.length; i++) {

        (function (i) {

            mobileIconsI[i].addEventListener('click', () => {
                // console.log(this)  sto je ovo thiis undefined???
                for (let j = 0; j < mobileWrappers.length; j++) {
                    // toggle za mobile ikonice
                    if (mobileIconsI[i] == mobileIconsI[j]) {
                        if (mobileWrappers[j].style.display == 'block') {
                            mobileWrappers[j].style.display = 'none'
                        } else {
                            mobileWrappers[j].style.display = 'block'
                        }
                        whichIsClicked = j
                    } else {
                        mobileWrappers[j].style.display = 'none'
                    }
                }
            })

        })(i)

    }

    loginComp.addEventListener('click', () => {
        loginWrapper.style.display = 'block'
        loginBackground.style.display = 'block'
        loginWrapper.style.animation = 'in 0.4s ease-in-out'
    })
    cartComp.addEventListener('click', () => {
        cartWrapper.style.display = 'block'
    })

    for (let i = 0; i < close.length; i++) {
        (function (i) {
            close[i].addEventListener('click', () => {
                if (i == 1 && resize >= 992) { // loginWrapper na > 992 prikazu
                    loginWrapper.style.animation = 'out 0.4s ease-in-out'
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

    //da gasim klikom van wrappera i pronadjem kliknuti wrapper koji ce se dislay-ovati na resize
    window.addEventListener('click', (e) => {
        // ovo je potrebno zato sto postoji listener u drugoj f-ji za brisanje cartCards i ovde mi uvek update-uje niz deleteCartCard posle izvrsenja tj brisanja cartCard-a
        const clickedCart = () => {
            for (let i = 0; i < shoppingCart.length; i++) {
                if (e.target.closest('.fa-shopping-cart') == shoppingCart[i]) {
                    return shoppingCart[i]
                }
            }
            return 1 // zbog donjeg if-a jer vraca null == undefined => true i uvek i update-uje niz sto ne treba
        }


        const clickedX = () => {
            for (let i = 0; i < X.length; i++) {
                if (e.target.closest('.delete-cart-card') == X[i]) {
                    return X[i]
                }
            }
            return 1 // zbog donjeg if-a jer vraca null != undefined => false i nece zatvarati cartWrapper klikom van njega 
        }

        if (e.target.closest('.delete-cart-card') != clickedX()) {
            X = [...deleteCartCard]
        }



        const clickedBookmarkWrapper = () => {
            for (let i = 0; i < bookmarkWrapperGrid.length; i++) {

                if (e.target.closest('.bookmark-icon-wrapper-grid') == bookmarkWrapperGrid[i]) {
                    return bookmarkWrapperGrid[i]
                }
            }
            return 1 //zbog donjeg if-a jer vraca null == undefined => true i uvek i update-uje niz sto ne treb
        }

        if (e.target.closest('.bookmark-icon-wrapper-grid') == clickedBookmarkWrapper()) {
            XBookmark = [...deletBookmarkCard]
        }

        const clickedXBookmark = () => {
            for (let i = 0; i < XBookmark.length; i++) {
                if (e.target.closest('.delete-bookmark-card') == XBookmark[i]) {
                    return XBookmark[i]
                }
            }
            return 1 // zbog donjeg if-a jer vraca null != undefined => false i nece zatvarati cartWrapper klikom van njega 
        }

        if ((e.target.closest('.cart') == cartComp || e.target.closest('.cart-wrapper') == cartWrapper || e.target.closest('.cart-icon') == cartIcon) && e.target.closest('.cart-wrapper .close') != closeCart) {
            whichIsClicked = 2
        }
        if ((e.target.closest('.login') == loginComp || e.target.closest('.login-wrapper') == loginWrapper || e.target.closest('.login-icon') == loginIcon) && e.target.closest('.login-wrapper .close') != closeLogin) {
            whichIsClicked = 1
        }

        // uslov da je undefined sve na sta se klikne van mobile ikonica i mobile-wrappera
        if (resize >= 992) {

            if (e.target.closest('.login-wrapper') != loginWrapper && e.target.closest('.cart-wrapper') != cartWrapper && e.target.closest('.cart') != cartComp && e.target.closest('.login') != loginComp) {
                whichIsClicked = undefined
            }
            if (e.target.closest('.cart') != cartComp && e.target.closest('.cart-wrapper') != cartWrapper && e.target.closest('.delete-cart-card') != clickedX()) {
                cartWrapper.style.display = 'none'
                X = [...deleteCartCard] //da se update-uje niz
            }
            if (e.target.closest('.login') != loginComp && e.target.closest('.login-wrapper') != loginWrapper) {
                loginWrapper.style.animation = 'out 0.4s ease-in-out'
                setTimeout(() => {
                    loginWrapper.style.display = 'none'
                    loginBackground.style.display = 'none'
                }, 401)


                XBookmark = [...deletBookmarkCard] //da se update-uje niz 
            }

        } else {

            if (e.target.closest('.home-icon') != homeIcon && e.target.closest('.info') != info && e.target.closest('.comments-icon') != commentsIcon && e.target.closest('.comments') != comments && e.target.closest('.login-icon') != loginIcon && e.target.closest('.login-wrapper') != loginWrapper && e.target.closest('.cart-icon') != cartIcon && e.target.closest('.cart-wrapper') != cartWrapper) {
                whichIsClicked = undefined
            }
            if (e.target.closest('.comments') != comments && e.target.closest('.comments-icon') != commentsIcon) {
                comments.style.display = 'none'
            }



            if (e.target.closest('.info') != info && e.target.closest('.home-icon') != homeIcon && e.target.closest('.delete-bookmark-card') != clickedXBookmark()) {
                info.style.display = 'none'
                XBookmark = [...deletBookmarkCard] //da se update-uje niz
            }



            if (e.target.closest('.cart-wrapper') != cartWrapper && e.target.closest('.cart-icon') != cartIcon && e.target.closest('.delete-cart-card') != clickedX()) {
                cartWrapper.style.display = 'none'
                X = [...deleteCartCard] // da se update-uje niz
            }
            if (e.target.closest('.login-wrapper') != loginWrapper && e.target.closest('.login-icon') != loginIcon) {
                loginWrapper.style.display = 'none'
                loginBackground.style.display = 'none'
            }
        }

    })



    let changeBiggerThen992 = true //da ne display-uje stalno na  vecem prikazu od 992  wrapper kliknutog icon-a prilikom resize-a
    let changeLessThen992 = true

    // da prebacuje kliknuti wrapper    > 992       u     < 992
    window.addEventListener('resize', () => {
        resize = window.innerWidth


        if (resize >= 992) {
            if (changeBiggerThen992 == true && whichIsClicked != undefined) {
                mobileWrappers[whichIsClicked].style.display = 'block'
            }
            info.style.display = 'block' // zbog dizajnu treba stalno biti block
            comments.style.display = 'block' // zbog dizajna treba stalno bitti block

            changeBiggerThen992 = false
            changeLessThen992 = true

        } else {

            for (let i = 0; i < mobileWrappers.length; i++) {
                if (whichIsClicked == undefined) {
                    mobileWrappers[i].style.display = 'none'
                } else {
                    info.style.display = 'none'
                    comments.style.display = 'none'
                }
            }

            if (changeLessThen992 && whichIsClicked != undefined) {
                mobileWrappers[whichIsClicked].style.display = 'block'
            }

            changeLessThen992 = false
            changeBiggerThen992 = true

        }
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

    const bookCardsTitleGrid = document.querySelectorAll('.book-title-grid > a ')
    const bookCardsTitleList = document.querySelectorAll('.book-title-list > a')
    const bookCardsTitleAll = [...bookCardsTitleGrid, ...bookCardsTitleList]

    const bookCardsImgGrid = document.querySelectorAll('.book-card-grid > img')
    const bookCardsImgList = document.querySelectorAll('.book-card-grid > img')
    const bookCardsImgAll = [...bookCardsImgGrid, ...bookCardsImgList]
    
    const bookCardsPriceGrid = document.querySelectorAll('.book-price-grid')
    const bookCardsPriceList = document.querySelectorAll('.book-price-list')
    const bookCardsPriceAll = [...bookCardsPriceGrid, ...bookCardsPriceList]
    
    const iX = document.getElementsByClassName('delete-cart-card')
    
    // ako nema u localStorage-u cartCardsArr
    let localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr')) == null ? localStorage.setItem('cartCardsArr',JSON.stringify([])) : JSON.parse(localStorage.getItem('cartCardsArr'))

    for (let i = 0; i < carts.length; i++) {

        (function (i) {
            carts[i].addEventListener('click', () => {
                // Find existing cart card in cartWrapper and suming it in total
                for (let j = 0; j < cartCardsTitle.length; j++) {
                    if (bookCardsTitleAll[i].textContent == cartCardsTitle[j].textContent) {

                        cartCardCounter[j].textContent = parseFloat(cartCardCounter[j].textContent) + 1

                        total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[j].textContent)).toFixed(2)
                        totalComp.textContent = total.textContent
                       
                        localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                        localStorageArr[j].counter = cartCardCounter[j].textContent
                        localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                        console.log(localStorageArr, 'same', cartCardsTitle.length)
                        return
                    }
                }
                // Create Cart Cards
                let cartCardDiv = document.createElement('div')
                cartCardDiv.setAttribute('class', 'cart-card')

                let img = document.createElement('img')
                img.setAttribute('src', bookCardsImgAll[i] == undefined ? '' : bookCardsImgAll[i].src)
                cartCardDiv.append(img)

                let p = document.createElement('p')
                p.setAttribute('class', 'cart-card-title')
                let pText = document.createTextNode(bookCardsTitleAll[i].textContent)
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
                let p2Text = document.createTextNode(bookCardsPriceAll[i].textContent)
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

                 localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                localStorageArr.push({
                    title: bookCardsTitleAll[i].textContent,
                    img: bookCardsImgAll[i] == undefined ? '' : bookCardsImgAll[i].src,
                    counter: 1,
                    price: bookCardsPriceAll[i].textContent,
                })
                console.log(localStorageArr, 'new')
                localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                //             Delete Cart Cards
                iX[iX.length - 1].addEventListener('click', (e) => {
                    for (let k = 0; k < cartCard.length; k++) {
                        if (e.target.closest('.cart-card') == cartCard[k]) {
                            total.textContent = Math.abs((parseFloat(total.textContent) - (parseFloat(cartCardCounter[k].textContent) * parseFloat(cartCardPrice[k].textContent))).toFixed(2))
                            totalComp.textContent = total.textContent
                            noOfBooks.textContent = parseFloat(noOfBooks.textContent) - 1
                            cartCard[k].remove()

                            localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                            localStorageArr.splice(k, 1)
                            localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                            console.log(localStorageArr, ' removed 1')
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
    const bookmarkWrapperList = document.querySelectorAll('.bookmark-icon-wrapper-list')
    const bookmarkWrapperAll = [...bookmarkWrapperGrid, ...bookmarkWrapperList]

    const bookmarkTitle = document.getElementsByClassName('bookmark-title-a')
    const bookmarksCard = document.getElementsByClassName('bookmarks-card')

    const bookGrid = document.querySelectorAll('.book-card-grid')
    const bookList = document.querySelectorAll('.book-card-list')
    const bookCardAll = [...bookGrid, ...bookList]

    const bookCardsTitleGrid = document.querySelectorAll('.book-title-grid > a')
    const bookCardsTitleList = document.querySelectorAll('.book-title-list > a')
    const bookCardsTitleAll = [...bookCardsTitleGrid, ...bookCardsTitleList]

    const bookCardsAuthorGrid = document.querySelectorAll('.book-author-grid > a')
    const bookCardsAuthorList = document.querySelectorAll('.book-author-list > a')
    const bookCardsAuthorAll = [...bookCardsAuthorGrid, ...bookCardsAuthorList]

    const iDelete = document.getElementsByClassName('delete-bookmark-card')

    for (let i = 0; i < bookmarkWrapperAll.length; i++) {

        (function (i) { // ?????????????????????????????????????????????????????????? Zasto i je undefined NEVEROVATNO!
            let a = i
            bookmarkWrapperAll[i].addEventListener('click', () => {
                for (let j = 0; j < bookmarksCard.length; j++) {
                    if (bookCardsTitleAll[a].textContent == bookmarkTitle[j].textContent) {
                        return
                    }
                }
                let div = document.createElement('div')
                div.setAttribute('class', 'bookmarks-card')
                div.setAttribute('key', bookCardAll[a].getAttribute('key'))

                let p1 = document.createElement('p')
                p1.setAttribute('class', 'bookmarks-title')
                let a1 = document.createElement('a')
                a1.setAttribute('href', './bookInfo.html')
                a1.setAttribute('class', 'bookmark-title-a')
                let a1t = document.createTextNode(bookCardsTitleAll[a].textContent)
                a1.append(a1t)
                p1.append(a1)
                div.append(p1)
                let p2 = document.createElement('p')
                p2.setAttribute('class', 'bookmarks-author')
                let a2 = document.createElement('a')
                let a2t = document.createTextNode(bookCardsAuthorAll[a].textContent)
                a2.append(a2t)
                p2.append(a2)
                div.append(p2)
                let i = document.createElement('i')
                i.className = 'fa  delete-bookmark-card'
                i.innerHTML = '&#xf00d;'
                div.append(i)
                bookmarksWrapper.append(div)

                iDelete[iDelete.length - 1].addEventListener('click', (еvent) => {
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
            let a1t = document.createTextNode(el.title.slice(0, 35) + '...')
            a1.append(a1t)
        } else {
            let a1t = document.createTextNode(el.title)
            a1.append(a1t)
        }
        p1.append(a1)
        div.append(p1)

        let p2 = document.createElement('p')
        p2.setAttribute('class', 'book-author-list')
        let a2 = document.createElement('a')
        a2.setAttribute('href', './bookInfo.html')
        if (el.author != undefined) {
            let a2t = document.createTextNode(el.author)
            a2.append(a2t)
        }
        p2.append(a2)
        div.append(p2)

        let p3 = document.createElement('p')
        p3.setAttribute('class', 'book-description-list')
        if (el.description != undefined) {
            let p3t = document.createTextNode(el.description.slice(0, el.description.indexOf(' ', 80)) + '...')
            p3.append(p3t)
        }
        div.append(p3)

        let divStar = document.createElement('div')
        divStar.setAttribute('class', 'star-wrapper-list')
        let counter = 0
        if (el.averageRating != undefined) {

            for (let i = 0; i < 5; i++) {

                if (i < Math.floor(el.averageRating)) {

                    let iy = document.createElement('i')
                    iy.setAttribute('class', 'fa fa-star yellow')
                    divStar.append(iy)
                } else {

                    let ig = document.createElement('i')
                    ig.setAttribute('class', 'fa fa-star grey')
                    divStar.append(ig)
                }
            }
            div.append(divStar)
        }

        let p4 = document.createElement('p')
        p4.setAttribute('class', 'book-price-list')
        let p4t = document.createTextNode(el.price + '$')
        p4.append(p4t)
        div.append(p4)

        let p5 = document.createElement('p')
        p5.setAttribute('class', 'book-cart-list')
        let p5t = document.createTextNode('+')
        p5.append(p5t)
        let i5 = document.createElement('i')
        i5.className = 'fa fa-shopping-cart'
        p5.append(i5)
        div.append(p5)

        let divBookamark = document.createElement('div')
        divBookamark.setAttribute('class', 'bookmark-icon-wrapper-list')
        let iBookmark = document.createElement('i')
        iBookmark.className = 'fa bookmark-icon-list'
        iBookmark.innerHTML = '&#xf097;'
        divBookamark.append(iBookmark)
        div.append(divBookamark)

        container.append(div)

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
    //zbog resize kada je list prikaz pa u manjem od 992 izgubi standardan izgled zbog klase book-card-list
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            for (let i = 0; i < booksGrid.length; i++) {
                booksGrid[i].style.display = 'block'
                booksList[i].style.display = 'none'
            }
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

            searchOutputWrapper.style.display = 'block'

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}&printType=books&projection=full&maxResults=15`)
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    let arr = data.items
                    // kada se pretrazuje nesto sto ne vrati rezultat u then-u pa je data undefined
                    arr.forEach((el, i) => {
                        let div = document.createElement('div')
                        div.setAttribute('class', 'search-output-card')
                        div.setAttribute('key', el.id)

                        let a = document.createElement('a')
                        a.setAttribute('href', './bookInfo.html')

                        let img = document.createElement('img')
                        if (el.volumeInfo.imageLinks != undefined) {
                            img.setAttribute('src', el.volumeInfo.imageLinks.smallThumbnail)
                        }
                        img.setAttribute('alt', 'No Image')
                        a.append(img)

                        let aDiv = document.createElement('div')

                        let p1 = document.createElement('p')
                        if (el.volumeInfo.title.length > 45) {
                            let p1t = document.createTextNode(el.volumeInfo.title.slice(0, 35) + '...')
                            p1.append(p1t)
                        } else {

                            let p1t = document.createTextNode(el.volumeInfo.title)
                            p1.append(p1t)
                        }
                        aDiv.append(p1)

                        let p2 = document.createElement('p')
                        if (el.volumeInfo.authors != undefined) {
                            let p2t = document.createTextNode(el.volumeInfo.authors[0] || el.volumeInfo.authors[1])
                            p2.append(p2t)
                        }
                        aDiv.append(p2)

                        a.append(aDiv)

                        div.append(a)

                        searchOutputWrapper.append(div)

                        searchOutputCards[i].addEventListener('click', (e) => {
                            localStorage.setItem('id', e.target.closest('.search-output-card').getAttribute('key'))
                            localStorage.setItem('lastViewed', e.target.closest('.search-output-card').firstElementChild.lastElementChild.firstElementChild.textContent)
                        })

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

const createLocalStorage = () => {
    const titleGrid = document.querySelectorAll('.book-title-grid')
    const authorGrid = document.querySelectorAll('.book-author-grid')
    const titleList = document.querySelectorAll('.book-title-list')
    const authorList = document.querySelectorAll('.book-author-list')

    const bookmarkIconGrid = document.querySelectorAll('.bookmark-icon-wrapper-grid')
    const bookmarkIconList = document.querySelectorAll('.bookmark-icon-wrapper-list')
    const bookmarkIconAll = [...bookmarkIconGrid, ...bookmarkIconList]

    const titleBookmark = document.getElementsByClassName('bookmarks-title')

    const lastViewedComp = document.querySelector('.last-viewed-comp > a')
    const lastViewedMobile = document.querySelector('.last-viewed-mobile > a')
    const lastViewedCompSpan = document.querySelector('.last-viewed-comp > a > span')
    const lastViewedMobileSpan = document.querySelector('.last-viewed-mobile > a > span')

    if (localStorage.getItem('lastViewed') != null) {
        lastViewedCompSpan.textContent = localStorage.getItem('lastViewed')
        lastViewedMobileSpan.textContent = localStorage.getItem('lastViewed')
        lastViewedComp.innerHTML += '<i class="fa">&#xf178;</i>'
        lastViewedMobile.innerHTML += '<i class="fa">&#xf178;</i>'
    }

    for (let i = 0; i < titleGrid.length; i++) {

        (function (i) {

            titleGrid[i].addEventListener('click', (e) => {
                localStorage.setItem('id', e.target.closest('.book-card-grid').getAttribute('key'))
                localStorage.setItem('lastViewed', e.target.closest('.book-title-grid').firstElementChild.textContent)
            })

            authorGrid[i].addEventListener('click', (e) => {
                localStorage.setItem('id', e.target.closest('.book-card-grid').getAttribute('key'))
                localStorage.setItem('lastViewed', e.target.closest('.book-author-grid').previousElementSibling.firstElementChild.textContent)
            })

            titleList[i].addEventListener('click', (e) => {
                localStorage.setItem('id', e.target.closest('.book-card-list').getAttribute('key'))
                localStorage.setItem('lastViewed', e.target.closest('.book-title-list').firstElementChild.textContent)
            })

            authorList[i].addEventListener('click', (e) => {
                localStorage.setItem('id', e.target.closest('.book-card-list').getAttribute('key'))
                localStorage.setItem('lastViewed', e.target.closest('.book-author-list').previousElementSibling.firstElementChild.textContent)
            })

        })(i)
    }

    //niz titleBookmark je prazan na startu, dinamicki pravi pa preko klika na bookmarkIcon u book-info-card-u update-uje se taj niz
    for (let i = 0; i < bookmarkIconAll.length; i++) {
        (function (i) {

            bookmarkIconAll[i].addEventListener('click', () => {

                titleBookmark[titleBookmark.length - 1].addEventListener('click', (e) => {
                    localStorage.setItem('id', e.target.closest('.bookmarks-card').getAttribute('key'))
                    localStorage.setItem('lastViewed', e.target.closest('.bookmarks-title').firstElementChild.textContent)
                })


            })

        })(i)
    }
}

const displayCartCardsFromLocalStorage = (arr) => {

    const cartWrapper = document.querySelector('.cart-wrapper')
    const noOfBooks = document.querySelector('.no-of-books > span')
    const total = document.querySelector('.total > span')
    const totalComp = document.querySelector('.i-total-comp > i')

    const cartCards = document.getElementsByClassName('cart-card')
    const deleteCartCard = document.getElementsByClassName('delete-cart-card')
    const counter = document.getElementsByClassName('cart-card-counter')
    const price = document.getElementsByClassName('cart-card-price')

    if (arr == null) {
        return
    }

    arr.forEach((el, j) => {
        let div = document.createElement('div')
        div.setAttribute('class', 'cart-card')

        let img = document.createElement('img')
        img.setAttribute('src', el.img)
        div.append(img)

        let p1 = document.createElement('p')
        p1.setAttribute('class', 'cart-card-title')
        let p1T = document.createTextNode(el.title)
        p1.append(p1T)
        div.append(p1)

        let divDiv = document.createElement('div')
        let p2 = document.createElement('p')
        p2.setAttribute('class', 'cart-card-counter')
        let p2T = document.createTextNode(el.counter)
        p2.append(p2T)
        divDiv.append(p2)

        let p3 = document.createElement('p')
        p3.setAttribute('class', 'cart-card-price')
        let p3T = document.createTextNode(el.price)
        p3.append(p3T)
        divDiv.append(p3)

        let i = document.createElement('i')
        i.setAttribute('class', 'fa delete-cart-card')
        i.innerHTML = '&#xf00d;'
        divDiv.append(i)

        div.append(divDiv)
        cartWrapper.append(div)

        total.textContent = (parseFloat(total.textContent) + (parseFloat(arr[j].counter) * parseFloat(arr[j].price))).toFixed(2)
        totalComp.textContent = total.textContent
    })
    noOfBooks.textContent = arr.length

    for (let i = 0; i < deleteCartCard.length; i++) {

        (function (i) {

            deleteCartCard[i].addEventListener('click', (e) => {
                for (let j = 0; j < cartCards.length; j++) {
                    if (e.target.closest('.cart-card') == cartCards[j]) {

                        noOfBooks.textContent = parseFloat(noOfBooks.textContent) - 1
                        total.textContent = Math.abs(parseFloat(total.textContent) - (parseFloat(counter[j].textContent) * parseFloat(price[j].textContent))).toFixed(2)
                        totalComp.textContent = total.textContent
                        cartCards[j].remove()
                        let localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                        localStorageArr.splice(j, 1)
                        localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                        console.log(localStorageArr, ' removed 2')
                    }
                }
            })

        })(i)

    }
}
export {
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
}