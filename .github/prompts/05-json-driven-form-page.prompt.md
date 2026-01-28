---
tools: []
description: 'Create JSON object configuration for form fields to handle all attributes, nodes and error messages.'
---

# JSON-Driven Form Page Template Prompt

## Overview

This prompt provides a **generic template** for creating JSON-driven form configurations in any React application. Instead of hardcoding form fields in component code, define everything in a JSON configuration file and reuse the same component logic.

## Step-by-Step Implementation

### Step 1: Create Form Configuration File
const formFields = {
  email: {
    id: 'email',
    type: 'email',
    name: 'email',
    placeholder: '',
    label: 'Email Address',
    value: '',
    isRequired: true,
    hasError: false,
    errorMessage: '',
    validationRules: {
      required :{
        value: true,
        message: 'Email is required.'
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Please enter a valid email address.'
      }
    },
    ariaLabel: 'Email Address',
    ariaDescribedBy: 'emailHelp',
    tooltip: 'We\'ll never share your email with anyone else.'
  },
  password: {
    id: 'password',
    type: 'password',
    name: 'password',
    placeholder: '',
    label: 'Password',
    value: '',
    isRequired: true,
    hasError: false,
    errorMessage: '',
    validationRules: {
      required: {
        value: true,
        message: 'Password is required.'
      },
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long.'
      }
    },
    ariaLabel: 'Password',
    ariaDescribedBy: 'passwordHelp'
    tooltip: 'Choose a strong password to keep your account secure.'
  }
};

once the form configuration JSON is ready, proceed to Step 2.

### Step 2: setup form object in react state hook
const [formData, setFormData] = useState<FormDataType>(() => {
  const initialData: FormDataType = {};
  clonedFormConfig.form.inputs.forEach((input: any) => {
    initialData[input.id] = '';
  });
  return initialData;
});

### Step 3: render the form inputs by JSON object node names
Example:
<TextInput {...formData.email} onChange={(e) => handleInputChange(e)} />
<TextInput {...formData.password} onChange={(e) => handleInputChange(e)} />

### Step 4: write a common event handlers for all form input change event
const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value, type, checked } = e.target;
  // if any consitions required based on field id/name add a switchcase or if condition here
  setFormData({
    ...formData,
    [name]: type === 'checkbox' ? checked : value,
  });
};

### Step 5: handle form submission and validation
const handleFormSubmit = (e: FormEvent) => {
  e.preventDefault();
  const newErrors: FormFieldError = {};
  let hasErrors = false;

  import a common validation method from utils/validation.ts file
  const {status, formData} = validationService.validateformObject(formData);

  setErrorStatus(status);

  if (status) {
    // Process form submission (e.g., API call)
    console.log('Form submitted successfully:', formData);
  }
}; 

---
By following this prompt, you can create flexible, reusable forms driven entirely by JSON configurations, improving maintainability and scalability in your React applications.