import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  // Array of Japan-themed GIF URLs
  const gifs = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTU5bTk2NjgxN2xhZnViZGxrOWo2cTludTBwNzFyN3p4bWJvZ2gxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yGEbmgiCJYu3u/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnB4Y24zbndodno1NWw4cDY3b3R5MTJlZjl6bG92NGljM2tvYm9uZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13VAQJjntEqA8M/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGEzOTZ5MWZvMmd6ZzU3cjE3bm8xZ2h0dDZmcW0xZnp5ejhldjJpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2QHLYZFJgjsFq/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDJkZnc0Y3Rja2Y3YWgyeGM3aTQ2M2djZGJndGMxcnFlbGdvbGczZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4EoZ1rJtDfypcna8/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWs3ajB0bmZucGYzcjczbW50cmhwNXF0N2YzeG9obmp0a21mNXVhaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YmZOBDYBcmWK4/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzhyZ3YwMmIyY2NvZDc0Z3E4aDc3OXpmaGNlYjh4ZDNjYjNra2QyayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/C3brYLms1bhv2/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzNzcDRiNTkyc2dub3YzN3l6cmJudXpuNWw0aWVsMG8wY2N2MTZuMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/42C7eGLHbijtK/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndxbzFqMW5ib3c1a2x0MXNyeGU5MG1ucmRpeHkxb2VzNTMxZmlhYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5TVrIZAexcog88a7MH/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXZmcmtvbDNidXJidXFxYjZhZTVhZG1hdXdob255MjI2Z2djdXRvcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q5cEmoRKlOSVq/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG9teG40bDhkcHV3bzl5YmpjOTZkMGF6aWxiaHFuZTBjNzNxaTFhMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwh1Nme90Zf0B6E/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTh4NWpkMzA1ZXMxaDkyaG96NWVwMmxia3k4dmxjb3BxYzdwNDM1ZSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/OUAHabK7Ey1eMqRdsW/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm9kM2JrcDhseGY1NTljeTRnZDJ5NnA3NnlkNDlnNTF1bHNuOHd4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7zldVbcaKTnSE/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWdpc2V0MXAxZmltOXZyejEzdzVyMG95ZWVseW10MW1uYzU4cGllZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n7dghIPDEXeSI/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2w1dm5qdjZ5cGt5MWk5b2NrbjFxZm9yc2N4MHlxeXZ3NXAxYWczbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yIxNOXEMpqkqA/giphy.gif",
    "https://tenor.com/en-GB/view/brooke-one-piece-brooke-spin-brooke-one-piece-brooke-joy-gif-16617681466576271090",
  ];

  useEffect(() => {
    const targetDate = new Date("2025-11-01T08:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cycle through GIFs every 5 seconds
  useEffect(() => {
    const gifInterval = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000); // Change GIF every 5 seconds

    return () => clearInterval(gifInterval);
  }, [gifs.length]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${gifs[currentGifIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
  );
}

export default App;
