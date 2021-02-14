export const mockResponse = 'Nextjs mock!'

const next = () => ({
  prepare: jest.fn(() => Promise.resolve()),
  render: jest.fn((req, res) => res.send(mockResponse)),
  getRequestHandler: jest.fn(() => (req, res) => res.send(mockResponse))
})

export default next
