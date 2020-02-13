class Validator {

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPassword(password) {
        if (/\s/.test(password)) {
            return false;
        } else if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            return true;
        } else {
            return false;
        }
    }

    isValidName(name){
        return /^[a-zA-Z ]+$/.test(name);
    }

    isValidNumber(number){
        return /^\d*$/.test(number);
    }
}

const validator = new Validator();
export default validator;