//package com.example.demo.config;
//
//import javax.sql.DataSource;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DatabaseConfig {
//
//    @Bean
//    @ConfigurationProperties("spring.datasource")
//    public DataSource dataSource() {
//        String rawUrl = System.getenv("DATABASE_URL");
//        if (rawUrl != null && rawUrl.startsWith("postgres://")) {
//            rawUrl = rawUrl.replace("postgres://", "jdbc:postgresql://");
//        }
//        return DataSourceBuilder.create().url(rawUrl).build();
//    }
//}
