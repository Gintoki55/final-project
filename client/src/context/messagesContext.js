import { createContext, useContext, useState } from 'react';

// Create a new context for messages
const messagesContext = createContext();

// Custom hook to use the messagesContext easily in components
export const useMessageContext = () => useContext(messagesContext);

// Provider component to wrap the app and provide messages state
export const MessagesProvider = ({ children }) => {
    // Status messages for add, edit, delete actions
    const [status] = useState([
        {
            loading: 'Adding your note...',       // Loading message when adding
            success: 'Note added successfully!',  // Success message
            error: 'Failed to add note!',         // Error message
        },
        {
            loading: 'Editing your note...',      
            success: 'Note edited successfully!',
            error: 'Failed to edit note!',
        }, 
        {
            loading: 'Deleting your note...',
            success: 'Note deleted successfully!',
            error: 'Failed to delete note!',
        }
    ]);

    // Welcome messages for login
    const [loginMessages] = useState([
        { message: "Welcome back, [User]! Ready to capture your thoughts?", icon: '📝' },
        { message: "Good to see you, [User]! Let's jot down some ideas.", icon: '💡' },
        { message: "Hello again, [User]! What’s on your mind today?", icon: '✨' },
        { message: "Back at it, [User]? Your notes await!", icon: '🗒️' },
        { message: "Glad to have you, [User]! Start where you left off.", icon: '🚀' },
        { message: "welcome, [User]!", icon: '😁' },
    ]);

    // Welcome messages for signup
    const [signupMessages] = useState([
        { message: "Welcome aboard, [User]! Let's start your note-taking journey!", icon: '🌟' },
        { message: "Hello, [User]! Ready to create your first note?", icon: '✍️' },
        { message: "You're in, [User]! Capture your thoughts and make them shine.", icon: '💡' },
        { message: "Excited to have you, [User]! Begin organizing your ideas today.", icon: '🚀' },
        { message: "Welcome, [User]! Your creative journey starts now.", icon: '🎉' },
        { message: "hello, [User]!", icon: '😉' },
    ]);

    // Provide the state values to all children components
    return (
        <messagesContext.Provider value={{status, loginMessages, signupMessages}}>
            {children}
        </messagesContext.Provider>
    );
}
