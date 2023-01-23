package com.kdaltono.main.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DBManager {
	private Connection dbConn;
	
	private String language, url, port, username, password;
	
	private final String INSERT_IMAGE_FILE_SQL = "insert into meal_image (meal_id, original_image_name, image_uri_1024) values (?, ?, ?)";
	private final String SELECT_IMAGE_FILE_SQL = "select image_uri_1024 from meal_image where meal_id = ?";
	
	public DBManager(String language, String url, String port, String username, String password) {
		this.language = language;
		this.url = url;
		this.port = port;
		this.username = username;
		this.password = password;
	}
	
	public void startConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			this.dbConn = DriverManager.getConnection("jdbc:" + language + "://" + url + ":" + port + "/easyshop", username, password);
			
			if (dbConn.isValid(5)) {
				System.out.println("Connection to Database made successfully");
			} else {
				System.out.println("Database connection failed");
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public void stopConnection() {
		try {
			this.dbConn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public Connection getDbConn() {
		return this.dbConn;
	}
	
	public void insertImageFileData(String mealId, String originalFileName, String imageUri1024) throws SQLException {
		PreparedStatement insertStatement = dbConn.prepareStatement(this.INSERT_IMAGE_FILE_SQL);
		insertStatement.setString(1, mealId);
		insertStatement.setString(2, originalFileName);
		insertStatement.setString(3, imageUri1024);
		
		insertStatement.executeUpdate();
	}
	
	public String getImageFileNames1024(String mealId) throws SQLException {
		PreparedStatement selectStatement = dbConn.prepareStatement(this.SELECT_IMAGE_FILE_SQL);
		selectStatement.setString(1, mealId);
		
		ArrayList<String> fileNames = new ArrayList<String>();
		ResultSet res = selectStatement.executeQuery();
		
		res.next();
		return res.getString(1);
	}
}
