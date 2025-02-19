'use client'
import { signinUser } from '@/actions/auth'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useActionState } from 'react'
import SubmitButton from './SubmitButton'
const initState = { message: null }
const SigninForm = () => {
  const [formState, action] = useActionState<{ message: string | null }>(
    signinUser,
    initState
  )
  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input required placeholder="Email" name="email" type="email" />
      <Input name="password" required type="password" placeholder="Password" />
      <SubmitButton label={'Sign In'} className="my-6" />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
    </form>
  )
}

export default SigninForm
