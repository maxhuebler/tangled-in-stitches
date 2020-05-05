import Head from 'next/head'
import Link from 'next/link'

export default ({ children }) => {
  return (
    <>
      <Head>
        <title>Tangled in Stitches</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <header>
        <nav className="container items-center flex sm:justify-between mx-auto py-16">
          <div className="text-white">
            <Link href="/">
              <a className="font-display font-semibold text-4xl text-gray-800 leading-none">
                Tangled in Stitches
              </a>
            </Link>
          </div>
          <div className="flex justify-end items-center sm:pr-8">
            <div className="text-md sm:ml-4 sm:ml-0">
              <Link href="home">
                <a className="hidden sm:inline text-md">Home</a>
              </Link>
              <Link href="shop">
                <a className="hidden sm:inline text-md ml-4">Shop</a>
              </Link>
              <Link href="about">
                <a className="hidden sm:inline text-md ml-4">About us</a>
              </Link>
              <Link href="contact">
                <a className="hidden sm:inline text-md ml-4">Contact Us</a>
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
