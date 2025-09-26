import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-11-01T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <h1>Days until our JAPAN TRIP 🇯🇵</h1>
      <div className="countdown-container">
        <div className="time-unit">
          <span className="number">{timeLeft.days}</span>
          <span className="label">Days</span>
        </div>
        <div className="time-unit">
          <span className="number">{timeLeft.hours}</span>
          <span className="label">Hours</span>
        </div>
        <div className="time-unit">
          <span className="number">{timeLeft.minutes}</span>
          <span className="label">Minutes</span>
        </div>
        <div className="time-unit">
          <span className="number">{timeLeft.seconds}</span>
          <span className="label">Seconds</span>
        </div>
      </div>
      <p className="target-date">Nov 1st 2025</p>
    </div>
  )
}

export default App
