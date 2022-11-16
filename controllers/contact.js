import Contact from "../models/contact";
import nodemailer from "nodemailer";

export const createContact = async (req, res) => {
  try {
    await new Contact(req.body).save();
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: `The Man Shop ${process.env.USER}`,
      to: req.body.email,
      subject: "Cảm ơn bạn đã phản hồi",
      html: `<p> Xin chào <strong>${req.body.fullName}</strong> cảm ơn bạn đã feedback, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất !</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent !");
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "Có lỗi xảy ra vui lòng thử lại",
    });
  }
  res.json({ message: "Gửi email thành công" });
};

export const updateContact = async (req, res) => {
  try {
    const newContact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(newContact);
  } catch (error) {
    res.status(400).json({
      message: "Sửa không thành công !",
    });
  }
};

export const listContact = async (req, res) => {
  try {
    const body = req.body;
    const skip = body.limit * (body.page - 1);
    const count = await Contact.find({}).count();
    const contact = await Contact.find({}).skip(skip).limit(body.limit);
    res.json({ contact, count });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};
