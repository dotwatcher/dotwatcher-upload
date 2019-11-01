import slugify from 'slugify'

const db = require('../../database')

function formatDate(dateString) {
  const dateTime = new Date(dateString)
  return dateTime.toISOString()
}

export default async function handle(req, res) {
  const formData = JSON.parse(req.body)
  const slug = slugify(`${formData.name} ${formData.year}`, { lower: true })
  const values = [
    formData.name,
    slug,
    parseInt(formData.year, 10),
    formatDate(formData['start-date']),
    formatDate(formData['end-date']),
    formData['start-location'],
    formData['end-location'],
    formData.length,
    formData.terrain,
    formData.description
  ]

  try {
    const result = await db.query(`INSERT INTO races(name, slug, year, startDate, endDate, startLocation, finishLocation, length, terrain, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, values)
    return res.json({ status: 200, result })
  } catch (error) {
    return res.json({ status: 500,  title: 'something was bad with your inputs', error })
  }
  // return res.json(values)
}

// CREATE TABLE races(
//   name varchar(80),
//   slug varchar(80),
//   year int,
//   description text,
//   startDate date,
//   endDate date,
//   startLocation varchar(80),
//   finishLocation varchar(80),
//   length varchar(80),
//   terrain: varchar(80)
// );
