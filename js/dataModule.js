class Book {
    constructor(obj) {
        this.id = obj.id
        this.title = obj.volumeInfo.title == undefined ? 'none' : obj.volumeInfo.title
        this.author = obj.volumeInfo.authors == undefined ? 'none' : obj.volumeInfo.authors[0]
        this.publishedDate = obj.volumeInfo.publishedDate
        this.pageCount = obj.volumeInfo.pageCount
        this.description = obj.volumeInfo.description
        this.categories = obj.volumeInfo.categories == undefined ? 'none' : obj.volumeInfo.categories[0]
        this.averageRating = obj.volumeInfo.averageRating
        this.smallThumbnail = obj.volumeInfo.imageLinks.smallThumbnail == undefined ? undefined : obj.volumeInfo.imageLinks.smallThumbnail
        this.thumbnail = obj.volumeInfo.imageLinks.thumbnail
        this.price = (Math.random() * 25 + 5).toFixed(2)
    }
}

const booksArr = (obj) => {
    return obj.items.map((el) => {
        return new Book(el)
    })
}

export {
    booksArr,
    Book
}