const mockCoworkings = require("./mock-coworking");
const mockUsers = require("./mock-user");
const bcrypt = require("bcrypt");

const setCoworkings = (Coworking) => {
  mockCoworkings.forEach((element) => {
    const newCoworking = { ...element };
    Coworking.create(newCoworking)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  });
};

const setUsers = (User) => {
  mockUsers.forEach((user) => {
    if (
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){5,}$/gm.test(
        user.password
      )
    ) {
      bcrypt
        .hash(user.password, 10)
        .then((hash) => {
          User.create({ ...user, password: hash })
            .then(() => {})
            .catch((error) => {
              console.log(error.message);
            });
        })
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.log({
        message:
          "Le mot de passe doit avoir 5 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
        data: user.email,
      });
    }
  });
};

const setRoles = (Role) => {
  Role.create({ label: "admin" })
    .then(() => {})
    .catch((error) => {
      console.log({ message: error.message });
    }),
    Role.create({ label: "editor" })
      .then(() => {})
      .catch((error) => {
        console.log({ message: error.message });
      });
};

module.exports = { setCoworkings, setUsers, setRoles };
