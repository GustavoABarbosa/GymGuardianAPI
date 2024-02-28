import { randomUUID } from "crypto";
import sql from "./db.js";

export class DatabasePostgress{
  async list(search) { 
    let workouts

    if (search) {
      workouts = await sql`
        SELECT *
        FROM tbWorkout
        WHERE worName ILIKE ${'%' + search + '%'}
        OR EXISTS (SELECT 1 FROM unnest(worGroups) AS grp WHERE grp ILIKE ${'%' + search + '%'})
      `
    } else {
      workouts = await sql`select * from tbWorkout`
    }

    return workouts
  }

  async create(workout) {
    const worUuid = randomUUID()
    const { worName, worGroups, worStartsAt, worFinishesAt, worExercises } = workout

    await sql`
      INSERT INTO tbWorkout 
      (worUuid, worName, worGroups, worStartsAt, worFinishesAt, worExercises) VALUES(${worUuid}, ${worName}, ${worGroups}, ${worStartsAt}, ${worFinishesAt}, ${worExercises})`
  }

  async update(id, workout) {
    const { worName, worGroups, worStartsAt, worFinishesAt, worExercises } = workout

    await sql`
      UPDATE tbWorkout SET worName = ${worName}, worGroups = ${worGroups}, worStartsAt = ${worStartsAt}, worFinishesAt = ${worFinishesAt}, worExercises = ${worExercises} WHERE worUuid = ${id}`

  }
  
  async delete(id) {
    await sql`DELETE FROM tbWorkout WHERE worUuid = ${id}`
  }

}