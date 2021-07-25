import './App.css';
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Posts } from './components/Posts';
import Pagination from './components/Pagination';


function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  console.log(posts)
  //get current post
  const indexOfLastPost = currentPage * postPerPage; //10
  const indexOfFirstPost = indexOfLastPost - postPerPage; //0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  //paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <div class="jumbotron">
        <h1 className="text-primary font-weight-bold">Pagination</h1>
        <p>Using reactjs and bootstrap...</p>

      </div>
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
      <Posts posts={currentPosts} loading={loading} />
     

    </div>
  )
}

export default App

