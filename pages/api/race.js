import db from "../../database";

export default async function handle(req, res) {
  const { id } = req.query;

  try {
    let { rows: race } = await db.query(`SELECT * FROM races WHERE races.id = '${id}';`);
    const { rows: results } = await db.query(
      `SELECT 
        riders.name,
        riders.nationality,
        results.position,
        results.cap,
        results.class,
        results.days,
        results.hours,
        results.minutes,
        results.result,
        results.bike,
        results.category,
        results.finishlocation,
        results.finishdistance,
        results.notes
      FROM
        results,
        riders,
        races
      WHERE
        riders.id = results.riderid
      AND
        races.id = results.raceid
      AND
        races.id = $1 
      ORDER BY
        results.position;
      `, [id]
    );

    race = race.map((r) => ({ ...r, description: decodeURIComponent(r.description) }));

    res.json({ race, results });
  } catch (error) {
    res.json({ error });
  }
}
