package org.ics.exceptions;

public class MyCustomException extends Exception{
	public MyCustomException() {}
	
	public MyCustomException(String msg) {
		super(msg);
	}
}
