package com.example.demo.Services;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
	
	@Value("${security.jwt.secret-key}")
	private String secretKey;
	
	@Value("${security.jwt.expiration-time}")
	private long jwtExpiration;
	
	public String extractUsername( String token ) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public <T> T extractClaim( String token, Function< Claims, T> claimsResolver ) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	public String generateToken( UserDetails userDetails ){
		return generateToken( new HashMap<>(), userDetails);
	}
	
	public String generateToken( Map<String, Object > extractClaims, UserDetails userDetails){
		return buildToken(extractClaims, userDetails, jwtExpiration);
	}
	
	public Long getExpirationTime(){
		return jwtExpiration;
	}
	
	
	private String buildToken(Map<String, Object> extractClaims, UserDetails userDetails,long expiration){
		return Jwts
				.builder()
				.setClaims(extractClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() * expiration ))
				.signWith(getSignInKey(),SignatureAlgorithm.HS256)
				.compact();
	}
	
	public boolean isTokenValid( String token, UserDetails userDetails ){
		final String username = extractUsername(token);
		return (Objects.equals(username, userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	private boolean isTokenExpired( String token ){
		return extractExpiration(token).before(new Date());
	}
	
	private Date extractExpiration( String token ){
		return extractClaim(token, Claims::getExpiration);
	}
	
	private Claims extractAllClaims( String token ){
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	private Key getSignInKey(){
		byte[]  keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
		//return Keys.hmacShaKeyFor(secretKey.getBytes());
		
//		try {
//			// Decode the base64-encoded private key (ensure your `secretKey` is the EC private key in base64 format)
//			byte[] keyBytes = Base64.getDecoder().decode(secretKey);
//
//			// Use the KeyFactory to generate the PrivateKey from the keyBytes
//			PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
//			KeyFactory keyFactory = KeyFactory.getInstance("EC");
//			PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
//
//			return privateKey;
//		} catch (Exception e) {
//			throw new IllegalStateException("Invalid Private Key", e);
//		}
	}
}
