package com.kdaltono.main.jwt;

import java.io.PrintWriter;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

public class JWTVerify {
	public static final String secretKey = "TempPhraseToChange";
			
	public static boolean verifyJWTToken(String token) {
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
