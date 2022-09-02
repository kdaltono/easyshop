package main.db;

import java.sql.*;

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
            this.dbConn = DriverManager.getConnection("jdbc:" + language + "://" + url + ":" + port, username, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void stopConnection() {
        this.dbConn.close();
    }

    public Connection getDbConn() {
        return this.dbConn;
    }
}
