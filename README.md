# FzSports Test
<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project consists in simple API Server that allows to request Team and Players information obtained from a no relational database, imported from a xml source gived by FzSports. Also, contains the deployment of a VPC infrastructure, 4 subnets, ALB and a Listener Frontend using Terraform with AWS provider, Dockers and Jenkins technologies as services.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section list frameworks/libraries used in the project.

* [Git](https://git-scm.com/)
* [NPM](https://www.npmjs.com/)
* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [Jenkins](https://www.jenkins.io/)
* [Terraform](https://www.terraform.io/)
* [MongoDB](https://www.mongodb.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites
For continue, make sure Docker is installed already.
In order to install the project, its necesary a MongoDB Server. Let's pull an image and run it locally using Docker.
* MongoDB
  ```sh
  docker pull mongodb
  ```
  ```sh
  docker run mongodb
  ```

### Installation
For continue, make sure Git, Npm are installed already.
1. Clone the repository
   ```sh
   git clone https://github.com/fquevedo/fzsportsApi.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in root folder
   ```.env
    DB_URI=mongodb://localhost:27017
    DB_NAME=fzsports
   ```
4. Ingest database
   ```sh
   npm run build
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Start service
   ```sh
   npm start
   ```
Use the following links for test the endpoints

Get all teams [/api/team](https://localhost:3000/api/team)
Get players who play in :teamId [/api/team](https://localhost:3000/api/team)
Get players who play in :position [/api/team](https://localhost:3000/api/team)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Project Link: [https://github.com/fquevedo/fzsportsApi](https://github.com/fquevedo/fzsportsApi)

<p align="right">(<a href="#top">back to top</a>)</p>



