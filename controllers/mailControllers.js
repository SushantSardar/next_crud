const MailForm = require("../models/form");

const createMail = async (req, res) => {
	try {
		const { serial, name, subject, body } = req.body;
		const newForm = await MailForm.create({ serial, name, subject, body });
		await newForm.save();
		res.status(200).json({ message: "mail sent successfully", newForm });
	} catch (error) {
		console.error("mail not sent!!!", error);
		res.status(500).json({ error: "Mail not sent" });

	}
};

const getAllMails = async (req, res) => {
	try {
		const mails = await MailForm.find({});
		res.status(200).json({ message: "data found", mails });
	} catch (error) {
		console.error({ error: "not got mails from db.!!" });
	}
};


const deleteMail = async (req, res) => {
	try {
		const entryid = req.params.id;
		const updatedEntry = await MailForm.findByIdAndDelete(entryid);
		if (!updatedEntry) {
			res.status(404).json("entry not found")
		}
		else {
			res.status(200).json({ message: "entry deleted", deletedEntry: updatedEntry });
		}
	} catch (error) {
		console.error('Error', error);
	}
};

const updateMail = async (req, res) => {
	try {
		const mailid = req.params.id;
		const mailData = req.body;
		const recentEntry = await MailForm.findByIdAndUpdate(mailid, mailData, { new: true });
		if (!recentEntry) {
			res.status(404).json("Not updated!!");
		}
		else {
			res.status(200).json({ message: "entry Updated", updatedEntry: recentEntry });
		}
	} catch (error) {
		console.error('Error', error);
	}
}

const getOneMail = async (req, res) => {
	try {
		const  searchParams  = req.query.name;
		const mail = await MailForm.findOne(
			{ $or: [  { name: { $regex: searchParams, $options: 'i' } },
			{ subject: { $regex: searchParams, $options: 'i' } },
			{ body: { $regex: searchParams, $options: 'i' } } ] }
			);
			console.log(JSON.stringify(mail));
		if (mail) {
			res.status(200).json({ message: "Data found", mail });
		} else {
			res.status(404).json({ message: "Data not found" });
		}
	} catch (error) {
		console.error({ error: "Failed to retrieve mail from the database." });
		res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = {
	getOneMail, updateMail, deleteMail, getAllMails, createMail,
};