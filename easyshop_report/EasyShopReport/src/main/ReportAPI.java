package main;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
import main.db.DBManager;
import main.report.JasperRunner;

public class ReportAPI extends HttpServlet {
    // Update pom so that this can to IntelliSense and compile properly

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        DBManager dbManager = new DBManager("mysql", "localhost", "3306", "root", "1234");
        dbManager.startConnection();

        JasperRunner jr = new JasperRunner(dbManager);
        String t = jr.runReport();

        PrintWriter out = res.getWriter();
        out.println("<html><head><title>Hello World</title></head><body><p>" + t + " Hello World!</p></body></html>");
    }
}
