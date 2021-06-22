const sleep = t => new Promise(rs => setTimeout(rs, t))

/*
 * Random Number Generator
 */
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min)
};

/*
 * Concurrency control method
 */
const doWork = async ({ numWorkers = 1, assignments, plan }) => {
  // loads assignments into an iterable
  const workload = Array.from(assignments).entries()
  // - create an array with sized based on the number of available workers
  // - each array element has the same iterator with the workload iterator
  const results = new Array(assignments.length)
  const work = Array(numWorkers).fill(workload).map(async (tasks, worker) => {
    for (const [index, task] of tasks) {
      results[index] = await plan(task, worker, index)
    }
  })
  await Promise.all(work)
  return results
}

/*
 * Method applied to workload
 */
const sleepAndLog = async (task, worker, index) => {
  const now = new Date()
  // wait 50 - 500 milliseconds
  await sleep(getRandomIntInclusive(1, 10) * 50)
  // if ([5, 10, 17].includes(index)) {
  //  throw new Error('test');
  // }
  console.log(`worker='${worker}' itemnum='${index}' item='${task}' duration='${(new Date()) - now}'`)
  return task
}

/*
 * Main
 */
(async () => {
  // const data = 'Falsches Üben von Xylophonmusik quält jeden größeren Zwerg';
  const data = 'Falsches'
  const result = await doWork({
    numWorkers: 3,
    assignments: data,
    plan: sleepAndLog
  })
  console.log(result)
})()
