import { useState, useEffect } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Outlet } from 'react-router-dom'
import axios from '../../axios-instance'

export function Root () {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/')
        const { user, posts } = response.data

        setUser(user)
        setPosts(posts)
        setError('')
      } catch (error) {
        console.error(error)
        setError('Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <>
      <Header user={user} />
      <main className='container my-5 py-3'>
        {error && (
          <div className='text-center mx-auto' style={{ maxWidth: '420px' }}>
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          </div>
        )}

        {loading && (
          <div className='text-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}
        <Outlet context={[user, posts]} />
      </main>
      <Footer />
    </>
  )
}
