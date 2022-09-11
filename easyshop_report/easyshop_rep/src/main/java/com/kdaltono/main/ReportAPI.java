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
		DBManager dbManager = new DBManager("mysql", "easyshop_db", "3306", "root", "1234");
		//DBManager dbManager = new DBManager("mysql", "127.0.0.1", "3306", "root", "1234");
		dbManager.startConnection();
		
		String mealListId = req.getParameter("mealListId");
		if (mealListId == null) {
			sendNullParameter(res.getWriter());
			return;
		}
		
		JasperRunner jr = new JasperRunner(dbManager);
		byte[] pdfFile = jr.runReport(mealListId);
		
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
			sendPdfIsNull(res.getWriter());
		}
	}
	
	private void sendNullParameter(PrintWriter out) {
		out.println("<html><head><title>Hello World</title></head><body><p>mealListId parameter is missing. Check the logs for more details.</p></body></html>");
	}
	
	private void sendPdfIsNull(PrintWriter out) {
		out.println("<html><head><title>Hello World</title></head><body><p>pdfFile was equal to null. Check the logs for more details.</p></body></html>");
	}
}
