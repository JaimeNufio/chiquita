const { Pool } = require("pg");
const { database} = require('../config.json');

class db {

    pool = null

    static async createPool() {
        this.pool = new Pool(database);

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    }

    static async doQuery(query,queryParams) {
        const client = await this.pool.connect()
        try {
          const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
          return res
        } catch (err) {
          console.log(err.stack)
        } finally {
          client.release()
        }
    }
}

module.exports = db