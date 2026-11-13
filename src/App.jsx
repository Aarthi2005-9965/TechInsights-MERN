
import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:5000/api'

function App() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [databaseArticles, setDatabaseArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const sampleArticles = [
    {
      id: 1,
      category: 'Artificial Intelligence',
      title: 'The Future of Artificial Intelligence',
      description: 'Discover how AI is transforming businesses and everyday life.',
      content: 'Artificial Intelligence is transforming businesses, education, healthcare and everyday life.',
      date: 'November 10, 2026',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700'
    },
    {
      id: 2,
      category: 'Web Development',
      title: 'Modern Web Development Trends',
      description: 'Explore the latest tools and technologies for building websites.',
      content: 'Modern web development uses React, JavaScript and many powerful technologies.',
      date: 'November 09, 2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700'
    },
    {
      id: 3,
      category: 'Cyber Security',
      title: 'Protecting Your Digital World',
      description: 'Learn about online security, privacy and data protection.',
      content: 'Cyber security protects computers, networks and data from digital attacks.',
      date: 'November 08, 2026',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700'
    },
    {
      id: 4,
      category: 'Cloud Computing',
      title: 'Understanding Cloud Computing',
      description: 'Learn how cloud platforms store and manage data.',
      content: 'Cloud computing provides computing services over the internet.',
      date: 'November 07, 2026',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700'
    },
    {
      id: 5,
      category: 'Artificial Intelligence',
      title: 'Machine Learning Explained',
      description: 'Understand how machines learn from data.',
      content: 'Machine learning allows computers to learn patterns from data.',
      date: 'November 06, 2026',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700'
    },
    {
      id: 6,
      category: 'Web Development',
      title: 'Getting Started with React',
      description: 'Learn the basics of building interactive React applications.',
      content: 'React is a JavaScript library for building interactive user interfaces.',
      date: 'November 05, 2026',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700'
    }
  ]

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`${API}/blogs`)

        if (!response.ok) {
          throw new Error('Unable to fetch blogs')
        }

        const blogs = await response.json()

        const formattedBlogs = blogs.map((blog) => ({
          id: blog._id,
          category: blog.category,
          title: blog.title,
          description: blog.description,
          content: blog.content,
          date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Recently published',
          image: blog.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700'
        }))

        setDatabaseArticles(formattedBlogs)
        setApiError('')
      } catch (error) {
        setApiError('Unable to connect to the blog server. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const articles = [...databaseArticles, ...sampleArticles]

  const categories = [
    'All',
    'Artificial Intelligence',
    'Web Development',
    'Cyber Security',
    'Cloud Computing',
    ...new Set(databaseArticles.map((article) => article.category))
  ].filter((category, index, array) => array.indexOf(category) === index)

  const filteredArticles = articles.filter((article) => {
    const searchMatch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()) ||
      article.category.toLowerCase().includes(search.toLowerCase())

    const categoryMatch =
      selectedCategory === 'All' ||
      article.category === selectedCategory

    return searchMatch && categoryMatch
  })

  return (
    <div className="website">

      <header className="navbar">
        <h2>TECH<span>INSIGHTS.</span></h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#articles">Articles</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <a href="#articles" className="subscribe">
          Explore
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tag">WELCOME TO TECH INSIGHTS</p>

          <h1>
            Explore the Future
            <br />
            of <span>Technology.</span>
          </h1>

          <p className="hero-description">
            Discover the latest innovations in Artificial Intelligence,
            Web Development, Cyber Security and Technology.
          </p>

          <a href="#articles" className="explore">
            Explore Articles →
          </a>
        </div>
      </section>

      <section className="categories" id="categories">
        <p className="tag">EXPLORE TOPICS</p>
        <h2>Browse Categories</h2>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? 'category-btn active'
                  : 'category-btn'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="articles" id="articles">
        <p className="tag">OUR LATEST CONTENT</p>
        <h2>Featured Articles</h2>

        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search articles by title or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button
            className="clear-btn"
            onClick={() => {
              setSearch('')
              setSelectedCategory('All')
              setSelectedArticle(null)
            }}
          >
            Clear
          </button>
        </div>

        <p className="results-count">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>

        {loading && <p>Loading latest articles...</p>}

        {apiError && <p>{apiError}</p>}

        <div className="article-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div className="article-card" key={article.id}>
                <img src={article.image} alt={article.title} />

                <div className="article-content">
                  <p className="article-category">
                    {article.category}
                  </p>

                  <h3>{article.title}</h3>

                  <p>{article.description}</p>

                  <p className="article-date">{article.date}</p>

                  <a
                    href="#articles"
                    onClick={(event) => {
                      event.preventDefault()
                      setSelectedArticle(
                        selectedArticle?.id === article.id ? null : article
                      )
                    }}
                  >
                    {selectedArticle?.id === article.id
                      ? 'Close Article ↑'
                      : 'Read More →'}
                  </a>

                  {selectedArticle?.id === article.id && (
                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : !loading ? (
            <div className="no-results">
              <h3>No Articles Found!</h3>
              <p>Try another search keyword or category.</p>
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('All')
                }}
              >
                Show All Articles
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="about" id="about">
        <h2>Knowledge Begins With Curiosity.</h2>
        <p>
          Tech Insights is a technology blog platform sharing
          knowledge, ideas and innovations with the world.
        </p>
      </section>

      <footer>
        <h2>TECH INSIGHTS.</h2>
        <p>© 2026 Tech Insights. All Rights Reserved.</p>
      </footer>

    </div>
  )
}

export default App
