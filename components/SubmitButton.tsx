'use client'

// import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

const SubmitButton = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      {...btnProps}
      type="submit"
      className={`w-[50%] text-white font-semibold self-center`}
    >
      {label}
    </Button>
  )
}

export default SubmitButton
