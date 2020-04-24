# LoanApp-BE
A lending co.

### Prerequisites
1. Node
2. Yarn
3. Postgres
4. Nodemon

### Steps
1. Clone this repo
2. Install all the packages with `yarn install`
3. Create the database, generate a database url in this format -> `postgres://<username>:<password>@localhost:5432/<dbname>`
4. Run `yarn db:migrate`

### Before running yarn start:dev
1. Inside the config folder under `src` folder, there is a missing file named `dev.js`
2. The above file is not committed(contains secret keys for development) but has the same format with the file `prod.js`
3. Then create `dev.js` file and paste all the keys in.
3. Then run `yarn start:dev`
