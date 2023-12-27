import React from 'react';
import ContactItemBody from './ContactItemBody';
import ContactItemImage from './ContactItemImage';
import DeleteButton from './DeleteButton';
import { string, func } from 'prop-types';
 
function ContactItem({ imageUrl, name, tag, id, onDelete }) {
 return (
   <div className="contact-item">
     <ContactItemImage imageUrl={imageUrl} />
     <ContactItemBody name={name} tag={tag} />
     <DeleteButton id={id} onDelete={onDelete} />
   </div>
 );
}

ContactItem.propTypes = {
  imageUrl: string.isRequired,
  name: string.isRequired,
  tag: string.isRequired,
  id: string.isRequired,
  onDelete: func.isRequired
}
 
export default ContactItem;