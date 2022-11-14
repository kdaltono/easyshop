package com.kdaltono.main.jwt;

import io.jsonwebtoken.*;

import java.io.PrintWriter;

public class JWTVerify {
	private static final String secretKey = "TempPhraseToChange"; 
	
	public static boolean verifyJWTToken(String token) {
		System.out.println("JWT Verification: " + token);
		
		try {
			Jws jwtClaims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token.substring(7));
			return true;
		} catch (SignatureException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public static void sendInvalidJWTToken(PrintWriter out) {
		out.println("<html><head><title>Hello World</title></head><body><p>Invalid JWT Token!</p></body></html>");
	}
}
