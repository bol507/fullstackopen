import React, { useState } from 'react';

const Authors = ({ show, authorsgql, setAuthorBorn }) => {
	const [authorId, setAuthorId] = useState('');
	const [bornYear, setBornYear] = useState('');
  
	if (!show) {
		return null;
	}
	if (authorsgql.loading) {
		return <div>loading...</div>;
	}
	const authors = authorsgql.data.allAuthors;

	const handleChange = (event) => {
		console.log(event.target.value)
		setAuthorId(event.target.value)
	  }
  
	const submit = async (event) => {
		event.preventDefault()
		if (authorId) {
			console.log('authorid', authorId);
			await setAuthorBorn({ variables: { id: authorId, setBornTo: parseInt(bornYear) } });
			setAuthorId('');
			setBornYear('');
		} else {
			console.log('Debes seleccionar un autor antes de enviar el formulario.');
		}
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Set Birthyear</h2>
			<form onSubmit={submit}>
				<label>Autor:</label>
				<select value={authorId} onChange={handleChange}>
					<option value="">select author</option>
					{authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>
				<br />
				<label>Born Year:</label>
				<input
					type="number"
					value={bornYear}
					onChange={({ target }) => setBornYear(parseInt(target.value, 10))}
				/>
        <br/>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
