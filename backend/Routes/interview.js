const express = require('express');
const router = express.Router();
const Interview = require("../model/interviewSchema");
// const userAuth = require("../middleware/userAuth");
// const nodemailer = require("nodemailer");
// require('dotenv').config();

// router.post('/schedule',userAuth, async (req, res) => {
//     try {
//         const userId = req.user._id
//         const { topic, date, time, interviewType } = req.body;
      
     
//       const interview = new Interview({
//         topic,
//         date,
//         time,
//         interviewType,
//         userId,
//         status: 'pending'
//       });
      
//       // Save to database
//       await interview.save();
      
//       res.status(201).json({ 
//         success: true, 
//         message: 'Interview scheduled successfully', 
//         data: interview 
//       });
//     } catch (error) {
//       console.error('Error scheduling interview:', error);
//       res.status(500).json({ 
//         success: false, 
//         message: 'Failed to schedule interview', 
//         error: error.message 
//       });
//     }
// });
  
router.post('/schedule-meeting', async (req, res) => {
  try {
    console.log("inside the api");
    // const { date, time, title, description } = req.body;

    // const userEmail = req?.user?.email || 'user@example.com';

    // // Generate a Google Meet link (in a real app, you'd use Google Calendar API)
    // // This is a placeholder format - real Google Meet links have a different format
    // const meetingId = `meet-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // const googleMeetLink = "https://meet.google.com/avi-zbkz-cid";

    // // Format date and time for email
    // const meetingDate = new Date(`${date}T${time}`);
    // const formattedDate = meetingDate.toLocaleDateString('en-US', {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric'
    // });
    // const formattedTime = meetingDate.toLocaleTimeString('en-US', {
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });

    // // Configure email transporter
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.gmail,
    //     pass: process.env.pass,
    //   },
    // });

    // // Prepare email content
    // const mailOptions = {
    //   from: "no-reply@gmail.com",
    //   to: userEmail,
    //   subject: `Meeting Scheduled: ${title}`,
    //   html: `
    //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //           <h2>Your Meeting Has Been Scheduled</h2>
    //           <p>Your meeting ${title}" has been scheduled for ${formattedDate} at ${formattedTime}.</p>
              
    //           ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
              
    //           <p><strong>Google Meet Link:</strong> <a href="${googleMeetLink}" target="_blank">${googleMeetLink}</a></p>
              
    //           <p>You can add this meeting to your calendar using the link below:</p>
    //           <p><a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(meetingDate.toISOString().replace(/-|:|\.\d+/g, ''))}&details=${encodeURIComponent(description || '')}" target="_blank">Add to Google Calendar</a></p>
              
    //           <p>Thank you for using our meeting scheduler!</p>
    //         </div>
    //       `
    // };

    // // Send the email
    // await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Meeting scheduled successfully',
    });

  } catch (error) {
    console.log("Backend eror in Scheduling Interview", error);

    res.status(400).send("Backend eror in Scheduling Interview",error);
  }
})

module.exports = router;