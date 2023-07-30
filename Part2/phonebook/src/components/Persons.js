import React from 'react';
const Persons = (props) =>{
    const filterPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.search.toLowerCase()))
    return (
        <ul>
            {
            filterPersons.map(person => (
                
                <li key={person.name}>
                    {person.name} {person.number}
                    <button type='button' onClick={() => props.handleDelete(person)}>delete</button>
                </li>
            ))
            }
            
        </ul>
        
    )
}
export default Persons;