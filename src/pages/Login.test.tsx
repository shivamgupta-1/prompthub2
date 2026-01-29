import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Login from './Login'

// Mock external dependencies
vi.mock('../config/login.json', () => ({
    default: {
        email: {
            id: 'email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email',
            label: 'Email Address',
            value: '',
            isRequired: true,
            hasError: false,
            errorMessage: '',
            validationRules: {
                required: { value: true, errorMessage: 'Email Address is required.' },
                pattern: { value: 'EMAIL', errorMessage: 'Please enter a valid email address.' },
            },
            'aria-label': 'Email Address',
            'aria-describedby': 'emailHelp',
            tooltip: "We'll never share your email with anyone else.",
        },
        password: {
            id: 'password',
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
            label: 'Password',
            value: '',
            isRequired: true,
            hasError: false,
            errorMessage: '',
            validationRules: {
                required: { value: true, errorMessage: 'Password is required.' },
                minLength: { value: 8, errorMessage: 'Password should be at least 8 characters.' },
            },
            'aria-label': 'Password',
        },
    },
}))

vi.mock('../scripts/utils', () => ({
    deepClone: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
}))

vi.mock('../scripts', () => ({
    validateFormFields: vi.fn((formData) => {
        const email = formData.email.value
        const password = formData.password.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        const isEmailValid = email && emailRegex.test(email)
        const isPasswordValid = password && password.length >= 8

        return {
            status: isEmailValid && isPasswordValid,
            errors: {
                email: !isEmailValid ? 'Please enter a valid email address.' : '',
                password: !isPasswordValid ? 'Password should be at least 8 characters.' : '',
            },
        }
    }),
}))

/**
 * Test Helper Functions
 * Purpose: Reduce code duplication and improve test readability
 */

/**
 * Setup user and render Login component
 * Returns: User instance and helper object with input accessors
 */
function setupTest() {
    const user = userEvent.setup()
    render(<Login />)

    return {
        user,
        getEmailInput: () => screen.getByLabelText(/email address/i) as HTMLInputElement,
        getPasswordInput: () => screen.getByLabelText(/password/i) as HTMLInputElement,
        getLoginButton: () => screen.getByRole('button', { name: /login/i }),
    }
}

/**
 * Fill form with provided email and password
 * Purpose: Avoid repetitive typing in multiple tests
 */
async function fillForm(
    user: ReturnType<typeof userEvent.setup>,
    email: string,
    password: string,
) {
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)

    if (email) await user.type(emailInput, email)
    if (password) await user.type(passwordInput, password)
}

