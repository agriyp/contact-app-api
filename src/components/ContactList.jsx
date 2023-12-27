import React from 'react'
import ContactItem from './ContactItem'
import { arrayOf, object, func } from 'prop-types'


function ContactList ({contacts, onDelete}) {
    return (
        <div className="contact-list">
            {
                contacts.map((contact) => (
                    <ContactItem 
                    key={contact.id}
                    id={contact.id}
                    onDelete={onDelete} 
                    {...contact} />
                ))
            }
        </div>
    )
}

ContactList.propTypes = {
    contacts: arrayOf(object).isRequired,
    onDelete: func.isRequired
}

export default ContactList