//If the returning array is anything but 0 length, the password complexity failed.
//Each item in the array is an issue to be addressed.
export function checkPasswordComplexity(password, confirmPassword){
    var retval = [];
    const lowercaseRegex = new RegExp("[a-z]");
    const uppercaseRegex = new RegExp("[A-Z]");
    const numberRegex = new RegExp("[0-9]");
    //const puncRegex = new RegExp("[!@#$%^&*()[]{};:'\"\\|<>,./?-_=+]");
    const puncRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    if (!lowercaseRegex.test(password)){
        retval.push("Require 1 lowercase letter");
    }
    if (!uppercaseRegex.test(password)){
        retval.push("Require 1 uppercase letter");
    }
    if (!numberRegex.test(password)){
        retval.push("Require 1 number");
    }
    if (!puncRegex.test(password)){
        retval.push("Require 1 punctuation character");
    }
    if (password.length < 8)
    {
        retval.push("Require 8 character minimum");
    }
    if (password !== confirmPassword)
    {
        retval.push("passwords must match");
    }
    return retval;
    
}


export function checkEmailAddressFormat(email)
{
    if (/^[^@]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/.test(email))
    {
        return true;
    }
    else
    {
        return false;
    }
}