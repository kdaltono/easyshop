package com.kdaltono.main;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kdaltono.main.db.DBManager;
import com.kdaltono.main.report.JasperRunner;

public class ReportAPI extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// The report is downloadable. There isn't any error checking currently to say if the MySQL connection
		// is successful. It will just give you an empty PDF file
		DBManager dbManager = new DBManager("mysql", "easyshop_db", "3306", "root", "1234");
		dbManager.startConnection();
		
		JasperRunner jr = new JasperRunner(dbManager);
		byte[] pdfFile = jr.runReport();
		
		if (pdfFile != null) {
			OutputStream outStream = res.getOutputStream();
			
			res.setContentLength(pdfFile.length);
			res.setContentType("application/json");
			
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=Report.pdf");
			res.setHeader(headerKey, headerValue);
			
			outStream.write(pdfFile);
			outStream.flush();
			outStream.close();
		} else {
			PrintWriter out = res.getWriter();
			out.println("<html><head><title>Hello World</title></head><body><p>pdfFile was equal to null. Check the logs for more details.</p></body></html>");
		}
	}
}
