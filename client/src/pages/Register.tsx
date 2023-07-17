import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Field, FormikProps, withFormik  } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register } from '../store/userSlice';
import { AppDispatch } from '../store/store';
import { userSelector } from '../store/userSlice';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface OtherProps {
  message?: string;
  dispatch?: AppDispatch;
  navigate?: NavigateFunction;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const styles = {
    input: 'bg-slate-200 p-1 w-full rounded-sm',
    error: 'text-red-500 text-sm italic text-left mt-2',
  }

  return (  
    <Form className='flex gap-5 flex-col'>
      <div className='w-full'>
        <Field type="text" name="name" className={styles.input} placeholder="Name"  />
        {touched.name && errors.name && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div>
        <Field type="email" name="email" placeholder="Email" className={styles.input} />
        {touched.email && errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>
      <div>
        <Field type="password" name="password" className={styles.input} placeholder="Password" />
        {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
      </div>
      <button type="submit" disabled={isSubmitting} className='bg-green-700 text-gray-300 p-1 rounded-md hover:bg-green-600 mt-3'>
        Sign up
      </button>
    </Form>
  )
}

interface RegisterFormProps {
  initialEmail?: string;
  message?: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

const RegisterForm = withFormik<RegisterFormProps, FormValues> ({
  mapPropsToValues: props => {
    return {
      name: "",
      email: props.initialEmail || "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be longer than 1 character!")
      .required("Name is required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .required("Password is required!")  
  }),

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    void props.dispatch(register(values));
    resetForm();
    setSubmitting(false);
    props.navigate('/', {replace: true});
  },
})(InnerForm);

const Register: React.FC = () => {

  const { userInfo } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex justify-center mt-20'>
      <div className='flex flex-col w-80 bg-slate-300 text-purple-950 shadow-lg rounded-md p-4'>
        <h1 className='font-bold text-xl mb-5'>
          Register
        </h1>
        { userInfo ? 
          (<div>You are already login</div>)
          : <RegisterForm dispatch={dispatch} navigate={navigate} />
        }
      </div>
    </div>
  )
}

export default Register;
