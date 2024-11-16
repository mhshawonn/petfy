package com.pet.Pet.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public String SendOtpMessage(String email, String body) throws Exception {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("petworldverify@gmail.com");
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject("Verify Your Email");
        simpleMailMessage.setText(body);

        javaMailSender.send(simpleMailMessage);

        return "Otp send in your email. Please check your inbox and spam folder. " +
                "Use this otp within 15 minutes to verify your account";
    }
}
