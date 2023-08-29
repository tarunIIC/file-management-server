const AWS = require('../utils/aws-config');
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3();

class FileController {
    static async uploadJson(req, res) {
        try {
            const jsonData = { randomNumber: Math.random() };

            const params = {
                Bucket: process.env.BUCKET,
                Key: `${process.env.ASSETS_LOC}/jsonData.json`,
                Body: JSON.stringify(jsonData),
                ContentType: 'application/json',
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Failed to upload JSON file' });
                }
                res.json({ message: 'JSON file uploaded successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateData(req, res) {
        try {
            const { name } = req.body;
            const imageFile = req.files['image'][0];
            console.log("imageFile", imageFile);
            const largeFile = req.files['largeFile'][0];
            console.log("largeFile", largeFile);

            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }

            const customUrl = `http://kumar-world.com/${imageFile.path}`

            if (largeFile) {
                try {
                    const filePath = path.join(__dirname, '../uploads', largeFile.filename);
                    fs.writeFileSync(filePath, largeFile.buffer.toString());
                    console.log('Complete');
                } catch (e) {
                    console.log(e.message);
                }
            }

            res.json({
                success: true,
                message: 'Data update successful',
                updatedData: { name, customUrl },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = FileController;
