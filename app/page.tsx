import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <p className='text-3xl text-indigo-400'>Hello discord
      <span className='text-2xl text-indigo-200'>
        - Clone
      </span>
      <Button variant='ghost' >Click Me!</Button>
    </p>
  )
}
