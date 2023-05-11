import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'

export default function Notes() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {posts.filter(post => post.post.length > 20).sort((a,b)=>a.createdAt < b.createdAt).map((post,index )=> (
          <div key={post._id}>
            <NoteCard note={post}  index={index}/>
            
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
