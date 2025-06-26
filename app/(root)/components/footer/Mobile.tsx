import Link from 'next/link'
import React from 'react'

const Mobile = () => {
  return (
    <div className="md:hidden px-2 py-2 flex justify-center items-center">
      <div>
        <Link href="https://github.com/amouromar">
          <h1 className="text-xs font-bold text-gray-500 underline-offset-2 underline">made by amour</h1>
        </Link>
      </div>
    </div>
  )
}

export default Mobile