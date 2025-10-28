const form = document.querySelector('form');
// ▼▼▼ PASTE YOUR GOOGLE SCRIPT URL HERE ▼▼▼
const googleSheetURL = 'https://script.google.com/macros/s/AKfycbzAxqgHTaTMAh976on5bGuQSjfB_EOy86gwHWp1-Yvi9i0PRU9fy8M-hKO6QSV0jobMPw/exec'; 
// ▲▲▲ PASTE YOUR GOOGLE SCRIPT URL HERE ▲▲▲

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameInput = document.getElementById("Boy");
    const secondNameInput = document.getElementById("Girl");

    // Check if inputs are empty
    if (firstNameInput.value.trim() === '' || secondNameInput.value.trim() === '') {
        document.querySelector('h2').textContent = `Result: Please enter both names!`;
        return;
    }

    // Calculate the result
    const l1 = firstNameInput.value.length;
    const l2 = secondNameInput.value.length;
    const compatibilityResult = Math.pow(l1 + l2, 3) % 101;

    // Create the data object to send to Google Sheets
    const dataToSend = {
        name1: firstNameInput.value,
        name2: secondNameInput.value,
        result: `${compatibilityResult}%`
    };

    // Send the data to your Google Sheet using fetch
    fetch(googleSheetURL, {
        method: 'POST',
        mode: 'no-cors', // This is important for this type of request
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(() => {
        console.log('Data sent to Google Sheet!');
    })
    .catch((error) => {
        console.error('Error sending data:', error);
    });

    // Display the result on the page and reset the form
    document.querySelector('h2').textContent = `Result: ${compatibilityResult}% Compatible`;
    form.reset();
});