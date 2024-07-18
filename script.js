const passwordBox = document.getElementById("password");
const passwordStrength = document.getElementById("passwordStrength");
const copyMessage = document.getElementById("copyMessage");

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let charSet = "";
  if (includeUppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charSet += "0123456789";
  if (includeSymbols) charSet += "!@#$%^&*()_+}{]{><?-=";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  passwordBox.value = password;
  updatePasswordStrength(password);

  // Hide the error message if it is displayed
  hideErrorMessage();
}

function copyPassword() {
  if (passwordBox.value === "") {
    showErrorMessage("Password not generated yet!");
  } else {
    passwordBox.select();
    document.execCommand("copy");
    showCopyDialog();
  }
}

function showErrorMessage(message) {
  copyMessage.textContent = message;
  copyMessage.classList.add("visible");
  copyMessage.style.visibility = "visible";
  copyMessage.style.height = "auto";
  setTimeout(() => {
    copyMessage.style.visibility = "hidden";
    copyMessage.classList.remove("visible");
    copyMessage.style.height = "0";
  }, 10000);
}

function hideErrorMessage() {
  copyMessage.style.visibility = "hidden";
  copyMessage.classList.remove("visible");
  copyMessage.style.height = "0";
}

function showCopyDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'custom-dialog';
  
  const message = document.createElement('p');
  message.textContent = "Password copied to clipboard!";
  
  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.onclick = () => {
    document.body.removeChild(dialog);
  };

  const refreshButton = document.createElement('button');
  refreshButton.textContent = 'Refresh';
  refreshButton.onclick = () => {
    location.reload();
  };

  dialog.appendChild(message);
  dialog.appendChild(okButton);
  dialog.appendChild(refreshButton);
  
  document.body.appendChild(dialog);
}

function updatePasswordStrength(password) {
  let strength = 0;

  // Length bonus
  strength += Math.min(password.length / 8, 1);

  // Character complexity bonus
  const complexity = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
    symbols: /[^A-Za-z0-9]/,
  };

  for (const pattern of Object.values(complexity)) {
    if (pattern.test(password)) {
      strength++;
    }
  }
  const strengthPercentage = Math.round((strength / 4) * 100);
  passwordStrength.textContent = `Password Strength: ${strengthPercentage}%`;
}
