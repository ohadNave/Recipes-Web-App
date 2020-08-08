<template>
  <div class="container">
    <br>
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username">
        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must be alphabetic
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-firstName" label-cols-sm="3" label="First name:" label-for="firstName">
        <b-form-input id="firstName" type="text" v-model="$v.form.firstName.$model" :state="validateState('firstName')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          first name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-lastName" label-cols-sm="3" label="last name:" label-for="lastName">
        <b-form-input id="lastName" type="text" v-model="$v.form.lastName.$model" :state="validateState('lastName')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')"></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
          Password must be 5-10 characters long.
        </b-form-invalid-feedback>
         <b-form-invalid-feedback v-if="!$v.form.password.alpha">
          Password must contain at least one number and one speical character.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-confirmedPassword" label-cols-sm="3" label="Confirm Password:" label-for="confirmedPassword">
        <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-email" label-cols-sm="3" label="email:" label-for="email">
        <b-form-input id="email" type="text" v-model="$v.form.email.$model" :state="validateState('email')"></b-form-input>
          <b-form-invalid-feedback>
          must be a valid email address
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-image" label-cols-sm="3" label="image:" label-for="image">
        <b-form-input id="image" type="text" v-model="$v.form.image.$model" :state="validateState('image')"></b-form-input>
          <b-form-invalid-feedback>
          must be a vaild url
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="dark">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75 Rbtn">Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url,
  helpers
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
         alpha : helpers.regex('alpha', /^(?=.*[@#$%^&+=~!`])(?=.*[0-9])/)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      firstName:{
        required
      },
      lastName:{
        required
      },
      email:{
        required,
        email
      },
      image:{
        required
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "https://backend3-2.herokuapp.com/register",
          {
            username: this.form.username,
            password: this.form.password,
            passwordAgain: this.form.confirmedPassword,
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
            image: this.form.image
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}

.Rbtn{
   background-color: #FA8072; border-color: white
}
</style>