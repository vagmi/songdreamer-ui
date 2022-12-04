import React, { CSSProperties, useState } from 'react'
import './App.css'
import ffs from './images/fake-fat-shady.png'
import mateyHurry from './images/matey-hurry.png'
import robottica from './images/robottica.png'

const artistStyle = (selected: boolean): CSSProperties => ({
  marginRight: "1em",
  border: "8px solid #fff",
  borderColor: selected ? "#caf" : "#fff"
})

const textAreaStyle: CSSProperties = {
  marginTop: "1em",
  width: "100%", 
  height: "200px",
  padding: "8px",
  fontFamily: "sans-serif"
}

const buttonStyle : CSSProperties = {
  padding: "1rem",
  backgroundColor: "#83a",
  border: 0,
  fontWeight: "bold",
  color: "#fff"
}

const ARTISTS = [
  {
    name: "Fake Fat Shady",
    img: ffs,
    value: "eminem"
  },
  {
    name: "Matey Hurry",
    img: mateyHurry,
    value: "katy-perry"
  },
  {
    name: "Robottica",
    img: robottica,
    value: "metallica"
  },
]

const URL = "/api/generate";
const generate = async (artist: string, prompt: string) => {
  const resp = await fetch(URL, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({artist, prompt}),
  })
  return resp.json()
}

function App() {
  const [artist, setArtist] = useState('eminem');
  const [prompt, setPrompt] = useState('hello darkness my old friend\nits time');
  const [opts, setOpts] = useState([]);
  return (
    <div className="App">
      <h1>Song Dreamer</h1>
      {
        ARTISTS.map((a) => <img onClick={() => {setArtist(a.value);}} 
                                key={a.value} src={a.img} width={150} 
                                style={artistStyle(a.value === artist)} />)
      }
      <span>{ARTISTS.filter((a) => a.value===artist)[0].name}</span>
      <div>
        <textarea style={textAreaStyle} value={prompt} onChange={(e) => {setPrompt(e.target.value)}}/>
      </div>
      <button style={buttonStyle} onClick={() => {
        setOpts([]);
        generate(artist, prompt).then((gs)=>{setOpts(gs.options)});
      }}>Generate</button>

      {
        opts.map((opt, i) => <pre className='opt' key={i} onClick={() => {setPrompt(opt)}}>{opt}</pre>)
      }
    </div>
  )
}

export default App
