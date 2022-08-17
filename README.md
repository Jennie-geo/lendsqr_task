<snippet>
  <content><![CDATA[
# ${1:Cash Transaction Project}

TODO: This application allows users to create an account using firstName, lastName, email, and password. After signup, a unique identifier will be assigned to the user. The user's password will be hash for safety reasons. The user gets an account number for transactions at the point of registration.
User authentication is required before the user can access her profile. That means a user will log in to generate a token that will be set at the header before accessing any routes. It makes unauthorized users not access any profile that does belong to them. There are different endpoints in this project. At a successful login, A user can fund her account or send money to another user's account. Some checks were put in place before a user can send money to another user. I checked if the user's account number truly belongs to the user, if is there any money in the account which she is sending money from, is the available balance less than the amount she wants to send. When all these checks are passed, that is when the user can successfully transfer the money. And when that happens, The amount transferred will be deducted from the sender's balance, and the receiver's balance will be credited with that amount. Some endpoints check a single user's account details and gets all the users' details.

## Installation

This project used Nodejs, express, Knexjs Orm, typescript, and jest for unit testing. Knexjs was installed globally to allow the use of Knex-Cli. Knex-Cli was used to create the migration files which contain the two migration files(users schema and account schema). Express, typescript, jest, and other packages that the project needs were installed using npm. The MySQL database was mocked to enable testing of the endpoints. The app was deployed on Heroku, and the code pushed to GitHub.

### Usage

TODO: Once the code is pulled from GitHub to your local machine, the first thing to do is to use the command `npm install` to install all the dependencies that the app needs to run. Then, the .env.example file is where the database connection strings sample was set. Just create a .env file and fill it with your MySQL details, using the .env.example file. run `yarn tsc` to compile the typescript files and then start your server using `npm run dev`. The NODE_ENV is set to "development" in the .env file. Before running your test, it will be changed to "test" as I have in the knexfile.ts where our test database configuration was done. A test database will be created in MySQL Db and the name will be set as directed in the .env.example file. You can run the test file using `yarn test`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

TODO: Isintume Jennifer

## License

TODO: This is just simple CRUD operation that allow dummy money for test purpose.

]]></content>
<tabTrigger>readme</tabTrigger>
</snippet>
