const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendReceiptEmail(fullName, mobile, address, email, paymentMethod, paymentDetails, cart, total) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Receipt - StoryHaven",
        text: `Hello ${fullName},\n\nThank you for your order!\n\nTotal: ${total}\nPayment Method: ${paymentMethod}\n\nOrder Details:\n${cart.map(item => `${item.name} - ${item.quantity} x ${item.price}`).join("\n")}\n\nRegards,\nStoryHaven`
};

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

module.exports = { sendReceiptEmail };
