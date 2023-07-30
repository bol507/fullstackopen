import api from './api'

const URLS =  {
    Persons: 'persons'
    
}
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
    return api.get(URLS.Persons).then((response) => {return response.data})
}

export const deletePerson = (id) => {
    return api.delete(`${URLS.Persons}/${id}`)
}

export const createPerson = (person) =>{
    return api.post(URLS.Persons,person).then((response) => {return response.data})
    .catch((error) => {
        console.log(`%cError: ${faceScreaming} %c${error}` ,style1,style2)
        throw new Error('Error creating person');
    })
   
}

export const updatePerson = (id,personObject) => {
    return api.put(`${URLS.Persons}/${id}`,personObject).then((response) => {return response.data})
    .catch((error) => {
        console.log(`%cError: ${faceScreaming} %c${error}` ,style1,style2)
        throw new Error(`${personObject.name} has already been remove from server`);
    })
   
}

export default {
    fetchPersons,
    createPerson,
    deletePerson,
    updatePerson
  };