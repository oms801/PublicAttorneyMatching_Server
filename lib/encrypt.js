const bcrypt = require('bcrypt')

exports.enc = function(sign_up_password) { 
   return bcrypt.hashSync(sign_up_password, 10);
}

exports.comp = function(login_password, encrypted_password) { 
   return bcrypt.compareSync(login_password, encrypted_password);
}
