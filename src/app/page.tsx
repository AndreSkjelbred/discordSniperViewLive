'use client'
import Image from 'next/image'
import { useEffect, useState, ChangeEvent } from 'react'

export default function Home() {
  const [usernames, setUsernames] = useState([])
  const [inputtedUsername, setInputtedUsername] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputtedUsername(event.target.value)
  }

  useEffect(() => {
    fetch('/api/getUsernames')
      .then((res) => res.json())
      .then((data: any) => {
        setUsernames(data.usernames)
      })
  }, [])

  async function addUsername() {
    if (!inputtedUsername) return
    const res = await fetch('/api/addUsername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: inputtedUsername }),
    })

    const data = await res.json()
    setUsernames(data.usernames)
    setInputtedUsername('')
  }
  return (
    <main>
      <h1>Usernames to be sniped</h1>
      <div>
        {usernames &&
          usernames.map((username) => {
            return (
              <div key={username}>
                <p>{username}</p>
              </div>
            )
          })}
      </div>
      <input
        className='input-b'
        type='text'
        value={inputtedUsername}
        onChange={handleInputChange}
        onSubmit={addUsername}
      />
      <button onClick={addUsername}>Save</button>
    </main>
  )
}
