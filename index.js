function loadScript(url) {
    fetch(url).then((res) => console.log(res))
}

class Crud {
    constructor(collection) {
        this.collection = collection
    }

    load(func) {
        return(
            (resolve, reject) => {
                func.then((res) => {
                    if(res != undefined) {
                        resolve( this.processResp(res) )
                    }
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
            }
        )
    }

    processResp(res) {
        if (res.data) {
            return res.data()
        }
        let data = []
        let temp
        res.forEach((doc) => {
            temp = doc.data()
            temp.id = doc.id
            data.push(temp)
        })
        return data
    }

    create (id, data) {
        let func = db.collection(this.collection).doc(id).set(data)
        return new Promise(this.load(func))
    }

    update(id, data) {
        let func = db.collection(this.collection).doc(id).update(data)
        return new Promise(this.load(func))
    }

    delete(id) {
        let func = db.collection(this.collection).doc(id).delete()
        return new Promise(this.load(func))
    }

    read = {
        all: (limit=1000) => {
            let func = db.collection(this.collection).limit(limit).get()
            return new Promise(this.load(func))
        },

        search: (key, operator, value, limit=1000) => {
            let func = db.collection(this.collection).where(key, operator, value).limit(limit).get()
            return new Promise(this.load(func))
        },
        
        id: (id) => {
            let func = db.collection(this.collection).doc(id).get()
            return new Promise(this.load(func))
        }
    }  
}

const db = firebase.firestore()
const arrayAdd = (elem) => firebase.firestore.FieldValue.arrayUnion(elem)
const arrayRemove = (elem) => firebase.firestore.FieldValue.arrayRemove(elem)
const increment = (number) => firebase.firestore.FieldValue.increment(number)
const del = firebase.firestore.FieldValue.delete()
