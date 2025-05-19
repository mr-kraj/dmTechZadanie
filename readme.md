### LAUNCHING INSTRUCTION ###

1. Navigate to the backend folder.
2. Run following commands (Maven):
   a) mvn install
   b) mvn spring-boot:run

4. Navigate to the frontend folder.
5. Run following commands (npm):
   a) npm install
   b) npm start

## Cloud Installation ##
Personally, my go-to soluton for this would be Docker. For this, I would:
  1) Creating appropriate Dockerfiles for backend and frontend, building the apps and exposing appropriate ports.
  2) Creating confing in docker-compose.yaml.
  3) On AWS Cloud9, clone the repo.
  4) Run `docker-compose up -d` from project folder.

This is likely the simplest configuration, where the most difficulty involves writing the Dockerfiles config. One might also employ this on AWS EC2 instances using Terraform.
