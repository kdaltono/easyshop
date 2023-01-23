package com.kdaltono.main.imagehandler;

public class Image {
	
	private String originalImageName, imageUri1024, imageUri512, imageUri256; 

	public Image(String originalImageName, String imageUri1024, String imageUri512, String imageUri256) {
		this.originalImageName = originalImageName;
		this.imageUri1024 = imageUri1024;
		this.imageUri512 = imageUri512;
		this.imageUri256 = imageUri256;
	}

	public String getOriginalImageName() {
		return originalImageName;
	}

	public void setOriginalImageName(String originalImageName) {
		this.originalImageName = originalImageName;
	}

	public String getImageUri1024() {
		return imageUri1024;
	}

	public void setImageUri1024(String imageUri1024) {
		this.imageUri1024 = imageUri1024;
	}

	public String getImageUri512() {
		return imageUri512;
	}

	public void setImageUri512(String imageUri512) {
		this.imageUri512 = imageUri512;
	}

	public String getImageUri256() {
		return imageUri256;
	}

	public void setImageUri256(String imageUri256) {
		this.imageUri256 = imageUri256;
	}
	
	
}
