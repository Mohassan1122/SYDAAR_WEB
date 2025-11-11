// store users and reset codes in localStorage for demo
export const storeUser = (user) => {
  const users = JSON.parse(localStorage.getItem("sydaar_users") || "[]");
  users.push(user);
  localStorage.setItem("sydaar_users", JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem("sydaar_users") || "[]");
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const updateUserPassword = (email, newPassword) => {
  const users = JSON.parse(localStorage.getItem("sydaar_users") || "[]");
  const idx = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (idx !== -1) {
    users[idx].password = newPassword;
    localStorage.setItem("sydaar_users", JSON.stringify(users));
    return true;
  }
  return false;
};

export const createReset = (email) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const payload = { email, code, createdAt: Date.now() };
  localStorage.setItem("sydaar_reset", JSON.stringify(payload));
  return payload;
};

export const getReset = () => {
  return JSON.parse(localStorage.getItem("sydaar_reset") || "null");
};

export const clearReset = () => localStorage.removeItem("sydaar_reset");
