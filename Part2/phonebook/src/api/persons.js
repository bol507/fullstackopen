import api from './api'

/*const URLS =  {
    Persons: 'api/persons'
    
}*/
const faceScreaming = String.fromCodePoint(0x1F631)
const style1 = [
    'color:red', 
    'font-size:1.5rem'
].join(';')
const style2 = [
    'color:black',
    'background-color:yellow',
    'font-size:1rem'
].join(';')

export const fetchPersons = () => {
    return api.get('/').then((response) => {return response.data})
}

export const deletePerson = (id) => {
    return api.delete(`/${id}`)
}

export const createPerson = (person) =>{
    return api.post('/',person).then((response) => {return response.data})
    .catch((error) => {
        console.log(`%cError: ${faceScreaming} %c${error}` ,style1,style2)
        throw new Error(error.response.data.error);
    })
   
}

export const updatePerson = (personObject) => {
    return api.put(`/${personObject.id}`,personObject).then((response) => {return response.data})
    .catch((error) => {
        console.log(`%cError: ${faceScreaming} %c${error}` ,style1,style2)
        throw new Error(error.response.data.error);
    })
   
}

export default {
    fetchPersons,
    createPerson,
    deletePerson,
    updatePerson
  };