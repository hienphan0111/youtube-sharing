import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Field, FormikProps, withFormik  } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from '../store/hooks';
import { AppDispatch } from '../store/store';
import { addVideoShared } from '../store/videoSharedSlice';

export interface FormValues {
  title: string;
  description: string;
  url: string;
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
    textArea: 'bg-slate-200 p-1 w-full h-20 rounded-sm',
  }

  return (  
    <Form className='flex gap-5 flex-col'>
      <div>
        <Field type="text" name="title" placeholder="Title" className={styles.input} />
        {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
      </div>
      <div>
        <Field type="text" name="url" className={styles.input} placeholder="Video Url" />
        {touched.url && errors.url && <div className={styles.error}>{errors.url}</div>}
      </div>
      <div>
        <Field type="textarea" name="description" className={styles.textArea} placeholder="Description" />
        {touched.description && errors.description && <div className={styles.error}>{errors.description}</div>}
      </div>
      <button type="submit" disabled={isSubmitting} className='bg-green-700 text-gray-300 p-1 rounded-md hover:bg-green-600 mt-3'>
        Add video
      </button>
    </Form>
  )
}

interface LoginFormProps {
  message?: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

const LoginForm = withFormik<LoginFormProps, FormValues> ({
  mapPropsToValues: () => {
    return {
      title: "",
      description: "",
      url: "",
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short!")
      .required("Title is required!"),
    url: Yup.string()
      .url('Invalid URL')
      .required("Url is required!"),
    description: Yup.string(),
  }),

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    void props.dispatch(addVideoShared(values));
    setSubmitting(false);
    resetForm();
    props.navigate('/myvideo');
  },
})(InnerForm);

const AddNewVideoForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex justify-center mt-20'>
      <div className='flex flex-col w-80 bg-slate-300 text-purple-950 shadow-lg rounded-md p-4'>
        <h1 className='font-bold text-xl mb-5'>
          Add new Video
        </h1>
        <LoginForm dispatch={dispatch} navigate={navigate} />
      </div>
    </div>
  )
}

export default AddNewVideoForm;
