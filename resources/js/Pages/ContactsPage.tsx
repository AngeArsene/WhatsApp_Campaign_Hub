import React, { useState } from 'react';
import ContactsList from '../components/contacts/ContactsList';
import ContactForm from '../components/contacts/ContactForm';
import { Contact, StrippedContact } from '../types';
import { Upload, X } from 'lucide-react';
import Layout from '@/Layouts/Main/Layout';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const ContactsPage: React.FC<{ contacts: Contact[] }> = ({ contacts: contactsProp }) => {

    const [contacts, setContacts] = useState<Contact[]>(contactsProp);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
    const [showImportModal, setShowImportModal] = useState(false);

    const handleAddContact = async (contactData: StrippedContact): Promise<void> => {
        const newContact: Contact = await axios.post('/contacts', contactData)
            .then(response => response.data as Contact);

        setContacts([...contacts, newContact]);
        setShowAddForm(false);
    };

    const handleEditContact = async (contactData: StrippedContact): Promise<void> => {
        if (editingContact) {
            const updatedContact: Contact = await axios.put(`/contacts/${editingContact.id}`, contactData)
                .then(response => response.data as Contact);

            // Update local state
            const updatedContacts = contacts.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact
            );

            setContacts(updatedContacts);
            setEditingContact(undefined);
        }
    };

    const handleDeleteContact = async (id: number): Promise<void> => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        await axios.delete(`/contacts/${id}`);

        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <Layout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                    <p className="text-gray-600">Manage your customer contact list</p>
                </div>

                {showAddForm ? (
                    <ContactForm
                        onSave={handleAddContact}
                        onCancel={() => setShowAddForm(false)}
                    />
                ) : editingContact ? (
                    <ContactForm
                        contact={editingContact}
                        onSave={handleEditContact}
                        onCancel={() => setEditingContact(undefined)}
                    />
                ) : (
                    <ContactsList
                        contacts={contacts}
                        onAdd={() => setShowAddForm(true)}
                        onImport={() => setShowImportModal(true)}
                        onEdit={setEditingContact}
                        onDelete={handleDeleteContact}
                    />
                )}

                {/* Import Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Import Contacts</h3>
                                <button
                                    onClick={() => setShowImportModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-4">
                                    Upload a CSV or Excel file containing your contacts. The file should have columns for first name, last name, and phone number.
                                </p>

                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                        Drag and drop your file here
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Supports CSV and Excel files up to 5MB
                                    </p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".csv,.xlsx,.xls"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                                    >
                                        Select File
                                    </label>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6">
                                <p className="text-xs text-yellow-800">
                                    Make sure your file has the correct format. Download our template if needed.
                                </p>
                                <a
                                    href="#"
                                    className="text-xs font-medium text-teal-600 hover:text-teal-800 mt-1 inline-block"
                                >
                                    Download CSV template
                                </a>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowImportModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    Import
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ContactsPage;
