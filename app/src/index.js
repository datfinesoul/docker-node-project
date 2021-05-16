(async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const NUMBER_OF_WORKERS = 3
  const data = 'Falsches Üben von Xylophonmusik quält jeden größeren Zwerg'

  const workers = new Array(NUMBER_OF_WORKERS).fill(Array.from(data).entries())
    .map(async iterator => {
      for (const [index, item] of iterator) {
        try {
          await sleep(200)
          if ([5, 10, 17].includes(index)) {
            throw new Error(`Error at ${index}: ${item}`)
          }
          console.log(`itemnum='${index}' item='${item}'`)
        } catch (error) {
          console.error(error)
        }
      }
    })
  await Promise.allSettled(workers)
})()
