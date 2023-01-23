package com.kdaltono.main.imagehandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;

public class ImageHandler {
	private String imgDirectory;
	private ServletFileUpload uploader;
	
	public ImageHandler(String imgDirectory) {
		this.imgDirectory = imgDirectory;
		this.initUploader();
	}
	
	private void initUploader() {
		DiskFileItemFactory fileFactory = new DiskFileItemFactory();
		File filesDir = new File(this.imgDirectory);
		fileFactory.setRepository(filesDir);
		this.uploader = new ServletFileUpload(fileFactory);
	}
	
	public FileInputStream getImageFileInputStream(String imgName) throws FileNotFoundException {
		return new FileInputStream(imgName);
	}
	
	public File getFile(String imgName) {
		return new File(imgName);
	}
	
	public boolean doesImageExist(String imgName) {
		return new File(imgName).isFile();
	}
	
	public Image downloadFileFromPost(HttpServletRequest req, HttpServletResponse res, String fileName) throws FileUploadException {
		try {
			List<FileItem> fileItemsList = this.uploader.parseRequest(new ServletRequestContext(req));
			Iterator<FileItem> fileItemsIterator = fileItemsList.iterator();
			File file = null;
			
			while (fileItemsIterator.hasNext()) {
				FileItem fileItem = fileItemsIterator.next(); 
				file = new File(this.imgDirectory + "/" + fileName);
				FileOutputStream fos = new FileOutputStream(file);
				char[] chars = new String(fileItem.get()).toCharArray();
				
				fos.write(fileItem.get());
				fos.flush();
			}
			
			return new Image(fileName, file.getAbsolutePath(), "", "");
		} catch (FileUploadException e) {
			// TODO: Getting an exception here when uploading files
			System.out.println("Exception in uploading file.");
			e.printStackTrace();
			throw new FileUploadException("Exception in uploading file.");
		} catch (Exception e) {
			System.out.println("Exception in uploading file.");
			e.printStackTrace();
			throw new FileUploadException("Exception in uploading file.");
		}
	}
}
