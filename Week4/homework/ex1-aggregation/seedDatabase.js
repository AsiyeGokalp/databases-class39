const csv = require("csvtojson")

/**
 * This function will drop and recreate the collection of sample data in our csv file.
 * By doing this we ensure that your functions are working on the same data, very similar to how you would set up a test environment.
 *
 * @param {MongoClient} client - The client that is connected to your database
 */
const seedDatabase = async (client) => {
  const hasCollection = await client
    .db("databaseWeek4")
    .listCollections({ name: "population_of_countries" })
    .hasNext()

  if (hasCollection) {
    const countryPopulationCollection = await client
      .db("databaseWeek4")
      .collection("population_of_countries")

    // Remove all the documents
    await countryPopulationCollection.deleteMany({})

    // Load the cvs
    const data = await csv().fromFile("population_pyramid_1950-2022.csv")

    // Convert data to array version of elements
    const documents = data.map((dataItem) => {
      const { Country, Year, Age, M, F } = dataItem

      return {
        Country: Country,
        Year: Year,
        Age: Age,
        M: parseInt(M),
        F: parseInt(F),
      }
    })

    // Add our documents
    await countryPopulationCollection.insertMany(documents)
  } else {
    throw Error("The collection `population_of_countries` does not exist!")
  }
}

module.exports = {
  seedDatabase,
}
