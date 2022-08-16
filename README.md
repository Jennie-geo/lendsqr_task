<snippet>
  <content><![CDATA[
# ${1:Cash Transaction Project}

TODO: Firstly, This is an application that allowed user to create an account using firstName, lastName, email, and password. At the successful creation of an account, a unique identification will be given to a user. Also, an account number will be assign by default to that particular user, which is unique to a user too.
Secondly, A user authentication is required before the user can access his/her profile. That means that a user will have to login to generate a token that will set at the header before accessing any routes. This is done so that an unauthorized user can't access any profile that does belong to them. There are different endpoints in this project. At a successful login, A user can send money to her account or other user's account. There are some checks that were put in place before a user can send money to another user. I checked if the user's account number truely belongs to the user, is there any money in the account where she is sending money from, is the available balance less than the amount she wants to send. when all this is passed, that is when the user can successfully transfer the money. And when that happended, The amount transferred will be deducted from the sender's balance, and the receiver's balance will be credited with that amount. There are endpoints that also get check single user's account detail and also an endpoint that get all the users details.

## Installation

TODO: This project used Nodejs, express, Knexjs orm, typescript and jest for unit testing. knexjs was install globally to allow the use of knex cli. knex cli was used to create the migration files which contains the two migration files(users schema and account schema). Express, typescript,jest and other packages that the project needs were installed using npm. The mysql database was mock to enable testing of the enpoints. Heroku was use for deployment and the code was pushed to github

### Usage

TODO: Once the code is pull from github to your local machine, the first thing to do is to use the command `npm install` to install all the dependencies that the app needs to run. Then, in the .env.example file is where database connection strings sample were set. Just fill it with your mysql details. run `yarn tsc` to compile the typescript files and then start your server using `npm run dev`. The NODE_ENV is set to "development" in the .env file. Before running your test, it will be change to "test" as i have in the knexfile.ts where our test database configuration was done. A test database will be created in mysql Db and the name will be set as directed in the .env.example file. You can run the test file using `yarn test`

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
