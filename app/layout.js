import './globals.css'

export const metadata = {
  title: 'RussMarket Store',
  description: 'RussMarket digital products store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}