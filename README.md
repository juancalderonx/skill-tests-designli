# Skill Test - Designli

¡Hi! I'm Juan, and if you are seeing this repository, it's because you are part of the Designli team. I have developed two technical tests for the **_Backend Developer with NodeJS_** position.

In this repository, you will find the solution for the "The Real Challenge" test, which is a more advanced and challenging task. [If you are looking for the solution to the "Easy-One" test, you can find it here](https://github.com/juancalderonx/easy-one-designli).

## The Real Challenge Project

### Overview

This project is the solution to the "The Real Challenge" test provided by Designli. The task involves creating a NEST.js project, utilizing the `mail-parser` library to parse the content of an email with attachments, and creating a controller with an endpoint that receives the URL or path of an email file as a parameter. The response should be the JSON attached in the email under various scenarios.

### Development Steps

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/juancalderonx/skill-tests-designli
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd skill-tests-designli
   ```

3. **Install Dependencies:**

   ```bash
   yarn install
   ```

4. **Run the Project:**

   ```bash
   yarn start:dev
   ```

   The project will be running at [http://localhost:3000](http://localhost:3000).

5. **Access Swagger Documentation:**
   Open your web browser and go to [http://localhost:3000/api](http://localhost:3000/api) to explore the Swagger API documentation.

### Sample Emails

In the `src/sample-mails/` folder, you will find three sample `.eml` files that represent different scenarios:

1. **eml-with-json.eml:**
   This file contains an email with an attached JSON. The API response will include the parsed JSON.

2. **eml-with-text-json.eml:**
   This file contains an email with a link to a JSON within the body. The API will follow the link and return the parsed JSON.

3. **eml-without-json.eml:**
   This file represents an email without any attached JSON. In this case, the API will return the parsed email itself.

### API Documentation

The API is documented using Swagger, providing an interactive and user-friendly interface to understand and test the available endpoints. Here are the key details:

**Swagger Documentation URL:** [http://localhost:3000/api](http://localhost:3000/api)

### Additional Notes

Please note that "The Real Challenge" involves parsing emails with attachments, and the response varies based on different scenarios outlined in the task description. This includes handling attachments, links within the body of the email, and more complex scenarios.
