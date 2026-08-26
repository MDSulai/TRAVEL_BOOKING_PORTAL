
#!/bin/bash

# Define project directory
PROJECT_DIR="/home/coder/project/workspace/question_generation_service/solutions/0bc56dc2-5e4e-40c4-8aa0-4bb066a2ceb3/springapp"

# Create unique database name using request_id
DATABASE_NAME="0bc56dc2_5e4e_40c4_8aa0_4bb066a2ceb3"

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Generate Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Travel Booking Portal" \
  --description="Flight and Hotel Booking System" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql,lombok \
  --build=maven \
  ${PROJECT_DIR}

# Wait for project generation to complete
sleep 2

# Create application.properties with MySQL configuration
cat > "${PROJECT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
EOL

# Add additional dependencies to pom.xml
sed -i '/<\/dependencies>/i \
        <dependency>\
            <groupId>org.springframework.boot</groupId>\
            <artifactId>spring-boot-starter-validation</artifactId>\
        </dependency>' "${PROJECT_DIR}/pom.xml"

echo "Spring Boot project has been generated successfully in ${PROJECT_DIR}"
