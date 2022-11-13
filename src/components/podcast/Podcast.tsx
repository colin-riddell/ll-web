
const Podcast = () => {
  return (
    <div className="flex lg:my-25 lg:h-96 sm:py-2 bg-tccblack  justify-center items-center">
      <iframe
        loading="lazy"
        src="https://open.spotify.com/embed/show/7BkIsKOw8vhFOmD4ZKXwES"
        width="50%"
        height="232"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Podcast;