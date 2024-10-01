package com.fitnesstrack.fitnesstrackapp.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailRequest {
    private String mail;
    private String subject;
    private String body;
    private String email;



    // Getters and Setters
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}