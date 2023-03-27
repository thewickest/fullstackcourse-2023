const lodash = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = (sum, actual) => {
    return sum + actual.likes
  }

  return blogs.reduce(total, 0)
}

const topLikes = (blogs) => {
  const top = (top, actual) => {
    return top.likes > actual.likes ? top : actual
  }

  const blog = blogs.reduce(top,0)
  delete blog._id
  delete blog.__v
  delete blog.url

  return blog
}

const mostBlogs = (blogs) => {
  const authors = Object.entries(lodash.countBy(blogs, 'author'))
  const mapAuthors = authors.map((blog) => {
    return { author: blog[0], blogs: blog[1] }
  })
  return lodash.maxBy(mapAuthors, (o) => { return o.blogs})  
}

module.exports = {
  dummy,
  totalLikes,
  topLikes,
  mostBlogs
}