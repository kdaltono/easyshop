package com.kdaltono.main.report;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.kdaltono.main.db.DBManager;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

public class JasperRunner {
	private DBManager dbManager;
	
	public JasperRunner(DBManager dbManager) {
		this.dbManager = dbManager;
	}
	
	public byte[] runReport(String mealListId) {
		// Fix the jasper report. I think the database hasn't been updated in a while so the query isn't working
		try (InputStream in = getClass().getResourceAsStream("/Test_1.jasper")) {
			JasperReport jasperReport = (JasperReport) JRLoader.loadObject(in);
			
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("meal_list_id", mealListId);
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dbManager.getDbConn());
			
			byte[] bytes = JasperExportManager.exportReportToPdf(jasperPrint);
			
			return bytes;
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return null;
	}
}