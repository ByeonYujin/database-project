const connected = true

export default class PostData {
    constructor(productId, cachedData, onFinished) {
        this.success = false

        this.categories = {}
        this.payload = {}

        // Load categories
        this.getAvailableCategories()
        .then(categories => {
            this.categories = categories
            return cachedData ? cachedData : this.getDataFromServer(productId)
        })
        .then(productData => {
            this.payload = productData
            this.success = true
        })
        .catch(err => {
            if (err.cause) {
                console.log(err.cause)
            }
            this.success = false
        })
        .finally(onFinished)
    }

    getAvailableCategories = async () => {
        // Getting data with Ajax
        const loaded = await new Promise((resolve, reject) => {
            if (connected) {
                resolve({ a: ["b", "c"], d: ["e", "f"] })
            }
            else {
                reject({ cause: "CAT_LOAD_FAILED" })
            }
        }) 
        return loaded
    }

    getDataFromServer = async (productId) => {
        // Getting data with Ajax
        const loaded = await new Promise((resolve, reject) => {
            if (connected) {
                resolve({ test: productId })
            }
            else {
                reject({ cause: "PRODUCT_LOAD_FAILED" })
            }
        })
        return loaded
    }

}