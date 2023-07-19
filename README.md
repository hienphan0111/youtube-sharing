<a name="readme-top"></a>

<div align="center">

  <img src="./ys-logo-nobg.png" alt="logo" width="140"  height="auto" />
  <br/>

  <h3><b>Youtube sharing app</b></h3>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Features](#features)
  - [🛠 Built With](#built-with)
  - [🛠 Kanban board](#kanban-board)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#🔭-future-features)
- [🤝 Contributing](#🤝-contributing)
- [🙏 Acknowledgments](#🙏-acknowledgments)
- [📝 License](#📝-license)


<!-- PROJECT DESCRIPTION -->

# 📖 Mentor app <a name="about-project"></a>

This App allow users share their favorite youtube video.

## 🔭 Features <a name="features"></a>
- [ ] **Sign in && Sigup**
- [ ] **Notification**
- [ ] **Sharing video**
- [ ] **Display video shared**
- [ ] **Detele video shared**

## 🛠 Built With <a name="built-with"></a>

* [![React][React.js]][React-url]
* [![Redux][redux.js]][Redux-url]
* [![TailwindCSS][TailwindCSS][tailwind-url]]

## 🛠 Kanban board <a name="kanban-board"></a>

For management this project, I setup kanban board in which I splited project into a bundle of tasks. [Click here]() to overview this kanban board.
- Screen shots of Kanban board:
  - Init project:
  <div align="center">
    <img src="" alt="logo" width="auto"  height="250" />
  <div>
  <br />
  - Final status:
  <div align="center">
    <img src="" alt="logo" width="auto"  height="250" />
  <div>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>
To see the demo version, you can [Clik here](https://youtube-sharing-l4x6.onrender.com/)
- Want to try admin features, use below account:


<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

- IDE(code editor) like: **Vscode**, **Sublime**, etc. 
- [Git](https://www.linode.com/docs/guides/how-to-install-git-on-linux-mac-and-windows/)

### Setup

1. Download the **Zip** file or clone the repo with:
```bash
git clone https://github.com/hienphan/youtube-sharing.git
```
3. To access cloned directory run:
```bash
cd youtube-sharing
```

### Install

4. Access front end
> To install linters and other project's dependencies run:
```bash
npm install
```

- run command 
```bash
cd client
```

- Setup .env file:
  - Create an .env file and put it in client folder and your back-end url variable here.

```bash
VITE_API_URL=<API_URL>
```

To run the front, execute the following command:

```bash
npm dev
```

5. Access back end
> To install linters and other project's dependencies run:
```bash
yarn install
```

- run command 
```bash
cd back-end
```

- Setup .env file:
  - Create an .env file and put it in client folder and your data base url and secret key variable here.

```bash
MONGO_URLL=<DATABASE_URL>
JWT_SECRET=<SECRET_JSON_TOKEN>
```

To run the api, execute the following command:

```bash
yarn start
```

<!-- 
- Run
```bash
bundle install
```

- Run command below to create client_id and secret on your local database
```bash
rails console
```
- Then create an OAuth application using this command :
```bash
oauth = Doorkeeper::Application.create(name: "Web client", redirect_uri: "", scopes: "")
```
- You can change the name to any name you want, and leave redirect_uri and scopes blank.

- Then run below command to get client_id
```bash
oauth.uid
```

- Get client_secret by below command
```bash
oauth.secret
```

- Finnaly, create .env file in the root folder with content:
```bash
VITE_CLIENT_ID=client_id
VITE_CLIENT_SECRET=client_secret
```
replace client_id and client_secret with info that you got above

- To use admin features, you can create an account on front end then run `rails console`
- Find the user that you just created and set isAdmin to true, example:
```bash
user = User.find_by(email: "email@email.com")
user.isAdmin = true
user.save
```
- Comeback your front end and login again
- The Admin features should appear on your side bar.

### Usage

-->

<!--
Example command:

```sh
  rails server
```
--->

### Run tests

To run tests, run the following command:


navigate to client folder:

```sh
  npm run test
```
-

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Hien Phan**
- GitHub: [@hienphan0111](https://github.com/hienphan0111)
- Twitter: [@hienphan0111](https://twitter.com/twitterhandle)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/hien-phan-61097b256/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **Admin Dashboard**


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

<!-- FAQ (optional) -->

## 📝 License <a name="license"></a>

This project is contributed under [GNU 3.0](./LICENSE.md) and [Creative commons](https://creativecommons.org/licenses/by-nc/4.0/) licensed


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/-Redux-20232A?style=for-the-badge&logo=redux&logoColor=violet
[Redux-url]: http://redux.js.org
[TailwindCSS]: https://img.shields.io/badge/-TailwindCSS-20232A?style=for-the-badge&logo=tailwind&logoColor=61DAFB
[Tailwind-url]: http://tailwind.org
