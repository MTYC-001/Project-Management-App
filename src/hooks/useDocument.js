import { useEffect, useState } from "react"
import {projectFirestore} from '../firebase/config'
export const useDocument = (collection, id) =>{
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //realtime data for document
    useEffect(()=>{
        const ref = projectFirestore.collection(collection).doc(id)
        const unsubscribe = ref.onSnapshot((snapshot) => {
            if(snapshot.data()){
                //inside data got name, assigned users and details of the project object
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            }
            else{
                setError("no such document exists")
            }
        }, (err)=>{
            console.log(err.message)
            setError("failed to get document")
        })
        //clean up function
        return () => unsubscribe()
    }, [collection, id])
    return {document, error}
}