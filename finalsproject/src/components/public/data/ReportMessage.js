import React from 'react';

function ReportMessage({ 
    report, 
    user = {}, 
    role = {},
    email = {},
    newUser = {}, 
    book = {}, 
    oldBook = {}, 
    selectedUser = {}, 
    borrower = {} 
}) {
    let message = '';

    switch (report) {
        case 'login':
            message = `User Login---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has logged in.`;
            break;
        case 'logout':
            message = `User Logout---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has logged out.`;
            break;
        case 'add-user':
            message = `Added User---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has added a new User into the system! \n
                        User: ${newUser.name || "Unknown Name"} \n
                        | Email: ${newUser.email || "Unknown Email"} \n
                        | Role: ${newUser.role || "Unknown Role"}`;
            break;
        case 'add-book':
            message = `Added Book---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has added a new Book into the system! \n 
                        Book ID: ${book.id || "Unknown ID"} \n
                        | Book Title: ${book.title || "Unknown Title"} \n
                        | Book Genre: ${book.genre || "Unknown Genre"}`;
            break;
        case 'add-reservation':
            message = `Added Reservation Request---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has requested a reservation for 
                        ${book.id || "Unknown Book ID"} ${book.title || "Unknown Book Title"}`;
            break;
        case 'update-user':
            message = `Updated User---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has updated a ${newUser.role || "Unknown"} User's (${newUser.email || "Unknown Email"}) information!`;
            break;
        case 'update-book':
            message = `Updated Book---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has updated a Book's (${book.ID || "Unknown Book ID"}) information!`;
            break;
        case 'delete-user':
            message = `Deleted User---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has deleted ${selectedUser.role || "Unknown"} User, 
                        ${selectedUser.name || "Unknown Name"} (${selectedUser.email || "Unknown Email"}).`;
            break;
        case 'delete-book':
            message = `Deleted Book---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has deleted Book ${book.ID || "Unknown Book ID"} ${book.Title || "Unknown Title"}.`;
            break;
        case 'delete-reservation':
            message = `Removed Reservation Request---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has cancelled their reservation request for 
                        ${book.id || "Unknown Book ID"} ${book.title || "Unknown Title"}.`;
            break;
        case 'accept-reservation':
            message = `Accepted Reservation Request---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has accepted ${borrower.user || "Unknown Borrower"}'s 
                        (${borrower.email || "Unknown Borrower Email"}) request for ${borrower.bookID || "Unknown Book ID"} ${borrower.bookTitle || "Unknown Book Title"}.`;
            break;
        case 'reject-reservation':
            message = `Rejected Reservation Request---${role || "Unknown"} User, ${user || "Unknown Name"} (${email || "Unknown Email"}), has rejected ${borrower.user || "Unknown Borrower"}'s 
                        (${borrower.email || "Unknown Borrower Email"}) request for ${borrower.bookID || "Unknown Book ID"} ${borrower.bookTitle || "Unknown Book Title"}.`;
            break;
        case 'return':
            message = `Book Returned---${user.role || "Unknown"} User, ${user.name || "Unknown Name"} (${user.email || "Unknown Email"}), has received ${entry.bookID || "Unknown Book ID"} ${entry.bookTitle || "Unknown Book Title"} 
          from ${entry.user || "Unknown Borrower"} (${entry.email || "Unknown Borro wer Email"}). The total late fee is: ${enrty.lateFee} PHP.`;
            break;
        default:
            message = "Unknown report type.";
            break;
    }

    return <p>{message}</p>;
}

export default ReportMessage;
