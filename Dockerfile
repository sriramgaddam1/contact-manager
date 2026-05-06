FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /app

COPY demo/mvnw demo/pom.xml ./demo/
COPY demo/.mvn ./demo/.mvn
WORKDIR /app/demo
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

COPY demo/src ./src
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

ENV JAVA_OPTS=""
COPY --from=backend-build /app/demo/target/*.jar app.jar

EXPOSE 10000
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
