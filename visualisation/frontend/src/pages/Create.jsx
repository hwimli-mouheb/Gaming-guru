import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import GameCard from '../components/GameCard'

export default function Create() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };
const transform = (posts) => {
  const result = Object.entries(posts.reduce((acc, curr) => {
    const { game, sentiment, sum } = curr;
    if (!acc[game]) {
      acc[game] = { [sentiment]: sum };
    } else {
      if (!acc[game][sentiment]) {
        acc[game][sentiment] = sum;
      } else {
        acc[game][sentiment] += sum;
      }
    }
    return acc;
  }, {})).map(([name, sentiments]) => ({ name, ...sentiments }));
  return result;
}
  return (
    <Container>
      <div
        style={{display:'flex', gap:'20px', Width: '400px',height:'800px',flexDirection:'row',flexWrap:'wrap'}}
        >
          {transform(posts).map((post,index )=> (
          <div key={post._id} style={{flex:1,backgroundColor:'#fff', borderRadius:'5px',border:'solid 2px #d0d0d0'}}>
            <GameCard game={post}  index={index}/>
          </div>
          ))}
      </div>
    </Container>
  )
}