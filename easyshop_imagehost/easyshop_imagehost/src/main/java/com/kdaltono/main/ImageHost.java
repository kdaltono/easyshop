package com.kdaltono.main;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

import com.kdaltono.main.db.DBManager;
import com.kdaltono.main.imagehandler.Image;
import com.kdaltono.main.imagehandler.ImageHandler;
import com.kdaltono.main.jwt.JWTVerify;

public class ImageHost extends HttpServlet {
	
	private static final String List = null;
	private final String imgLocation = "/srv/esimghost";
	
	private ImageHandler imageHandler = null;
	private DBManager dbManager = null;
	
	private void addCORSHeaders(HttpServletResponse res) {
		res.addHeader("Access-Control-Allow-Origin", "http://localhost:2000");
		res.addHeader("Access-Control-Allow-Credentials", "true");
		res.addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH");
		res.addHeader("Access-Control-Allow-Headers", "Authorization, Content-Disposition, Content-Type, Content-Length");
	}
	
	public void doOptions(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		addCORSHeaders(res);
	}
	
	@Override
	public void init() throws ServletException {
		System.out.println("Image Host Servlet Initiated");
		this.imageHandler = new ImageHandler(imgLocation);
		this.dbManager = new DBManager("mysql", "easyshop_db", "3306", "root", "1234");
		this.dbManager.startConnection();
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// Allow CORS:
		addCORSHeaders(res);
		
		// Handle the image request
		String mealId = req.getParameter("mealId");
		if (mealId == null) {
			res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameter mealId");
			return;
		}
		
		// Query for file name
		String requestedFileName;
		try {
			requestedFileName = this.dbManager.getImageFileNames1024(mealId);	
		} catch (SQLException e) {
			res.sendError(HttpServletResponse.SC_BAD_REQUEST, "No images exist for the provided Meal ID");
			return;
		}
		
		// Check if image exists and send to client
		if (this.imageHandler.doesImageExist(requestedFileName)) {
			ServletOutputStream out = res.getOutputStream();
			FileInputStream fin = this.imageHandler.getImageFileInputStream(requestedFileName);
			
			byte[] buffer = new byte[1024];
			int bytesRead;
			
			while ((bytesRead = fin.read(buffer)) != -1) {
				out.write(buffer, 0, bytesRead);
			}
			
			// Set Headers
			File imgFile = this.imageHandler.getFile(requestedFileName);
			res.setHeader("Content-Type", getServletContext().getMimeType(requestedFileName));
			res.setHeader("Content-Length", String.valueOf(imgFile.length()));
			res.setHeader("Content-Disposition", "attachment;filename=\"" + imgFile.getName() + "\"");
			
			fin.close();
			out.close();
			
			System.out.println("GET  : File " + requestedFileName + " sent to " + req.getRemoteHost() + " from URL: " + req.getRequestURL() + "?" + req.getQueryString());
		} else {
			System.out.println("Could not find file: " + requestedFileName);
			res.sendError(HttpServletResponse.SC_NOT_FOUND, "Image does not exist");
		}
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// Allow CORS:
		addCORSHeaders(res);
		
		if (!ServletFileUpload.isMultipartContent(req)) {
			throw new ServletException("Content type is not multipart/form-data");
		}
		
		// Validate request
		String requestedFileName = req.getParameter("reqfn");
		String mealId = req.getParameter("mealId");
		
		if (requestedFileName == null || mealId == null) {
			res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameters mealId or reqfn");
			return;
		}
		
		// Verify the JWT Token
		
		// TODO: Fix this, there is a missing library or something
		String token = req.getHeader("Authorization");
						
		if (token == null || !JWTVerify.verifyJWTToken(token)) {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is not valid!");
			return;
		}
		
		res.setContentType("text/html");
		PrintWriter out = res.getWriter();
		out.write("<html><head></head><body>");
		try {
			Image img = this.imageHandler.downloadFileFromPost(req, res, requestedFileName);
			this.dbManager.insertImageFileData(mealId, requestedFileName, img.getImageUri1024());
			out.write("File(s) uploaded successfully");
			System.out.println("POST : File \"" + requestedFileName + "\" saved from Post request on " + req.getRemoteHost() + " from URL: " + req.getRequestURL() + "?" + req.getQueryString());
		} catch (FileUploadException e) {
			System.out.println("Error downloading file from Post Request");
			out.write("Exception in uploading file.");
		} catch (SQLException e) {
			System.out.println("Error executing SQL Insert statement");
			out.write("Error executing SQL Insert statement after file upload.");
			// TODO: Should probably delete the file here as the DB won't be aligned...
		}
		out.write("</body></html>");
	}
}
