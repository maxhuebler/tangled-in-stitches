import Link from 'next/link'

export default ({ children }) => {
  return (
    <>
      <header>
        <nav className="container items-center flex sm:justify-between mx-auto py-16 sm:px-6">
          <div className="text-white">
            <Link href="/">
              <a className="font-display font-semibold text-4xl text-black leading-none">
                Tangled in Stitches
              </a>
            </Link>
          </div>
          <div className="flex justify-end items-center">
            <div className="text-md sm:ml-4 sm:ml-0">
              <Link href="about">
                <a className="hidden sm:inline text-md ml-4 hover:underline">
                  About us
                </a>
              </Link>
              <Link href="contact">
                <a className="hidden sm:inline text-md ml-4 hover:underline">
                  Contact Us
                </a>
              </Link>
              <Link href="cart">
                <button className="ml-4 text-center text-white bg-black justify-center h-8 w-8 rounded-full">
                  0
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
