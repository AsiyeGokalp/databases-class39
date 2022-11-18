const { MongoClient, ServerApiVersion } = require("mongodb")

const { seedDatabase } = require("./seedDatabase.js")

const dotenv = require("dotenv")

dotenv.config()

const uri = process.env.MONGODB_URL

const client = new MongoClient(uri)

// const collection = client
//   .db("databaseWeek4")
//   .collection("population_of_countries")

async function getCountryPopulationByYear(client, country, collection) {
  const population = await collection.aggregate([
    // First Stage
    {
      $match: { Country: country },
    },
    // Second Stage
    {
      $group: {
        " _id": "$Year",
        countPopulation: { $sum: { $sum: ["$F", "$M"] } },
      },
    },
  ])
  console.log(population)
  return population
}

async function getTotalPopulationOverHundred(client, year, age, collection) {
  const populationOverHundred = await collection.aggregate([
    {
      $match: {
        Year: year,
        Age: age,
        Country: {
          $in: [
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
            "AFRICA",
          ],
        },
      },
    },
    { $set: { TotalPopulation: { $sum: ["$F", "$M"] } } },
  ])
  console.log(populationOverHundred)
  return populationOverHundred
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    )
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })

  const collection = client
    .db("databaseWeek4")
    .collection("population_of_countries")

  try {
    await client.connect()

    // Seed our database
    await seedDatabase(client)

    await getCountryPopulationByYear(client, "Nederlands", collection)
    await getTotalPopulationOverHundred(client, 2022, "100+", collection)
  } catch (err) {
    console.error(err)
  } finally {
    // Always close the connection at the end
    client.close()
  }
}

main()
