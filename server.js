import { fastify } from 'fastify'
import { DatabasePostgress } from './database-postgress.js'
// import { DatabaseMemory } from './database-memory.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgress

server.post('/workouts', async (request, reply) => {
  const { worName, worGroups, worStartsAt, worFinishesAt, worExercises } = request.body

  await database.create({
    worName,
    worGroups,
    worStartsAt,
    worFinishesAt,
    worExercises
  })
  return reply.status(201).send()
})


server.get('/workouts', async (request) => {
  const search = request.query.search

  const workouts = await database.list(search)

  return workouts
})


server.put('/workouts/:id', async (request, reply) => {
  const worUuid = request.params.id
  const { worName, worGroups, worStartsAt, worFinishesAt, worExercises }  = request.body

  await database.update(worUuid, {
    worName,
    worGroups,
    worStartsAt,
    worFinishesAt,
    worExercises
  })
  return reply.status(204).send()
})


server.delete('/workouts/:id', async (request, reply) => {
  const worUuid = request.params.id

  await database.delete(worUuid)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})