document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (validateForm(username, password)) {
        // You can perform additional actions, such as sending data to the server
        console.log('Form is valid. Logging in...');
      }
    });
  
    function validateForm(username, password) {
      if (!username.trim() || !password.trim()) {
        alert('Please enter both username and password.');
        return false;
      }
      return true;
    }
  });
 // login.js
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch('http://localhost:3000/student/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle the login response here
    alert(data.message); // You might want to redirect or perform other actions
  })
  .catch(error => console.error('Error:', error));
}
