// Next Imports
import Link from 'next/link'

// Component Imports
import Logo from '@/components/shared/Logo'
import LoginForm from '@/views/pages/auth/login/login-form'
import ProductPreview from './sections/product-preview'

/** Split-screen sign-in: form on one side, a live-looking product preview on the other (stacks on mobile). */
const LoginV2 = () => (
  <div className='grid min-h-svh lg:grid-cols-2'>
    <div className='flex flex-col gap-10 px-6 py-10 sm:px-10'>
      <Link href='/' className='self-start'>
        <Logo />
      </Link>

      <div className='mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>
          <p className='text-muted-foreground text-sm'>
            Enter your email and password to sign in. Don&apos;t have an account?{' '}
            <Link href='/pages/auth/register' className='text-foreground underline underline-offset-4'>
              Sign up
            </Link>
          </p>
        </div>

        <LoginForm />

        <p className='text-muted-foreground text-center text-sm text-balance'>
          By signing in, you agree to our{' '}
          <Link href='#' className='hover:text-foreground underline underline-offset-4'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href='#' className='hover:text-foreground underline underline-offset-4'>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>

    <div className='bg-muted relative hidden items-center justify-center overflow-hidden p-10 lg:flex'>
      <ProductPreview />
    </div>
  </div>
)

export default LoginV2
