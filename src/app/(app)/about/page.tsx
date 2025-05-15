import React from 'react'
import About from '../components/About'
import Footer from '../components/Footer'
export function generateMetadata() {
    return {
        title: "About Us",
        description: "Learn more about us and our mission",
    }
}
const page = () => {
  return (
    <div>
        <About/>
        <Footer />
    </div>
  )
}

export default page