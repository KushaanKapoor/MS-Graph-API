
# How to run the completed project

## Prerequisites

To run the completed project in this folder, you need the following:

- [Node.js](https://nodejs.org) installed on your development machine. 
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

## Register a web application with the Azure Active Directory admin center

1. Open a browser and navigate to the [Azure Active Directory admin center](https://aad.portal.azure.com). Login using a **personal account** (aka: Microsoft Account) or **Work or School Account**.

1. Select **Azure Active Directory** in the left-hand navigation, then select **App registrations** under **Manage**.

    ![A screenshot of the App registrations ](/README/Images/aad-portal-app-registrations.png)

   
1. Select **New registration**. On the **Register an application** page, set the values as follows.

    - Set **Name** to `Your Project Name`. Here it is `MS-Graph-API`.
    - Set **Supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**.
    - Under **Redirect URI**, set the first drop-down to `Single-page application (SPA)` and set the value to `http://localhost:3000`.

    ![A screenshot of the Register an application page](/README/Images/aad-register-an-app.png)

1. Choose **Register**. On the **MS-Graph-API** page, copy the value of the **Application (client) ID** and save it, you will need it in the next step.

    ![A screenshot of the application ID of the new app registration](/README/Images/aad-application-id.png)


1. Goto **Authentication** and grant Access Tokens access.

    ![A screenshot of the implicit access](/README/Images/aad-implicit-grant.png)

## Configure the project

1. Edit the `./MS-Graph-API/.env` file and make the following changes.
    1. Replace `YOUR_APP_ID_HERE` with the **Application Id** you got from the App Registration Portal.
2. In your command-line interface (CLI), navigate to the `MS-Graph-API` directory and run the following command to install requirements.

    ```Shell
    yarn install
    ```

## Run the project

1. Run the following command in your CLI to start the application.

    ```Shell
    yarn start
    ```

1. Open a browser and browse to `http://localhost:3000'


# App Screenshots

1. Landing Page

![A screenshot of the Landing Page](/README/Screenshots/landing-page.PNG)

2. Logged In

![A screenshot of the Landing Page after Logging In](/README/Screenshots/login.PNG)

3. Email Search Dashboard

![A screenshot of the User Email Search Dashboard](/README/Screenshots/Dashboard-search.PNG)

