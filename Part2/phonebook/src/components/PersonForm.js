import React from 'react';

const PersonForm = ({ newName, newPhone, handleNameChange, handlePhoneChange, handleAdd }) => {
  return (
    <div>
      <form onSubmit={handleAdd}>
        <div>
          Name: <input value={newName}
                        onChange={handleNameChange}
                />
        </div>
        <div>
          Phone: <input value = {newPhone}
                        onChange={handlePhoneChange}
                />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm;