import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ContactList from '../components/ContactList'
import SearchBar from '../components/SearchBar';
import LocaleContext from '../context/LocaleContext';
import { deleteContact, getContacts } from '../utils/api';

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contacts, setContacts] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || '';
    })
    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        getContacts().then(({ data }) => {
            setContacts(data)
        })
    }, [])

    const onDeleteHandler = async (id) => {
        await deleteContact(id);
        const { data } = await getContacts()
        setContacts(data)
    }

    const onKeywordChangeHandler = (keyword) => {
        setKeyword(keyword);
        setSearchParams({ keyword });
    }

    const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(keyword.toLowerCase())
    })

    return (
        <section>
            <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
        </section>
    )
}

export default HomePage