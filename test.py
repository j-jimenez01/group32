import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# SendGrid SMTP settings
smtp_server = 'smtp.sendgrid.net'
smtp_port = 587
smtp_user = 'apikey'  # SendGrid uses "apikey" as the username
smtp_password = 'your-sendgrid-api-key'  # Use the API Key provided by SendGrid

# Create the email
from_address = 'chickennuggets@example.com'  # The spoofed "From" address
to_address = 'your-email@outlook.com'  # Send the email to your own email for testing
subject = 'Important: Action Required'
body = 'Please click the link below to reset your password.'

# Create the MIMEText object
msg = MIMEMultipart()
msg['From'] = from_address
msg['To'] = to_address
msg['Subject'] = subject
msg.attach(MIMEText(body, 'plain'))

# Connect to the SendGrid SMTP server
try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Encrypt the connection
    server.login(smtp_user, smtp_password)  # Log in with the API Key
    
    # Send the email
    server.sendmail(from_address, to_address, msg.as_string())
    print(f"Email sent successfully to {to_address}")
    
except Exception as e:
    print(f"Error sending email: {e}")
    
finally:
    server.quit()
