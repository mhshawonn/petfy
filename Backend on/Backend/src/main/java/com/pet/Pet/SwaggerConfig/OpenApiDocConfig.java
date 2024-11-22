package com.pet.Pet.SwaggerConfig;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition
@Configuration
public class OpenApiDocConfig {
	
	@Bean
	public OpenAPI baseOpenAPI(){
		return new OpenAPI().info(new Info()
				.title("Spring Doc for Pet Application")
				.version("2.4.0")
				.description("OpenAPI SWAGGER Config for Pet Application"));
	}
}
