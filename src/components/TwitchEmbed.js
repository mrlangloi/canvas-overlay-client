function TwitchEmbed() {
  return (
    <div id="twitch-embed" style={{ zIndex: -1, }}>
      <iframe src="https://player.twitch.tv/?channel=dearbun&parent=localhost" 
        frameborder="1" 
        allowfullscreen="false" 
        height="720" 
        width="1280"
      />
    </div>
  )
}

export default TwitchEmbed;