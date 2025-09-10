# Etapa de construcción
FROM amazoncorretto:17-alpine-jdk AS builder

WORKDIR /Backend-Api-Notas

# Copiar archivos de configuración de Maven
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Hacer ejecutable el wrapper de Maven
RUN chmod +x mvnw

# Descargar dependencias
RUN ./mvnw dependency:go-offline

# Copiar código fuente
COPY src ./src

# Compilar la aplicación
RUN ./mvnw clean package -DskipTests

# Etapa de ejecución
FROM amazoncorretto:17-alpine-jdk

WORKDIR /Backend-Api-Notas

# Copiar el JAR desde la etapa de construcción
COPY --from=builder /Backend-Api-Notas/target/api-notas-0.0.1-SNAPSHOT.jar /api-v1.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/api-v1.jar"]