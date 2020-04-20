const useAudio = () => {
  const audio = document.getElementById('timerAudio')

  function play() {
    if (audio.paused) {
      audio.play()
      setInterval(() => {
        stop()
      }, 4000)
    }
  }

  function stop() {
    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  return { play, stop }
}

export { useAudio }
