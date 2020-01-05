class Crud {
    creat = (collection, dates, id) => {
        function load(resolve, reject) {
            db.collection(collection).doc(id).set(dates)
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

    update = (collection, id, dates) => {
        function load(resolve, reject) {
            db.collection(collection).doc(id).update(dates)
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

    delete = (collection, id) => {
        function load(resolve, reject) {
            db.collection(collection).doc(id).delete()
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
        all: (collection, limit=1000) => {
            let processResp = this.processResp
            function load(resolve, reject) {
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

        search: (collection, element, operator, search, limit=1000) => {
            let processResp = this.processResp
            function load(resolve, reject) {
                db.collection(collection).where(element, operator, search).limit(limit).get()
                .then( (res) => resolve( processResp(res) ) )
                .catch((error) => {
                    reject(error)
                })                
            }
            return new Promise(load)
        },
        
        id: (collection, id) => {
            function load(resolve, reject) {
                db.collection(collection).doc(id).get()
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


const crud = new Crud
const arrayAdd = (elem) => firebase.firestore.FieldValue.arrayUnion(elem)
const arrayRemove = (elem) => firebase.firestore.FieldValue.arrayRemove(elem)
const increment = (number) => firebase.firestore.FieldValue.increment(number)
const del = firebase.firestore.FieldValue.delete()