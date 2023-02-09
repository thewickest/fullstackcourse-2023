const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = (sum, actual) => {
    return sum + actual.likes
  }

  return blogs.reduce(total, 0)
}

module.exports = {
  dummy,
  totalLikes
}