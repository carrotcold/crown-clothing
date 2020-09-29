import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async ev => {
    ev.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.warn('Create Error', error);
    }
  };

  handleChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">아직 계정이 없어요..</h2>
        <span>이메일과 패스워드를 입력하세요</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label="Display Name"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="text"
            name="email"
            value={email}
            label="Email"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            onChange={this.handleChange}
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