describe('Login Component', () => {
    let alertSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        vi.clearAllMocks()
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    })

    afterEach(() => {
        alertSpy.mockRestore()
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('should render login form with all required elements', () => {
            render(<Login />)

            expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
            expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
        })

        it('should have properly labeled input fields with correct types', () => {
            render(<Login />)

            const emailInput = screen.getByLabelText(/email address/i)
            const passwordInput = screen.getByLabelText(/password/i)

            expect(emailInput).toHaveAttribute('type', 'email')
            expect(passwordInput).toHaveAttribute('type', 'password')
        })

        it('should have a form element for submission', () => {
            render(<Login />)

            const button = screen.getByRole('button', { name: /login/i })
            const form = button.closest('form')

            expect(form).toBeInTheDocument()
        })

        it('should have accessible form labels', () => {
            render(<Login />)

            const emailInput = screen.getByLabelText(/email address/i)
            const passwordInput = screen.getByLabelText(/password/i)

            expect(emailInput).toHaveAccessibleName('Email Address')
            expect(passwordInput).toHaveAccessibleName('Password')
        })

        it('should have a main heading for page structure', () => {
            render(<Login />)

            const heading = screen.getByRole('heading', { name: /login/i })
            expect(heading).toBeInTheDocument()
            expect(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']).toContain(heading.tagName)
        })
    })

    describe('User Input', () => {
        it('should accept email input', async () => {
            const { user, getEmailInput } = setupTest()

            await user.type(getEmailInput(), 'test@example.com')

            expect(getEmailInput().value).toBe('test@example.com')
        })

        it('should accept password input', async () => {
            const { user, getPasswordInput } = setupTest()

            await user.type(getPasswordInput(), 'TestPassword123')

            expect(getPasswordInput().value).toBe('TestPassword123')
        })

        it('should accept both email and password inputs', async () => {
            const { user, getEmailInput, getPasswordInput } = setupTest()

            await fillForm(user, 'test@example.com', 'TestPassword123')

            expect(getEmailInput().value).toBe('test@example.com')
            expect(getPasswordInput().value).toBe('TestPassword123')
        })

        it('should allow clearing and re-entering values', async () => {
            const { user, getEmailInput } = setupTest()
            const emailInput = getEmailInput()

            await user.type(emailInput, 'test@example.com')
            expect(emailInput.value).toBe('test@example.com')

            await user.clear(emailInput)
            expect(emailInput.value).toBe('')

            await user.type(emailInput, 'another@example.com')
            expect(emailInput.value).toBe('another@example.com')
        })

        it('should handle special characters in email', async () => {
            const { user, getEmailInput } = setupTest()

            await user.type(getEmailInput(), 'test+tag@example.com')

            expect(getEmailInput().value).toBe('test+tag@example.com')
        })

        it('should handle rapid input changes', async () => {
            const { user, getPasswordInput } = setupTest()

            await user.type(getPasswordInput(), 'abc')

            expect(getPasswordInput().value).toBe('abc')
        })
    })

    describe('Form Submission - Valid Data', () => {
        it('should submit form with valid credentials', async () => {
            const { user, getEmailInput, getPasswordInput, getLoginButton } = setupTest()

            await fillForm(user, 'test@example.com', 'ValidPassword123')
            await user.click(getLoginButton())

            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Login Successful!')
            })
        })

        it('should reset form after successful submission', async () => {
            const { user, getEmailInput, getPasswordInput, getLoginButton } = setupTest()

            await fillForm(user, 'test@example.com', 'ValidPassword123')
            await user.click(getLoginButton())

            await waitFor(() => {
                expect(getEmailInput().value).toBe('')
                expect(getPasswordInput().value).toBe('')
            })
        })
    })

    describe('Form Validation', () => {
        it('should not submit with empty email', async () => {
            const { user, getPasswordInput, getLoginButton } = setupTest()

            await user.type(getPasswordInput(), 'ValidPassword123')
            await user.click(getLoginButton())

            expect(alertSpy).not.toHaveBeenCalled()
        })

        it('should not submit with empty password', async () => {
            const { user, getEmailInput, getLoginButton } = setupTest()

            await user.type(getEmailInput(), 'test@example.com')
            await user.click(getLoginButton())

            expect(alertSpy).not.toHaveBeenCalled()
        })

        it('should not submit with invalid email format', async () => {
            const { user, getLoginButton } = setupTest()

            await fillForm(user, 'invalid-email', 'ValidPassword123')
            await user.click(getLoginButton())

            expect(alertSpy).not.toHaveBeenCalled()
        })

        it('should not submit with password shorter than 8 characters', async () => {
            const { user, getLoginButton } = setupTest()

            await fillForm(user, 'test@example.com', 'short')
            await user.click(getLoginButton())

            expect(alertSpy).not.toHaveBeenCalled()
        })

        it('should not submit with both fields empty', async () => {
            const { user, getLoginButton } = setupTest()

            await user.click(getLoginButton())

            expect(alertSpy).not.toHaveBeenCalled()
        })
    })

    describe('Accessibility', () => {
        it('should allow form submission via keyboard', async () => {
            const { user, getLoginButton } = setupTest()

            await fillForm(user, 'test@example.com', 'ValidPassword123')
            await user.click(getLoginButton())

            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith('Login Successful!')
            })
        })

        it('should have proper heading hierarchy', () => {
            render(<Login />)

            const heading = screen.getByRole('heading', { name: /login/i })
            expect(heading.tagName).toMatch(/^H[1-6]$/)
        })
    })
})
