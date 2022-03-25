# FzSports Test
<div id="top"></div>


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
    <li><a href="#deploy-infrastructure">Deploy Infrastructure</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>




## About The Project

This project is a simple API Server that allows to request Team and Players information obtained from a no relational database, imported from a xml source gived by FzSports. Also, contains the services (IaaS Folder) to deploy a VPC infrastructure with 4 subnets (2 public and 2 private), a Security Group and an ALB Listener Frontend using Terraform with AWS as provider. Docker and Jenkins files are implemented in IaaS Folder.

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




## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites
In order to install the project, make sure Docker is installed. 
Let's pull a MongoDB image and run it locally using Docker.
* MongoDB
  ```sh
  docker pull mongodb
  ```
  ```sh
  docker run --name local_mongo -p 27017:27017 -d mongo
  ```
Aditionally, pull and run jenkins locally
* Jenkins
  ```sh
  docker pull jenkins
  ```
  ```sh
  docker run -p 8080:8080 -p 50000:50000 jenkins
  ```


### Installation
For continue, make sure GIT and NPM are installed already.
1. Clone the repository
   ```sh
   git clone https://github.com/fquevedo/fzsportsApi.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in root folder project with the following variables
   ```.env
    DB_URI=mongodb://localhost:27017
    DB_NAME=fzsports
   ```
4. Use this command for ingest database
   ```sh
   npm run build
   ```
5. In order to use Jenkins for docker auto image creation, ensure docker is login locally. Then, create a pipeline and setup using this repository. That allows Jenkins automatically create an image and upload it to dockerhub if all unit test are passed.


<p align="right">(<a href="#top">back to top</a>)</p>



## Usage

1. Start service
   ```sh
   npm start
   ```
Use the following links for test the endpoints

1. Get all teams [/api/team](https://localhost:3000/api/team)
2. Get players who play in :teamId [/api/teams/:teamId/players](https://localhost:3000/api/teams/143/players)
3. Get players who play as :position [/api/teams/players/delantero](https://localhost:3000/api/teams/players/delantero)

<p align="right">(<a href="#top">back to top</a>)</p>


## Deploy Infrastructure

Ensure that AWS CLI is installed, and properly configured with an AWS IAM profile.
1. Locate in terraform-aws folder
   ```sh
   cd IaaS/terraform-aws
   ```
2. Deploy the infrastructure
   ```sh
   terraform apply --auto-approve
   ```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

Project Link: [https://github.com/fquevedo/fzsportsApi](https://github.com/fquevedo/fzsportsApi)

<p align="right">(<a href="#top">back to top</a>)</p>



