# Health App Frontend Description
Proof of concept for Super Health Inc. This application helps manage patients and their related encounters.

## Usage
* Run `npm install` in root folder to install dependencies.
* Run `npm start` and navigate to `localhost:3000` to view application.
* Run `npm test` to start the testing suite.
* Run `npm run coverage` to perform tests with coverage.



## Running ES Lint

1. Install the correction versions of the eslint-config-airbnb with the following command
        npm info "eslint-config-airbnb@latest" peerDependencies

2. Install dependencies (and peer dependencies)
            npm install eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^5.0.0 \
            @typescript-eslint/parser@^5.0.0 \
            --save-dev

3. Configure ESLint within your ESLint config file
**In this project, it's already currently configured in .eslintrc**

4. To run ESLint, open a terminal to the root of your project and run the following command:
        npx eslint . --ext .js,.jsx,.ts,.tsx    

**refer to https://www.npmjs.com/package/eslint-config-airbnb-typescript for FAQ**


