export const getUser =()=>{
    const user = JSON.parse(localStorage.getItem("users")) || [];
    return user;
}

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
}

export const registerUser = (newUser) => {
  const users = getUser();

  const existingUser = users.find(
    (user) => user.email === newUser.email
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem("user", JSON.stringify({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    photo: newUser.photo
  }));

  return newUser;
};



export const loginUser = (email, password) => {
  const users = getUser();
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export const logoutUser = () => {
  localStorage.removeItem("user");
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}