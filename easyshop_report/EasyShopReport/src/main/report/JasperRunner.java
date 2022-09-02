package main.report;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

import main.db.DBManager;

public class JasperRunner {
    private DBManager dbManager;

    public JasperRunner(DBManager dbManager) {
        this.dbManager = dbManager;
    }

    public String runReport(String id) {
        try (InputStream in = getClass().getResourceAsStream("/resrouces/Test_1.jasper")) {
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(in);
            return "Query: " + jasperReport.getQuery().getText();
        } catch (IOException e) {
            return "Error 1! ";
        } catch (JRException e) {
            return "Error 2! ";
        }
        return "Error 3";
    }
}
