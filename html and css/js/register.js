// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    errors: {
      minLength: password.length >= minLength,
      hasUpperCase: hasUpperCase,
      hasLowerCase: hasLowerCase,
      hasNumber: hasNumber,
      hasSpecialChar: hasSpecialChar
    }
  };
}

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const roleSelected = document.querySelector('input[name="role"]:checked');

  // Role validation
  const roleError = document.getElementById('role-error');
  if (!roleSelected) {
    roleError.style.display = 'block';
    return;
  } else {
    roleError.style.display = 'none';
  }

  // Email validation
  if (!validateEmail(email)) {
    alert('Please enter a valid email address (e.g., user@example.com)');
    return;
  }

  // Password validation
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    let errorMsg = 'Password must contain:\n';
    if (!passwordValidation.errors.minLength) errorMsg += '- At least 8 characters\n';
    if (!passwordValidation.errors.hasUpperCase) errorMsg += '- At least 1 uppercase letter\n';
    if (!passwordValidation.errors.hasLowerCase) errorMsg += '- At least 1 lowercase letter\n';
    if (!passwordValidation.errors.hasNumber) errorMsg += '- At least 1 number\n';
    if (!passwordValidation.errors.hasSpecialChar) errorMsg += '- At least 1 special character\n';
    alert(errorMsg);
    return;
  }

  // Confirm password validation
  if (password !== confirm) {
    alert('Passwords do not match');
    return;
  }

  // Create user object
  const user = {
    id: Date.now(),
    fullname: fullname,
    email: email,
    phone: phone,
    password: password,
    role: roleSelected.value,
    createdAt: new Date().toISOString()
  };

  // Store user in localStorage (simulating backend)
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  // Redirect to login page
  window.location.href = 'login.html';
});
