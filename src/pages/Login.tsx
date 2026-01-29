import { useState, type ChangeEvent, type FormEvent } from 'react';
import loginConfig from '../config/login.json';
import { deepClone } from '../scripts/utils';
import { validateFormFields } from '../scripts';
import Card from '../components/Card';
import Typography from '../components/Typography/Typography';
import CardContent from '../components/Card/CardContent';
import TextField from '../components/TextField/TextField';
import Button from '../components/Button/Button';

type FormDataType = typeof loginConfig;

const Login = () => {
  // Deep clone the login config to avoid mutating the original JSON
  const clonedLoginConfig = deepClone(loginConfig);

  // Initialize form data from login.json configuration
  const [formData, setFormData] = useState<FormDataType>(clonedLoginConfig);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id as keyof FormDataType]: {
      ...prevData[id as keyof FormDataType],
      value,
      hasError: false,
      errorMessage: '',
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Refer to the method from common scripts, it will return the full object and flag list

    const { status } = validateFormFields(formData);

    if (status) {
      // Form is valid, proceed with submission logic
      alert('Login Successful!');
      // Reset form after successful submission
      setFormData(clonedLoginConfig);
    } else {
      setFormData(prevData => ({
        ...prevData
      }));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-auto">
        {/* Login Form Card */}
        <Card variant="outlined" className="bg-white rounded-xl shadow-2xl overflow-hidden w-[420px]">
          {/* Card Header */}
          <div className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <Typography variant="h2" className="text-center text-gray-900">
              Login
            </Typography>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Card Content - Form Inputs */}
            <CardContent className="p-8">
              <div className="space-y-6">
                <TextField {...formData.email} onChange={handleInputChange} />
                <TextField {...formData.password} onChange={handleInputChange} />
              </div>
            </CardContent>
            {/* Card Actions - Submit Button */}
            <CardContent className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <Button
                variant='contained'
                color='primary'
                size='medium'
                fullWidth
                type='submit'
                id='submit'>
                Login
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;