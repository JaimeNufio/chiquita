const { Pool } = require("pg");
const { database } = require('../config.json') ?? require(`${process.env.CONFIG_FILE}`)

class db {

    pool = null

    static async createPool() {
        this.pool = new Pool(database);

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })

        console.log('pool created.')
    }

    static async doQuery(queryString,queryObject) {

        const queryParams = Object.values(queryObject)
        console.log(queryString, queryParams)

        const client = await this.pool.connect()
        try {
          const res = await client.query(queryString, queryParams)
          return res
        } catch (err) {
          console.log(err.stack)
        } finally {
          client.release()
        }
    }
}

module.exports = db