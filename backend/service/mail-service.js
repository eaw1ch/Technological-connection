const nodemailer = require("nodemailer");
const ErrorAPI = require("../errors/ErrorAPI");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivation(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Активация аккаунта на " + process.env.CLIENT_URL,
        text: "",
        html: `
        <div>
          <h2>Для того чтобы подтвердить аккаунт перейдите по сслыке:</h2>
          <a href="${link}">${link}</a>
        </div>
        `,
      });
    } catch (e) {
      return ErrorAPI.badRequest("Ошибка отправки ссылки активации аккаунта");
    }
  }

  async getFeedback(email, question) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: "Обратная связь",
        text: "",
        html: `
      <div>
        <h2>Форма обратной связи</h2>
        <p>Пользователь ${email}</p>
        <p>Вопрос пользователя: ${question}</p>
      </div>
      `,
      });
    } catch (e) {
      return ErrorAPI.badRequest(
        "Ошибка отправки обращения в службу поддержки"
      );
    }
  }
}

module.exports = new MailService();
