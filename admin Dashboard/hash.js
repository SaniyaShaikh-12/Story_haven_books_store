const bcrypt = require('bcryptjs');

const password = '';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(`Hashed password: password`);
});
