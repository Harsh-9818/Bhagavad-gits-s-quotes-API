// api/hello.js
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ ok: true, msg: 'hello from vercel dev' });
};
