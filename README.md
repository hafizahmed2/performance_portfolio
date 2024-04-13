# Portfolio

The application allows users to record video selfies to monitor their progress while learning new languages.

## Set up

### Dependencies

Before running this project locally, please ensure that you have the following dependencies installed:

- Ruby version: 2.5.8,
- Yarn version: 1.22.10+
- PostgreSQL version: 14.10+
- ffmpeg version v3.4+ (for thumbnail processing).

### Installation

1. Clone this repository and navigate into its directory:
   `cd performance-portfolio`
2. Check your Ruby version by running `ruby --version` in your terminal. You should see `ruby 2.5.8`. If not, install the correct version.
3. Install all required gems
   `bundle install`

- Create and initialize database
  ```
    rake db:create
    rake db:migrate
  ```
- Start the Rails server:
  `rails s`

### Troubleshoot

- On starting rails server if you get a error message for `Scss variables missing` please reload your page a few times, maybe it's just in my local env but I didn't spent much time to fix it

## If I had more time

- I would work on improving screen recording feature cause rn its' not working as it should, I was thinking about a picture-in-picture mode, similar to what is commonly found in online lectures and webinars etc...

- I would make the JavaScript code better by moving related parts of the code into their own sections. Also, I'd spend some extra time handling the CSRF token when form submission.

- I would also work on troubleshooting the `ActiveStorage::Analyzer::VideoAnalyzer` because it was not adding the `duration` attribute to the `metadata` of video files as expected.

- Mobile layout needs more work also.
