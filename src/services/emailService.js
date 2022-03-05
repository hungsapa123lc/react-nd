import nodemailer from 'nodemailer';

let sendSimpleEmail=async(dataSent)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "namvkgch190855@fpt.edu.vn", // generated ethereal user
          pass: "apcpozpdxqcliegp", // generated ethereal password
        },
      });

      let a=dataSent.data.map(item=>{
          return (
            `${item.email},`
          )
      })
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Nam dz 👻" <namvkgch190855@fpt.edu.vn>', // sender address
        to: a, // list of receivers
        subject: "New Status ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<h2>Hello Qa Manager !</h2>
                <div><b>Staff id number ${dataSent.id} has post a new Status</b></div>
                <div>Have a nice day !!</div>
                `, // html body
      });
}


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
}



main().catch(console.error);
module.exports={sendSimpleEmail}