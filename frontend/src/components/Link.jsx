const Link = ({ url, text }) => (
    <a
        className="App-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
    >
        {text}
    </a>
)

export default Link;