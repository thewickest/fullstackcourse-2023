const reverse = require('../utils/for-testing').reverse

test('Reverse of a', () => {
  const result = reverse('a')
  expect(result).toBe('a')
})

test('Reverse of react', () => {
  const result = reverse('react')
  expect(result).toBe('tcaer')
})

test('Reverse of releveler', () => {
  const result = reverse('releveler')
  expect(result).toBe('releveler')
})