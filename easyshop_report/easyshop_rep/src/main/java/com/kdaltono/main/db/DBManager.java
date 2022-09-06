package com.kdaltono.main.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
	private Connection dbConn;
	
	private String language, url, port, username, password;
	
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
}
