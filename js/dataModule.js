class Book {
    constructor(obj) {
        this.id = obj.id
        this.title = obj.volumeInfo.title
        this.author = obj.volumeInfo.authors[0]
        this.publishedDate = obj.volumeInfo.publishedDate
        this.pageCount = obj.volumeInfo.pageCount
        this.description = obj.volumeInfo.description
        this.categories = obj.volumeInfo.categories[0]
        this.averageRating = obj.volumeInfo.averageRating
        this.smallThumbnail = obj.volumeInfo.imageLinks.smallThumbnail
        this.thumbnail = obj.volumeInfo.imageLinks.thumbnail
    }
}

const booksArr = (obj) => {
    return obj.items.map((el) => {
        return new Book(el)
    })
}

// export default booksArr
