'use client'

// import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus()

  return (
    <button {...btnProps} isLoading={pending} type="submit">
      {label}
    </button>
  )
}

export default SubmitButton
