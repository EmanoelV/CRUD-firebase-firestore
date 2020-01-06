class Crud {
    constructor(collection) {
        this.collection = collection
    }

    create = (data, id) => {
        function load(resolve, reject) {
            db.collection(this.collection).doc(id).set(data)
            .then( () => {
                console.log("Dados criados")
                resolve(true)
            })
            .catch( (error) => {
                console.log("Erro ao criar: ", error)
                reject(false)
            })
        }
        return new Promise(load)
    }

    update = (id, data) => {
        function load(resolve, reject) {
            db.collection(this.collection).doc(id).update(data)
            .then(() => {
                console.log("Dados atualizados")
                resolve(true)
            })
            .catch((error) => {
                console.log("Erro ao atualizar", error)
                reject(false)
            })
        }
        return new Promise(load)
    }

    delete = (id) => {
        function load(resolve, reject) {
            db.collection(this.collection).doc(id).delete()
            .then(() => {
                console.log("Dados deletados")
                resolve(true)
            })
            .catch((error) => {
                console.log("Erro ao deletar", error)
                reject(false)
            })
        }
        return new Promise(load)
    }

    processResp(res) {
        let date = []
        let temp
        res.forEach((doc) => {
            temp = doc.data()
            temp.id = doc.id
            date.push(temp)
        })
        console.log(date)
        return date
    }

    read = {
        all: (limit=1000) => {
            let collection = this.collection
            let processResp = this.processResp
            function load(resolve, reject) {
                //console.log(this.collection)
                db.collection(collection).limit(limit).get()
                .then((res) => {
                    resolve(processResp(res))
                })
                .catch((error) => {
                    reject(error)
                })
            }
            return new Promise(load)
        },

        search: (key, operator, value, limit=1000) => {
            let processResp = this.processResp
            let collection = this.collection
            function load(resolve, reject) {
                db.collection(collection).where(key, operator, value).limit(limit).get()
                .then( (res) => resolve( processResp(res) ) )
                .catch((error) => {
                    reject(error)
                })                
            }
            return new Promise(load)
        },
        
        id: (id) => {
            function load(resolve, reject) {
                db.collection(this.collection).doc(id).get()
                .then( (res) => {
                    if ( res.exists ) {
                        resolve( res.data() )
                    } else {
                        reject("Não existe")
                    }
                })
                .catch((error) => {
                    reject(error)
                })
            }
            return new Promise(load)
        }
    }  
}

const arrayAdd = (elem) => firebase.firestore.FieldValue.arrayUnion(elem)
const arrayRemove = (elem) => firebase.firestore.FieldValue.arrayRemove(elem)
const increment = (number) => firebase.firestore.FieldValue.increment(number)
const del = firebase.firestore.FieldValue.delete()