
<h1 align="center">T-DAT-902-LYO_12</h1>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#sparkles-competences">Features</a> &#xa0; | &#xa0;
  <a href="#sparkles-KeyNote">KeyNote</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#office-Architecture">Architecture</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#family-Team">Team</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
</p>

<br>

## :dart: About ##

Visualization map of multiple data sets.

Download data from the government (90GB) Link: https://www.data.gouv.fr/fr/datasets/base-de-donnees-nationale-des-batiments/



## :sparkles: Features ##

:heavy_check_mark: Store the data in a queue in order to be able to multiply the input sources ;\




## :sparkles: Skills ##

- **Graphics:**
    - At least two graphics in addition to the map
    - Title and a legend for each graphic
- **Text Analysis:**
    - Scrape from the website https://bien-dans-ma-ville.fr
- **Architecture Diagram:**
    - Description of the links between SQL, NoSQL, and scraping
- **Visualizations:**
    - Use of at least three different types of visualization
- **Types of Views:**
    - Proposal of views by cities, regions, and departments
- **Map Scaling:**
    - Scaling of the map
- **Libraries:**
    - Use of at least three different libraries
- **Mapping and Textual Analysis:**
    - Include elements of mapping and textual analyses
- **NLP:**
    - Analyze residents' reviews on the housing market and social context
- **Query Optimization:**
    - Optimize queries through database indexing


## :rocket: Technologies ##

The following tools were used in this project:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com)
- [Mysql](https://www.mysql.com/)
- [Mongo](https://www.mongodb.com/fr-fr)


## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Docker](https://www.docker.com/) installed.

## :office: Architecture ##

The **architecture** of the project

<img width="634" alt="Architecture projet" src="https://github.com/EpitechMscProPromo2024/T-DAT-902-LYO_12/assets/116549451/249342eb-5f44-4e2a-be15-d8fb1e629e3a">

<h3> Data Collection :</h3>

Sources: government databases, real estate websites, public APIs.

Data pipeline to clean, transform, and prepare the data before loading it into the database.
<h3>Database : </h3>

The selected data are the most **suitable** for a simple reading of developments.
Data to be stored in a relational database:

Structured Data: Data with well-defined structure and clear relationships between entities are best suited for a relational database. This includes information such as:
Housing prices.
* Characteristics of real estate properties (number of rooms, area, etc.).
* Demographic data of regions (population, average income, etc.).
* History of real estate transactions.
* Complex Relationships: If the data requires complex join operations or ACID transactions, a relational database is preferable. For example:
* Relationship between real estate property data and demographic data.
* Transaction history with buyer and seller details.
* Data Consistency: If data consistency is a major concern (e.g., when managing real estate transactions), a relational database may be more appropriate due to its built-in support for ACID transactions.
* Data to be stored in a NoSQL database:

Semi-structured or Unstructured Data: NoSQL databases are suitable for storing less structured data, such as:
* User comments on properties.
* Geographic data (GPS coordinates, geometric shapes, etc.).
* Media associated with properties (images, videos, etc.).
* Large Data Volumes: If the data is massive or if the data volume is likely to grow rapidly, a NoSQL database may be more suitable due to its ability to handle heavy workloads and distributed data volumes.
* Schema Flexibility: If data can evolve frequently or if the data schema is likely to change, a NoSQL database offers more flexibility compared to a relational database.

<h3>Data Processing and Analysis:</h3>

Use Hadoop (HDFS, MapReduce) for storage and processing of massive data.
Implement Apache Spark for advanced analytics and real-time processing.
Utilize data science tools for exploration and in-depth analysis of data.

<h3>APIs and Web Services:</h3>

Develop APIs to enable access to data and application functionalities.
Utilize web services for integration with external sources and communication between different components of the architecture.
<h3> Front-end Application:</h3>

Develop a user-friendly and interactive front-end application allowing users to explore real estate data and access analyses.
Integrate interactive visualizations such as maps, charts, dashboards, etc.
<h3>Deployment and Management:</h3>

Host the infrastructure on a cloud platform like AWS, Azure, or Google Cloud to ensure optimal scalability, availability, and security.
Automate deployment and infrastructure management using tools like Terraform, Ansible, Docker, Kubernetes, etc.
Implement monitoring and logging tools to track application performance and detect potential issues.
<h3>Security:</h3>

Implement security mechanisms to protect sensitive data and ensure data confidentiality and integrity.
Use authentication and authorization to control access to data and application functionalities.

<h3>Process GitFlow : </h3>

We use **Gitflow** for the aspect that is a branching model for **Git** that helps manage and organize the development process. It defines **specific branches** for features, releases, and hotfixes, facilitating collaboration and version control in **software development**.



## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/EpitechMscProPromo2024/T-DAT-902-LYO_12

# Access
$ cd T-DAT-902-LYO_12


# ------ Back
# Access to Back
$ cd Client/back

# Install node_modules
$ npm install

# Launch the Back :
$ node server.js


# ------ Front
# Access to Front
$ cd Client/hompedia/src

# Install node_modules
$ npm install

# Launch the front :
$ npm run dev


#When process is done, you'll be able to access to the Application.

```


## :family: Team ##

**<h3>Queue System:</h3>**

**<h3>Database Management:</h3>**

- Set up MySQL as the database for storing processed data.

**<h3>Dockerization:</h3>**

- Dockerize the entire project for easy deployment and scalability.
- Provide clear instructions in the README for launching the project using Docker Compose.

**<h3>GitFlow and Version Control:</h3>**

- Implement GitFlow for managing branches (features, releases, and hotfixes) to facilitate collaboration.
- Follow the defined GitFlow process during development.

**<h3>Documentation:</h3>**

- Ensure that the README contains clear and concise instructions for setting up and running the project.
- Provide information on the project's architecture, technologies used, and any additional setup requirements.

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/ArthurDufay" target="_blank">Arthur DUFAY</a>, <a href="https://github.com/mamanin" target="_blank">Max MANIN</a>, <a href="https://github.com/ltournayre" target="_blank">Lola TOURNAYRE</a>, <a href="https://github.com/TaviotBaptiste" target="_blank">Baptiste TAVIOT</a>
&#xa0;

<a href="#top">Back to top</a>
