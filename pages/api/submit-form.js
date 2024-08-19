export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process the form data and payment information
    console.log('Form data received:', req.body);
    // Here you would typically save the data to a database
    res.status(200).json({ message: 'Form submitted and payment processed successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}