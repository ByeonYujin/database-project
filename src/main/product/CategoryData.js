import { request } from "../../Axios";

export default class CategoryData {
    constructor(onFinished) {
        this.success = false

        this.categories = {}
        // this.payload = {}

        // Load categories
        this.getAvailableCategories()
        .then(categories => {
            this.categories = categories
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

    getAvailableCategories = () => {
        // Getting data with Ajax
        return request("get", "post/category").then(res => res.data)
    }

    // getDataFromServer = async (productId) => {
    //     // Getting data with Ajax
    //     const loaded = await new Promise((resolve, reject) => {
    //         if (true) {
    //             resolve({ test: productId })
    //         }
    //         else {
    //             reject({ cause: "PRODUCT_LOAD_FAILED" })
    //         }
    //     })
    //     return loaded
    // }

}