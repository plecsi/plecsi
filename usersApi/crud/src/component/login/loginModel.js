//import { parseOnlyLetterAndSpace, parseLength } from '../v/services/inputParser'; checkIsTrue
import { checkAtLeastLength, checkEmailPattern, checkIsfilled  } from '../v/services/inputValidator';

const registrationModel = [{
        name: 'email',
        label: 'Email',
        type: 'email',
        validators: [{
            id: 'mail-pattern',
            isValidFun: checkEmailPattern,
            alert: 'Email is not valid'
        }, {
            id: 'email-required',
            isValidFun: checkIsfilled,
            alert: 'Email is empty'
        }]
    },
    {
    name: 'password',
    label: 'Password',
    type: 'password',
    validators: [{
        id: 'password-length',
        isValidFun: expression => checkAtLeastLength(expression, 2),
        alert: 'Name is too short'
    }]
}];

export default registrationModel;