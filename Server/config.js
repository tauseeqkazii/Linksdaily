// This is a connection string to a MongoDB database hosted on MongoDB Atlas. It's commented out in this case.
// const DATABASE = "mongodb+srv://dbuser:dbpassword@your_db_name.pbn7j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// This is a connection string to a MongoDB database running on your local machine.
export const username = encodeURIComponent('tauseeqkazii')
export const password = encodeURIComponent('87654321')
export const DATABASE = `mongodb+srv://${username}:${password}@react-app1.nrrazwo.mongodb.net/your_db_name?retryWrites=true&w=majority&appName=react-app1`

// This is the secret key used to sign JSON Web Tokens (JWTs). It should be a long, random string that is kept secret.
export const JWT_SECRET = 'some_secret_letters_numbers'

// This is the API key for Mailchimp. Replace it with your actual Mailchimp API key.
export const MAILCHIMP_API_KEY = '5e824b00de5fe6d541128a26f0bc08e4-us18'

// This is the server prefix for Mailchimp. Replace it with your actual Mailchimp server prefix.
export const MAILCHIMP_SERVER_PREFIX = 'your_mailchimp_server_prefix'

// This is the email address that your app uses to send emails.
const EMAIL_FROM = 'yourname@gmail.com'
