exports.phoneNumberIsValid = (phoneNumber) => {
    var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phoneNumber.match(phoneNumberPattern)) {
      return true;
    }
    return false;
}

exports.emailIsValid = (email) => {
    var emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(email.match(emailPattern)) {
      return true;
    }
    return false;
}
  
  exports.warehouseFormIsValid = (formBody) => {
    if (!formBody.name || !formBody.address || !formBody.city || !formBody.country || !formBody.contact.name || !formBody.contact.position || !formBody.contact.phone || !formBody.contact.email) {
      return false;
    }
    return true;
}