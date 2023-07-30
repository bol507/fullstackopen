const Language = (props) => {
    return (
        <div>
            <h2>Spoken languages</h2>
            <ul>
                
                {props.language.map((lang,index) => (
                    <li key={index}>{lang}</li>
                ))}
            </ul>
        </div>
    )

}

export default Language