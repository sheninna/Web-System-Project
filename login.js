
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    var form = this;
    var passwordInput = document.getElementById('password');
    var emailInput = document.getElementById('email');
    var passwordFeedback = document.getElementById('passwordFeedback');

    
    passwordInput.setCustomValidity('');
    emailInput.setCustomValidity('');

    
    if (passwordInput.value.trim() === '') {
        passwordInput.setCustomValidity('Password is required.');
        passwordFeedback.textContent = 'Password is required.';
    } else {
        passwordInput.setCustomValidity('');  
    }

    // Check if the form is valid
    if (form.checkValidity()) {
        
        window.location.href = "cafe.html";  // Replace with the correct HTML page
    } else {
        
        form.classList.add('was-validated');
        event.stopPropagation();
    }
}, false);
