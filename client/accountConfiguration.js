/*global AccountsTemplates*/
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
//Restrict e-mails only from uniandes:
Accounts.config({
  restrictCreationByEmailDomain: 'uniandes.edu.co'
});

AccountsTemplates.configure({
  texts: {
    title: {
      signIn: '',
      signUp: '',
    },
    errors:{
      loginForbidden: 'Wrong login credentials'
    },
    button: {
      signIn: 'Log in',
      signUp: 'Sign up',
    },
    signInLink_pre: 'Already have an account?',
    signInLink_link: 'Log in',
    signUpLink_pre: 'Don\'t have an account?',
    signUpLink_link: 'Register',
    requiredField: 'Requied field'
  },
  onSubmitHook(err){
    //Don't redirect on failed submit
    if(err) return;
    //Redirect on successful submit
    FlowRouter.go('home'); 
  }
});

let pwd = AccountsTemplates.removeField('password');
pwd.displayName = 'Password';
pwd.placeholder = 'Password';
pwd.errStr = 'Your password is too short';

//Configure access form 
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'email',
    type: 'email',
    required: true,
    placeholder: 'Email',
    displayName: 'Email',
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'The email address you supplied is invalid',
  },
  {
    _id: 'username',
    type: 'text',
    displayName: 'Username',
    placeholder: 'Username',
    required: true,
    minLength: 6,
    errStr: 'The username should be at least 6 characters long'
  },
  {
    _id: 'username_and_email',
    type: 'text',
    required: true,
    displayName: 'Email or username',
    placeholder: 'Email or username'
  },
  pwd,
  {
    _id: 'password_again',
    type: pwd.type,
    displayName: 'Confirm password',
    placeholder: 'Confirm password',
    required: true,
  }
]);
