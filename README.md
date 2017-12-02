# Sentimentalytics
[![Build Status](https://travis-ci.org/ryanchangyeolshin/Sentimentalytics.svg?branch=issue-11)](https://travis-ci.org/ryanchangyeolshin/Sentimentalytics)
[![npm](https://img.shields.io/badge/coverage-97%25-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/devDependencies-up%20to%20date-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/license-MIT-yellow.svg)]()

A web application for statisticians who want to see a sentiment analysis on certain words or phrases.

![image](https://user-images.githubusercontent.com/16450416/33514419-89ea5518-d708-11e7-9b87-554cba69fdad.png)

## How to use
### Option 1: Heroku
https://sentimentalytics.herokuapp.com/

### Option 2: Download Repo
1. Go to the project homepage at: https://github.com/ryanchangyeolshin/Sentimentalytics
2. Click the green "Clone or download" button > Download Zip
3. If you do not have npm installed, see link above for more details. Once you have npm installed, while in in your terminal, open the root directory for the project: /Sentimentalytics. (from step #2)
4. In your terminal, run the command npm install while inside the root directory to install the pertinent npm packages for the project. These will appear under node_modules in the root directory upon completion. For a full list of the downloaded packages, please review the dependencies included in the package.json file.
5. Sign up for an API key at https://developer.aylien.com/
6. Create ```.env``` file and give the following environment variables:
   - AYLIEN_KEY
   - AYLIEN_ID
   - PORT
   - MONGODB_URI
7. Open your browser of choice, and enter the url (localhost: + PORT) for the open port. (eg. "localhost:3000")
