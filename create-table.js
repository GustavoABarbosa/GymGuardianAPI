import sql from './db.js'

// sql`DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log('apagada')
// })

sql`
  CREATE TABLE tbWorkout (
    worUuid TEXT PRIMARY KEY,
    worName TEXT,
    worGroups TEXT[],
    worStartsAt DATE,
    worFinishesAt DATE,
    worExercises JSONB
  );
`.then(() => {
  console.log('tabela criada!')
})