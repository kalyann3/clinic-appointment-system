import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  dob: Yup.date().required('Required'),
  age: Yup.number().required('Required'),
  address: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
});

function Signup() {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          dob: '',
          age: '',
          address: '',
          contactNumber: '',
          email: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userValues = {
              ...values,
              age: calculateAge(values.dob)
            };
            await axios.post('/api/auth/signup', userValues);
            alert('Signup successful, please check your email for login details.');
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div>
              <label>First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div>
              <label>Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div>
              <label>Gender</label>
              <Field as="select" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>
            <div>
              <label>Date of Birth</label>
              <Field 
                type="date" 
                name="dob" 
                onChange={(e) => {
                  setFieldValue('dob', e.target.value);
                  setFieldValue('age', calculateAge(e.target.value));
                }}
              />
              <ErrorMessage name="dob" component="div" />
            </div>
            <div>
              <label>Age</label>
              <Field type="number" name="age" value={values.age} readOnly />
              <ErrorMessage name="age" component="div" />
            </div>
            <div>
              <label>Address</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" />
            </div>
            <div>
              <label>Contact Number</label>
              <Field type="text" name="contactNumber" />
              <ErrorMessage name="contactNumber" component="div" />
            </div>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
