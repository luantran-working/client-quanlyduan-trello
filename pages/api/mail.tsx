import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import checkEnvironment from '@/util/check-environment';
import shortId from 'shortid';
import nodemailer from 'nodemailer';
import uniqid from 'uniqid';

const sendMail = (email, res, emailData, user) => {
  const url = checkEnvironment();
  const page = 'login';

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or your SMTP service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS // App password or email password
    }
  });

  const mailOptions = {
    from: '"IIT - Quản lý dự án" <no-reply@mail.com>', // Sender address
    to: email, // Receiver address
    subject: 'Lời mời tham gia bảng mới', // Subject
    html: `
      <div>
        <div style="height:100px; background-color:#26292c; color:white;">
          <p style="text-align:center; font-size:24px;">Quản lý dự án</p>
        </div>
        <div style="background-color:#0079bf; padding:20px; text-align:center;">
          <p style="color:white;">Bạn đã được mời tham gia bảng !</p>
          <a href='${url}/${page}?token=${emailData.token}&email=${email}&boardId=${emailData.boardId}'
             style="background-color:white; color:#0079bf; padding:10px 20px; text-decoration:none; border-radius:5px;">Tham gia</a>
        </div>
      </div>`
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.send({ message: 'Email sent sucessfully', status: 200 });
    })
    .catch((error) => {
      console.error(error);
      res.send({ message: 'Failed to send' });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { email, boardId } = req.body;

        const token = uniqid();
        const id = shortId.generate();

        const emailData = {
          id,
          token,
          boardId
        };

        await db
          .collection('token')
          .insertOne({ token, userId: id, status: 'valid', email, boardId });
        const user = await db.collection('users').findOne({ email });

        await sendMail(email, res, emailData, user);

        res.status(200);

        return;
      }

      default:
        res.send({ message: 'DB error' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
