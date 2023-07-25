import React from "react";
// import memedata from "../memedata";
export default function Meme()
{

    const [meme, setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "https://i.imgflip.com/30b1gx.jpg"
        }
    )
    const [allMemes, setAllMemes] = React.useState([] )
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
function handleUrl()
{
    
    const randomurlno = Math.floor(Math.random() * allMemes.length) //will generate a random number 
    // setMemeImage(urls[randomurlno].url)
    const url = allMemes[randomurlno].url 
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
}

function handleChange(event)
{
    const {name, value} = event.target
   setMeme(prevMeme => ( {
    ...prevMeme,
    [name]: value
   }) )
}
    return (
        <main className="main">
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={handleUrl}
                >
                    Get a new meme image 🖼
                </button>
                <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText} </h2>
                <h2 className="meme--text bottom">{meme.bottomText} </h2>
            </div>
            </div>
        </main>
    )
}